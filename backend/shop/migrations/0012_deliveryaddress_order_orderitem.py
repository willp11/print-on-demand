# Generated by Django 4.1.1 on 2022-10-21 05:53

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('shop', '0011_design_color_design_product'),
    ]

    operations = [
        migrations.CreateModel(
            name='DeliveryAddress',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=64)),
                ('address', models.CharField(max_length=64)),
                ('city', models.CharField(max_length=64)),
                ('state', models.CharField(max_length=64)),
                ('zipCode', models.CharField(max_length=16)),
                ('country', models.CharField(max_length=64)),
                ('phone', models.CharField(max_length=16)),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('stripeId', models.CharField(max_length=128)),
                ('paid', models.BooleanField(default=False)),
                ('deliveryStatus', models.BooleanField(choices=[('pending', 'pending'), ('in_progress', 'in_progress'), ('delivered', 'delivered')], default='pending')),
                ('userEmail', models.EmailField(max_length=254, null=True)),
                ('deliveryAddress', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='shop.deliveryaddress')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='OrderItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.IntegerField()),
                ('color', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='order_items', to='shop.color')),
                ('design', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='order_items', to='shop.design')),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='order_items', to='shop.order')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='order_items', to='shop.product')),
                ('size', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='order_items', to='shop.size')),
            ],
        ),
    ]
