from rest_framework.decorators import api_view
from rest_framework.decorators import permission_classes
from rest_framework import authentication, status
from carrito.models import category, weapon, Order, detallePedido
from django.shortcuts import render
from rest_framework import generics, serializers
from rest_framework.response import Response
from rest_framework import permissions


from .serializers import weaponSerializer, orderSerializer, detailsOrder, ListOrdersSerializer, categoriaSerializer, \
    createOrder, createOrderDetails, detailCreateOrder


class listCategorias(generics.ListCreateAPIView):
    """Vista de todas las categorias"""

    queryset = category.objects.all()
    serializer_class = categoriaSerializer

class editCategorias(generics.RetrieveUpdateDestroyAPIView):
    """Modificar o borrar categorias."""
    queryset = category.objects.all()
    serializer_class = categoriaSerializer

class listArmas(generics.ListCreateAPIView):
    """Vista de todos los items."""

    queryset = weapon.objects.all()

    serializer_class = weaponSerializer


class DetailArmas(generics.RetrieveDestroyAPIView):
    queryset = weapon.objects.all()

    serializer_class = weaponSerializer


class Pistolas(generics.ListAPIView):
    serializer_class = weaponSerializer

    def get_queryset(self):
        return weapon.objects.filter(arm_catergoria=1)


class Shotguns(generics.ListAPIView):
    serializer_class = weaponSerializer

    def get_queryset(self):
        return weapon.objects.filter(arm_catergoria=2)


class Submachines(generics.ListAPIView):
    serializer_class = weaponSerializer

    def get_queryset(self):
        return weapon.objects.filter(arm_catergoria=3)


class Rifles(generics.ListAPIView):
    serializer_class = weaponSerializer

    def get_queryset(self):
        return weapon.objects.filter(arm_catergoria=4)


class Machineguns(generics.ListAPIView):
    serializer_class = weaponSerializer

    def get_queryset(self):
        return weapon.objects.filter(arm_catergoria=5)


class Equipment(generics.ListAPIView):
    serializer_class = weaponSerializer

    def get_queryset(self):
        return weapon.objects.filter(arm_catergoria=6)


class Orders(generics.RetrieveDestroyAPIView):
    serializer_class = orderSerializer


    def get_queryset(self):
        return Order.objects.all()



class OrderDetail(generics.RetrieveDestroyAPIView):
    serializer_class = detailsOrder

    def get_queryset(self):
        return detallePedido.objects.all()


@permission_classes([permissions.IsAdminUser])
class ListOrdersAdmin(generics.ListAPIView):
    serializer_class = ListOrdersSerializer

    def get_queryset(self):
        return Order.objects.all()


@permission_classes([permissions.IsAuthenticated])
class ListOrdersUser(generics.ListAPIView):
    serializer_class = ListOrdersSerializer

    def get_queryset(self):
        queryset = self.queryset
        user = self.request.user.id
        print(user)
        return Order.objects.filter(order_user_id=user)


class CreateOrder(generics.CreateAPIView):
    serializer_class = createOrder
    queryset = Order.objects.all()

class CreateOrderDetails(generics.CreateAPIView):
    serializer_class = createOrderDetails
    queryset = detallePedido.objects.all()
