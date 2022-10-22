from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import stripe
from .models import *
from .serializers import *

# Set your secret key. Remember to switch to your live secret key in production.
# See your keys here: https://dashboard.stripe.com/apikeys
stripe.api_key = 'sk_test_51LvIiIK3DYcQUrRXJJ7YFVHSmm30sLXtndAOA4YjZ9oTQcQFWUSCrI9HWa7CVPPb5kSpqwHNloeItLmm0M3w263200SWIMm0D1'


# If you are testing your webhook locally with the Stripe CLI you
# can find the endpoint's secret by running `stripe listen`
# Otherwise, find your endpoint's secret in your webhook settings in the Developer Dashboard
endpoint_secret = 'whsec_vLfcBvcXuiqpq2kRV7wonUOabiXsqa3R'

# checkout session data structure
#   "customer_details": {
#     "address": {
#       "city": "Queenstown",
#       "country": "US",
#       "line1": "6 bird place,",
#       "line2": "Fernhill,",
#       "postal_code": "93000",
#       "state": "CA"
#     },
#     "email": "williampage11@yahoo.co.uk",
#     "name": "william page",
#     "phone": null,
#     "tax_exempt": "none",
#     "tax_ids": []
#   },
#   "id": "cs_test_a1jU1mDKZbBPRo9eTzOCof7moC2mtrQaugiIZzAngNnUzRyedPNxRZ47JO",
#   "payment_status": "paid",
#   "phone_number_collection": {
#     "enabled": false
#   },
#   "shipping_cost": null,
#   "shipping_details": {
#     "address": {
#       "city": "Queenstown",
#       "country": "US",
#       "line1": "6 bird place,",
#       "line2": "Fernhill,",
#       "postal_code": "93000",
#       "state": "CA"
#     },
#     "name": "william page"
#   } ...

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
            print(e)
            # invalid payment information
            return HttpResponse(status=400)

    return HttpResponse(status=200)