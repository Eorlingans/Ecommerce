from django.db import models
from rest_framework import permissions

from profiles.models import user_profile


class category(models.Model):
    cat_name = models.TextField(20, default='default')

    def __str__(self):
        return self.cat_name

    def __repr__(self):
        return self.cat_name


class weapon(models.Model):
    arm_catergoria = models.ForeignKey(category, on_delete=models.CASCADE)
    arm_nombre = models.TextField(max_length=20)
    arm_precio = models.FloatField(default=0.00)
    arm_origen = models.TextField(max_length=20)
    arm_calibre = models.TextField(max_length=20)
    arm_capacidad = models.IntegerField(null=True)
    arm_peso = models.FloatField(default=0.00)
    arm_velocidad = models.TextField(max_length=20)
    arm_tiemporecarga = models.IntegerField(null=True)
    arm_valoracion = models.IntegerField(null=True)
    arm_descripcion = models.TextField(max_length=280, null=True)
    arm_foto = models.TextField(null=True)

    def __str__(self):
        return self.arm_nombre

    @property
    def arm_catergoria_nombre(self):
        return str(self.arm_catergoria)


class Order(models.Model):
    order_user = models.ForeignKey(user_profile, on_delete=models.CASCADE)
    order_date = models.DateField(default='NOW()')
    order_state = models.IntegerField(default=0)

    def __str__(self):
        return str(self.order_user)

    @property
    def order_username(self):
        return str(self.order_user)


class detallePedido(models.Model):
    # Desde aca identifico mediante realated name como lo voy a nombrar desde order, en el serializer
    # no se agrega en el modelo, unicamente en el serializer
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='details')
    articulo_pedido = models.ForeignKey(weapon, on_delete=models.CASCADE)
