from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
from PIL import Image


class User(AbstractUser):

    email = models.EmailField(
        default='', verbose_name='Adresse Email', unique=True)

    def __str__(self):
        return f'{self.email}'


class Commande(models.Model):
    typec = models.CharField(max_length=100, default='', verbose_name='Type')   
    prix = models.DecimalField(max_digits=9, decimal_places=2)
    date_ordered = models.DateTimeField(default=timezone.now)
    nbre=models.IntegerField(default=0,verbose_name='Nbre Photos')

    def __str__(self):
        return f'{self.id}'


class Photo(models.Model):
    commande = models.ForeignKey(Commande, on_delete=models.CASCADE,default='', verbose_name="commande")
    image = models.ImageField(upload_to='magnets_photos')

    def image_url(self):
        return self.image.url

    def __str__(self):
        return f'{self.id}'


class Panier(models.Model):
    commande=models.ManyToManyField(Commande,default='',verbose_name='commande')
    nom = models.CharField(max_length=100, default='', verbose_name='Nom')
    tel = models.CharField(max_length=100, default='',
                           verbose_name='Telephone')
    adresse = models.CharField(
        max_length=1000, default='', verbose_name='Adresse')
    ville = models.CharField(
        max_length=100, default='', verbose_name='Ville')
    prix = models.DecimalField(max_digits=9, decimal_places=2)
    date_ordered = models.DateTimeField(default=timezone.now)
    complete = models.BooleanField(default=False)