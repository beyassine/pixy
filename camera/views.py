from django.shortcuts import render, redirect
from .serializers import *
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import parsers
import base64
from django.http import HttpResponse,JsonResponse
from PIL import Image
import cv2
from io import BytesIO
import numpy as np
from .utils import editimage

# API

@api_view(['GET'])
def getphoto(request, pk):

    photo = Photo.objects.get(id=pk)
    serializer = PhotoSerializer(photo)
    return Response(serializer.data)


@api_view(['GET'])
def getorder(request, pk):

    order = Order.objects.get(id=pk)
    serializer = OrderSerializer(order)
    return Response(serializer.data)


@api_view(['POST'])
def createphoto(request):

    parser_classes = (parsers.MultiPartParser, parsers.FormParser)

    serializer = PhotoSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)



@api_view(['POST'])
def createcommande(request):

    parser_classes = (parsers.MultiPartParser, parsers.FormParser)

    serializer = CommandeSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['POST'])
def updatecommande(request,pk):
    commande=Commande.objects.get(id=pk)
    
    parser_classes = (parsers.MultiPartParser, parsers.FormParser)

    serializer = CommandeSerializer(instance=commande, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


# VIEWS

def home(request):
    return render(request, 'camera/home.html')

def new(request):
    return render(request, 'camera/new.html')


def commande(request,pk):
    order=Commande.objects.get(id=pk)
    if order.complete == False:
        return render(request,'camera/order.html',{'order_id':order.id,'nbre':order.nbre,'prix':order.prix})
    else:
        return redirect('home')

def addcommande(request,pk):
    order=Commande.objects.get(id=pk)
    return render(request,'camera/addcommande.html',{'order_id':order.id,'nbre':order.nbre,'prix':order.prix})

def adminhome(request):
    orders=Commande.objects.all().order_by('-id')
    return render(request,'camera/adminhome.html',{'orders':orders})

def orderdetail(request,pk):
    order=Commande.objects.get(id=pk)
    images=Photo.objects.filter(commande__id=order.id)
    return render(request,'camera/orderdetail.html',{'order':order,'images':images})


def downloadimage(request,pk):
    photo=Photo.objects.get(id=pk)
    #open Image
    im_pil=Image.open(photo.image)

    #Convert img to array
    img_cv=np.array(im_pil)

    #edit image
    img=editimage(img_cv)

    #convert back to pil image
    im_pil=Image.fromarray(img)

    #show image
    buffer=BytesIO()
    im_pil.save(buffer,format='png')
    image_png=buffer.getvalue()
    response = HttpResponse(image_png, content_type='image/png')

    return response

def hconcat_resize_min(im_list, interpolation=cv2.INTER_CUBIC):
    h_min = min(im.shape[0] for im in im_list)
    im_list_resize = [cv2.resize(im, (int(im.shape[1] * h_min / im.shape[0]), h_min), interpolation=interpolation)
                      for im in im_list]
    return cv2.hconcat(im_list_resize)

def vconcat_resize_min(im_list, interpolation=cv2.INTER_CUBIC):
    w_min = min(im.shape[1] for im in im_list)
    im_list_resize = [cv2.resize(im, (w_min, int(im.shape[0] * w_min / im.shape[1])), interpolation=interpolation)
                      for im in im_list]
    return cv2.vconcat(im_list_resize)

def concat_tile_resize(im_list_2d, interpolation=cv2.INTER_CUBIC):
    im_list_v = [hconcat_resize_min(im_list_h, interpolation=cv2.INTER_CUBIC) for im_list_h in im_list_2d]
    return vconcat_resize_min(im_list_v, interpolation=cv2.INTER_CUBIC)

def downlaodalbum(request,pk):
    order=Commande.objects.get(id=pk)
    photos=Photo.objects.filter(commande__id=order.id)
    i=1
    for photo in photos:
        #open Image
        im_pil=Image.open(photo.image)

        #Convert img to array
        img_cv=np.array(im_pil)
        
        #edit image        
        
        if i == 1 :
            img1=editimage(img_cv)
        elif i == 2 :
            img2=editimage(img_cv)
        elif i == 3 :
            img3=editimage(img_cv)
        elif i == 4 :
            img4=editimage(img_cv)
        elif i == 5 :
            img5=editimage(img_cv)
        elif i == 6 :
            img6=editimage(img_cv)
        i=i+1
    
    im_tile= concat_tile_resize([
    [img1,img2,img3],
    [img4,img5,img6],
    ])

    #convert back to pil image
    im_pil=Image.fromarray(im_tile)

    #show image
    buffer=BytesIO()
    im_pil.save(buffer,format='png')
    image_png=buffer.getvalue()
    response = HttpResponse(image_png, content_type='image/png')

    return response
