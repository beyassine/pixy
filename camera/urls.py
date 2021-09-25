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
    path('produit', views.produit, name="produit"),
    path('nouveaucarre', views.newsquare, name="newsquare"),
    path('<int:pk>/ajoutercarre/', views.addsquare, name="addsquare"),
    path('nouveaurect', views.newrect, name="newrect"),
    path('<int:pk>/ajouterrect', views.addrect, name="addrect"),
    path('nouveaugrand', views.newbig, name="newbig"),
    path('<int:pk>/ajoutergrand', views.addbig, name="addbig"),
    path('<int:pk>/ajouter/', views.upsell, name="upsell"),    
    path('<int:pk>/commande/', views.commande, name="order"),    
    path('administrateur/', views.adminhome, name="adminhome"),    
    path('administrateur/<int:pk>/commande/', views.orderdetail, name="adminorder"),
    path('administrateur/<int:pk>/downloadimage/', views.downloadimage, name="downloadimage"),
    path('administrateur/<int:pk>/downloadalbum/', views.downlaodalbum, name="downlaodalbum"),
]
