from django.db.models import fields
from rest_framework import serializers

from profiles.serializers import UserSerializer
from .models import category, weapon, Order, detallePedido


class categoriaSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'cat_name'
        )
        model = category


class weaponSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'arm_catergoria',
            'arm_catergoria_nombre',
            'arm_nombre',
            'arm_precio',
            'arm_origen',
            'arm_calibre',
            'arm_capacidad',
            'arm_peso',
            'arm_velocidad',
            'arm_tiemporecarga',
            'arm_descripcion',
            'arm_valoracion',
            'arm_foto'

        )
        model = weapon


class detailsOrder(serializers.ModelSerializer):
    # order = orderSerializer(read_only=True)
    # order = serializers.PrimaryKeyRelatedField(read_only=True)
    articulo_pedido = weaponSerializer(read_only=True)

    class Meta:
        fields = ["id","articulo_pedido"]
        model = detallePedido

    def get_id_articulo(self):
        return  self.articulo_pedido.id



class orderSerializer(serializers.ModelSerializer):
    # many para determinar que son muchos
    # si o si se tiene que respetar el related_name escrito en detailsOrder para articulo_pedido
    details = detailsOrder(many=True, read_only=True)
    order_user = UserSerializer()

    class Meta:
        fields = ["id",
                  "order_user",
                  "order_username",
                  "order_date",
                  "order_state",
                  "details",
                ]

        model = Order


class ListOrdersSerializer(serializers.ModelSerializer):


    class Meta:
        fields = ["id",
                "order_username",
                 "order_date",
                  "order_state",
                  "details"]
        model = Order

