from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.models import BaseUserManager

class UserProfileManager(BaseUserManager):
    """Manager para perfiles de usuario"""
    def create_user(self, email, user,lastname , password, address, ciudad, codigo_postal, documento, tipo_documento):
        """Crear Nuevo Usuario"""
        if not email:
            raise ValueError("Usuario debe tener un email")

        email = self.normalize_email(email)
        user = self.model(email=email,
                          user=user,
                          lastname = lastname,
                          password=password,
                          address = address,
                          ciudad = ciudad,
                          codigo_postal = codigo_postal,
                          documento = documento,
                          tipo_documento = tipo_documento,
                          )
        


        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, user,lastname, password, address, ciudad, codigo_postal, documento, tipo_documento):
        user = self.create_user(email, user,lastname, password, address, ciudad, codigo_postal, documento, tipo_documento)

        user.is_superuser = True
        user.is_staff = True

        user.save(using=self._db)

        return user    

class user_profile(AbstractBaseUser, PermissionsMixin):
    """Modelo base de datos para Usuarios en el Sistema."""

    email = models.CharField(max_length=255, unique=True)
    user = models.CharField(max_length=255)
    lastname = models.CharField(max_length=255, default='')
    address = models.CharField(max_length=255, default='')
    ciudad = models.CharField(max_length=255, default='')
    codigo_postal = models.CharField(max_length=6, default='')
    tipo_documento = models.CharField(max_length=3,default= 'DNI')
    documento = models.CharField(max_length=10, default='')
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    

    objects = UserProfileManager()
 
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['user','lastname','address','ciudad','codigo_postal','tipo_documento','documento']


    def get_full_name(self):
        """Obtener nombre completo del usuario."""
        return self.user+self.lastname

    def __str__(self):
        """Retornar Cadena Representando Nuestro Usuario"""
        return self.get_full_name()
