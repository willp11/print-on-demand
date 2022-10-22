# Generated by Django 4.1.1 on 2022-10-22 06:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0020_shippingdetails_remove_order_deliveryaddress_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='DesignMockups',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='images/mockups/')),
                ('side', models.CharField(choices=[('front', 'front'), ('back', 'back'), ('left', 'left'), ('right', 'right')], max_length=8)),
                ('design', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='mockups', to='shop.design')),
            ],
        ),
    ]
