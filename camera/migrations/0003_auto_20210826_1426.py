# Generated by Django 3.2.6 on 2021-08-26 12:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('camera', '0002_order_photo'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='albumstring',
            field=models.CharField(default='', max_length=1000, verbose_name='album'),
        ),
        migrations.AlterField(
            model_name='order',
            name='adresse',
            field=models.CharField(default='', max_length=1000, verbose_name='Adresse'),
        ),
    ]
