from django.urls import path
from .views import listCategorias, Orders, OrderDetail, ListOrdersAdmin, ListOrdersUser, \
    editCategorias, CreateOrder, CreateOrderDetails, WeaponsFilter
from .views import listArmas,DetailArmas
from .views import Pistolas,Shotguns,Submachines,Rifles,Machineguns,Equipment

urlpatterns = [

    path('categorias',listCategorias.as_view(), name='categoria'),
    path('editCategorias/<int:pk>/', editCategorias.as_view(), name='unacategoria'),
    path('armas',listArmas.as_view(), name='armas'),
    path('listordersadmin/', ListOrdersAdmin.as_view(), name='orders'),
    path('listorders/', ListOrdersUser.as_view(), name='orders'),
    path('orders/<int:pk>/', Orders.as_view(), name='orders'),
    path('createorder', CreateOrder.as_view(), name= 'create-order'),
    path('createdetails', CreateOrderDetails.as_view(), name= 'create-details'),
    path('ordersDetails/<int:pk>/', OrderDetail.as_view(), name='orders' ),
    path('armas/<int:pk>/', DetailArmas.as_view(), name='unarma'),
    path('Pistolas/', Pistolas.as_view(), name='pistols'),
    path('Shotguns/', Shotguns.as_view(), name='Shotguns'),
    path('Submachines/', Submachines.as_view(), name='Submachines'),
    path('Rifles/', Rifles.as_view(), name='Rifles'),
    path('Machineguns/', Machineguns.as_view(), name="Machineguns"),
    path('Equipment/', Equipment.as_view(), name="Equipment"),
    path('weapons', WeaponsFilter.as_view()),

]