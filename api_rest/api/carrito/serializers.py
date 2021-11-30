from django.db.models import fields
from rest_framework import serializers

from profiles.serializers import UserSerializer
from .models import category, weapon, Order, orderdetail


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
            'arm_category',
            'arm_category_name',
            'arm_name',
            'arm_price',
            'arm_origin',
            'arm_calibre',
            'arm_capacity',
            'arm_weight',
            'arm_speed',
            'arm_rechargetime',
            'arm_description',
            'arm_assessment',
            'arm_picture'

        )
        model = weapon


class detailsOrder(serializers.ModelSerializer):
    # order = orderSerializer(read_only=True)
    # order = serializers.PrimaryKeyRelatedField(read_only=True)
    order_article = weaponSerializer(read_only=True)

    class Meta:
        fields = ["id",
                  "order_article"]
        model = orderdetail

    def get_id_articulo(self):
        return  self.order_article.id



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

class createOrder(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = [
            'id',
            'order_date',
            'order_state',
            'order_user'
        ]


class detailCreateOrder(serializers.ModelSerializer):
    class Meta:
        fields = ["id","order_article","order"]
        model = orderdetail

class createOrderDetails(serializers.Serializer):
    details = detailCreateOrder(many=True)

    def create(self, validated_data):
        data = validated_data.pop('details')
        rta = {
            "details":[]
        }
        for detalle in data:
            res = orderdetail.objects.create(**detalle)
            rta["details"].append(res)
        return rta