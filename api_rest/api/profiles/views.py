from django.shortcuts import render
from requests import Response
from rest_framework import generics
from rest_framework.decorators import api_view
from profiles.serializers import MyTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import RegisterSerializer


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer


@api_view(["GET"])
def me(request):
    print(request.user)
    return Response(status=200)

