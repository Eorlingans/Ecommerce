# Generated by Django 3.2.7 on 2021-11-11 17:30

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('carrito', '0002_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='detallepedido',
            name='order',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='details', to='carrito.order'),
        ),
    ]
