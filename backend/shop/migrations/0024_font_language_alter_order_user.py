# Generated by Django 4.1.1 on 2022-10-28 09:59

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('shop', '0023_alter_designmockup_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='font',
            name='language',
            field=models.CharField(choices=[('english', 'english'), ('thai', 'thai')], default='english', max_length=8),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='order',
            name='user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='orders', to=settings.AUTH_USER_MODEL),
        ),
    ]
