# Generated by Django 4.1.1 on 2022-10-17 08:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0010_preview_design_preview_side'),
    ]

    operations = [
        migrations.AddField(
            model_name='design',
            name='color',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='shop.color'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='design',
            name='product',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='designs', to='shop.product'),
            preserve_default=False,
        ),
    ]
