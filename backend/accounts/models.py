from django.db import models
from django.contrib.auth import get_user_model

class UserDetails(models.Model):
    user = models.OneToOneField(get_user_model(), on_delete=models.CASCADE, related_name='user_details')
    phone_number = models.CharField(max_length=16, null=True, blank=True)

    def __str__(self):
        return f'{self.first_name} {self.last_name}'
