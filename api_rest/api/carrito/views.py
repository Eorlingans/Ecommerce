from django.db.models import Q
from rest_framework.decorators import api_view
from rest_framework.decorators import permission_classes
from rest_framework import authentication, status
from carrito.models import category, weapon, Order, orderdetail
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


def get_gun_by_category(arm_category,search=None):
    queryset = weapon.objects.filter(arm_category=arm_category)

    if search is not None:
        queryset = queryset.filter(
            Q(arm_description__icontains=search) | Q(arm_name__icontains=search)
        )
    return queryset

class Pistolas(generics.ListAPIView):
    serializer_class = weaponSerializer

    def get_queryset(self):
        arm_category=1
        params = self.request.query_params
        search = params.get("search")
        return get_gun_by_category(arm_category=arm_category,search=search)


class Shotguns(generics.ListAPIView):
    serializer_class = weaponSerializer

    def get_queryset(self):
        arm_category = 2
        params = self.request.query_params
        search = params.get("search")
        return get_gun_by_category(arm_category=arm_category, search=search)

class Submachines(generics.ListAPIView):
    serializer_class = weaponSerializer

    def get_queryset(self):
        arm_category = 3
        params = self.request.query_params
        search = params.get("search")
        return get_gun_by_category(arm_category=arm_category, search=search)


class Rifles(generics.ListAPIView):
    serializer_class = weaponSerializer

    def get_queryset(self):
        arm_category = 4
        params = self.request.query_params
        search = params.get("search")
        return get_gun_by_category(arm_category=arm_category, search=search)


class Machineguns(generics.ListAPIView):
    serializer_class = weaponSerializer

    def get_queryset(self):
        arm_category = 5
        params = self.request.query_params
        search = params.get("search")
        return get_gun_by_category(arm_category=arm_category, search=search)


class Equipment(generics.ListAPIView):
    serializer_class = weaponSerializer

    def get_queryset(self):
        return get_gun_by_category(arm_category=6)


class Orders(generics.RetrieveDestroyAPIView):
    serializer_class = orderSerializer


    def get_queryset(self):
        return Order.objects.all()



class OrderDetail(generics.RetrieveDestroyAPIView):
    serializer_class = detailsOrder

    def get_queryset(self):
        return orderdetail.objects.all()


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
    queryset = orderdetail.objects.all()


class WeaponsFilter(generics.ListAPIView):
    serializer_class = weaponSerializer

    def get_queryset(self):
        queryset = weapon.objects.all()

        params = self.request.query_params
        weapon_name = params.get('weapon')
        stars = params.get('stars')
        description = params.get('desc')

        if weapon_name is not None:
            queryset = queryset.filter(arm_name=weapon_name)
        if stars is not None:
            queryset = queryset.filter(arm_assessment__gte=stars)
        if description is not None:
            queryset = queryset.filter(
                Q(arm_description__icontains=description) | Q(arm_name__icontains=description)
            )
        return queryset