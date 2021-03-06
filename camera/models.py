from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
from PIL import Image
import uuid 



class User(AbstractUser):

    email = models.EmailField(
        default='', verbose_name='Adresse Email', unique=True)

    def __str__(self):
        return f'{self.email}'

        
class Photo(models.Model):
    image = models.ImageField(upload_to='magnets_photos')
    datacrop= models.CharField(max_length=1000, default='', verbose_name='crop')   

    def image_url(self):
        return self.image.url

    def __str__(self):
        return f'{self.id}'


class Commande(models.Model):    
    photo=models.ManyToManyField(Photo,default='',verbose_name='photo')
    listphoto= models.CharField(max_length=1000, default='', verbose_name='listphoto')
    typec = models.CharField(max_length=100, default='', verbose_name='Type')   
    prix = models.DecimalField(max_digits=9, decimal_places=2)
    date_ordered = models.DateTimeField(default=timezone.now)
    nbre=models.IntegerField(default=0,verbose_name='Nbre Photos')

    def __str__(self):
        return f'{self.id}'




class Panier(models.Model):
    commande=models.ManyToManyField(Commande,default='',verbose_name='commande')
    listcommande= models.CharField(max_length=1000, default='', verbose_name='listcommande')
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
    
    def __str__(self):
        return f'{self.id}'