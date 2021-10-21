from django.urls import path
from . import views


urlpatterns = [
    # API
    path('api/<int:pk>/getphoto/', views.getphoto, name="getphoto"),
    path('api/<int:pk>/getorder/', views.getorder, name="getorder"),
    path('api/createphoto/', views.createphoto, name="createphoto"),
    path('api/<int:pk>/updatephoto/', views.updatephoto, name="updatephoto"),
    path('api/createcommande/', views.createcommande, name="createcommande"),
    path('api/<int:pk>/updatecommande/', views.updatecommande, name="updatecommande"),
    path('api/createpanier/', views.createpanier, name="createpanier"),

    # VIEWS
    path('', views.home, name="home"),
    path('produit/', views.produit, name="produit"),
    path('panier/', views.cart, name="cart"),
    path('carre/nouveau/', views.newsquare, name="newsquare"),
    path('carre/ajouter/', views.addsquare, name="addsquare"),
    path('carre/modifier/', views.updatesquare, name="updatesquare"),
    path('rect/nouveau/', views.newrect, name="newrect"),
    path('rect/ajouter/', views.addrect, name="addrect"),
    path('rect/modifier/', views.updaterect, name="updaterect"),
    
    # ADMINISTRATEUR
    path('administrateur/', views.adminhome, name="adminhome"),    
    path('administrateur/<int:pk>/panier/', views.panierdetail, name="adminpanier"),
    path('administrateur/<int:pk>/commande/', views.orderdetail, name="adminorder"),
    path('administrateur/<int:pk>/downloadimage/', views.downloadimage, name="downloadimage"),
    path('administrateur/downloadalbumsquare/', views.downlaodalbumsquare, name="downlaodalbumsquare"),
    path('administrateur/downloadalbumrect/', views.downlaodalbumrectangle, name="downlaodalbumrectangle"),
]
