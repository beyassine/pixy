from django.urls import path
from . import views


urlpatterns = [
    # API
    path('api/<int:pk>/getphoto/', views.getphoto, name="getphoto"),
    path('api/<int:pk>/getorder/', views.getorder, name="getorder"),
    path('api/createphoto/', views.createphoto, name="createphoto"),
    path('api/createcommande/', views.createcommande, name="createcommande"),
    path('api/<int:pk>/updatecommande/', views.updatecommande, name="updatecommande"),

    # VIEWS
    path('', views.home, name="home"),
    path('nouveau', views.new, name="new"),
    path('<int:pk>/commande/', views.commande, name="order"),
    path('<int:pk>/ajouter/', views.addcommande, name="addorder"),
    path('administrateur/', views.adminhome, name="adminhome"),    
    path('administrateur/<int:pk>/commande/', views.orderdetail, name="adminorder"),
    path('administrateur/<int:pk>/downloadimage/', views.downloadimage, name="downloadimage"),
    path('administrateur/<int:pk>/downloadalbum/', views.downlaodalbum, name="downlaodalbum"),
]
