from django.db import models
import datetime
from rest_framework import permissions

from profiles.models import user_profile


class category(models.Model):
    cat_name = models.TextField(20, default='default')

    def __str__(self):
        return self.cat_name

    def __repr__(self):
        return self.cat_name


class weapon(models.Model):
    arm_category = models.ForeignKey(category, on_delete=models.CASCADE)
    arm_name = models.TextField(max_length=20)
    arm_price = models.FloatField(default=0.00)
    arm_origin = models.TextField(max_length=20)
    arm_calibre = models.TextField(max_length=20)
    arm_capacity = models.IntegerField(null=True)
    arm_weight = models.FloatField(default=0.00)
    arm_speed = models.TextField(max_length=20)
    arm_rechargetime = models.IntegerField(null=True)
    arm_assessment = models.IntegerField(null=True)
    arm_description = models.TextField(max_length=280, null=True)
    arm_picture = models.TextField(null=True)

    def __str__(self):
        return self.arm_name

    @property
    def arm_category_name(self):
        return str(self.arm_category)


class Order(models.Model):
    order_user = models.ForeignKey(user_profile, on_delete=models.CASCADE)
    order_date = models.DateField(default=datetime.date.today())
    order_state = models.IntegerField(default=0)

    def __str__(self):
        return str(self.order_user)

    @property
    def order_username(self):
        return str(self.order_user)


class orderdetail(models.Model):
    # Desde aca identifico mediante realated name como lo voy a nombrar desde order, en el serializer
    # no se agrega en el modelo, unicamente en el serializer
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='details')
    order_article = models.ForeignKey(weapon, on_delete=models.CASCADE)
