# Generated by Django 4.1.1 on 2022-10-03 11:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0003_remove_size_description_productimage'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productimage',
            name='side',
            field=models.CharField(choices=[('front', 'front'), ('back', 'back'), ('left', 'left'), ('right', 'right'), ('front_mask', 'front_mask'), ('back_mask', 'back_mask'), ('left_mask', 'left_mask'), ('right_mask', 'right_mask')], max_length=16),
        ),
    ]
