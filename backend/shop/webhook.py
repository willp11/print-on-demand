from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import stripe
from .models import *
from .serializers import *
from .process_designs import process_design
import os

stripe.api_key = os.environ.get('STRIPE_API_KEY')
endpoint_secret = os.environ.get('STRIPE_ENDPOINT_SECRET')

# Function to handle successful payment
def handle_successful_payment(checkout_data):
    try:
        # find the order in db given the checkout session id
        order_instance = Order.objects.get(stripeId=checkout_data['id'])
    except:
        raise Exception('Order not found')

    try:
        # get the line items from stripe
        line_items = stripe.checkout.Session.list_line_items(checkout_data['id'])
    except:
        raise Exception('Line items not found')

    # calculate total amount invoiced
    total_paid = 0
    for item in line_items["data"]:
        amount = item['quantity'] * item['price']['unit_amount']
        total_paid += amount

    # check payment status is paid and total paid is correct
    if checkout_data['payment_status'] != 'paid':
        raise Exception('Payment not paid')
    if total_paid != order_instance.total*100:
        raise Exception('Total paid does not match order total')

    # update status to paid
    order_instance.paid = True
    
    # add delivery address to order
    shipping_details = checkout_data['shipping_details']['address']
    shipping_details["name"] = checkout_data['shipping_details']['name']
    shipping_details_serializer = ShippingDetailsSerializer(data=shipping_details)
    if shipping_details_serializer.is_valid():
        shipping_details_serializer.save()
        order_instance.shippingDetails = shipping_details_serializer.instance

    order_instance.save()

    # get all the designs from the order and process them - creates and saves design mockups
    order_items = OrderItem.objects.filter(order=order_instance)
    for item in order_items:
        design = item.design
        if (design != None):
            process_design(design)

# Webhook handler for checkout session completed
@csrf_exempt
def checkout_success_webhook_view(request):
    payload = request.body
    sig_header = request.META['HTTP_STRIPE_SIGNATURE']
    event = None

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, endpoint_secret
        )
    except ValueError as e:
        # Invalid payload
        return HttpResponse(status=400)
    except stripe.error.SignatureVerificationError as e:
        # Invalid signature
        return HttpResponse(status=400)

    # Handle the event
    if event.type == 'checkout.session.completed':
        checkout_data = event.data.object
        try:
            handle_successful_payment(checkout_data)
            # print(checkout_data)
            print('Checkout session was successful!')
        except Exception as e:
            # invalid payment information
            print(e)
            return HttpResponse(status=400)

    return HttpResponse(status=200)