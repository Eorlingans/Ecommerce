from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from .models import user_profile
from rest_framework_simplejwt.serializers import  TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        return RefreshToken.for_user(user)

    def validate(self, attrs):
        # valido con la funcion madre
        data = super().validate(attrs)
        # agrego lo que necesito agregar
        data["is_staff"] = self.user.is_staff

        return data

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = user_profile
        fields = ['email',
                  'address',
                  'ciudad',
                  'documento',
                  'tipo_documento',
                  'codigo_postal'
                  ]


    def get_id_user(self):
        return self.user_profile.id

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = get_user_model()
        fields = ['email',
                    'user',
                    'lastname', 
                    'password',
                    'address',
                    'ciudad',
                    'codigo_postal',
                    'documento',
                    'tipo_documento'
                    ]

    def create(self, validated_data):
        user = get_user_model().objects.create_user(
            email=validated_data['email'],
            user=validated_data['user'],
            lastname =validated_data['lastname'],
            password=validated_data['password'],
            address=validated_data['address'],
            ciudad=validated_data['ciudad'],
            codigo_postal=validated_data['codigo_postal'],
            documento=validated_data['documento'],
            tipo_documento=validated_data['tipo_documento']
        )
        return user
#
# class UserSerializerWithToken(serializers.ModelSerializer):
#
#     token = serializers.SerializerMethodField()
#     password = serializers.CharField(write_only=True)
#
#     def get_token(self, obj):
#         jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
#         jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
#
#         payload = jwt_payload_handler(obj)
#         token = jwt_encode_handler(payload)
#         return token
#
#     def create(self, validated_data):
#         password = validated_data.pop('password', None)
#         instance = self.Meta.model(**validated_data)
#         if password is not None:
#             instance.set_password(password)
#         instance.save()
#         return instance
#
#     class Meta:
#         model = user_profile
#         fields = ('token', 'email', 'password')
#
