from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
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
from .utils import editimage,editimagesquare
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
def updatephoto(request,pk):
    photo=Photo.objects.get(id=pk)
    
    parser_classes = (parsers.MultiPartParser, parsers.FormParser)

    serializer = PhotoSerializer(instance=photo, data=request.data, partial=True)

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

@api_view(['POST'])
def createpanier(request):

    parser_classes = (parsers.MultiPartParser, parsers.FormParser)

    serializer = PanierSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


# VIEWS

def home(request):
    return render(request, 'camera/home.html')

def produit(request):
    return render(request,'camera/produit.html')

def cart(request):
    return render(request,'camera/cart.html')

def newsquare(request):
    return render(request, 'camera/newsquare.html')

def addsquare(request):
    return render(request,'camera/addsquare.html')

def updatesquare(request):

    pk=request.GET.get('order_id', None)   
    nbre=request.GET.get('nbre', None)   
    if Commande.objects.filter(id=pk).exists():
        order=Commande.objects.get(id=pk)
        photos = order.photo.all()
        serializer = PhotoSerializer(photos, many=True,)
        if int(nbre) == 6 and order.nbre == 6 :
            return render(request,'camera/updatesquare6.html',{'order_id':order.id,'photos':serializer.data})
        elif int(nbre) == 12 and order.nbre == 12 :
            return render(request,'camera/updatesquare12.html',{'order_id':order.id,'photos':serializer.data})
        else:
            return redirect('home')
    else:
        return redirect('home')

def newrect(request):
    return render(request, 'camera/newrect.html')

def addrect(request):
    return render(request,'camera/addrect.html')

def updaterect(request):

    pk=request.GET.get('order_id', None)   
    nbre=request.GET.get('nbre', None)   
    if Commande.objects.filter(id=pk).exists():
        order=Commande.objects.get(id=pk)
        photos = order.photo.all()
        serializer = PhotoSerializer(photos, many=True,)
        if int(nbre) == 4 and order.nbre == 4 :
            return render(request,'camera/updaterect4.html',{'order_id':order.id,'photos':serializer.data})
        elif int(nbre) == 8 and order.nbre==8 :
            return render(request,'camera/updaterect8.html',{'order_id':order.id,'photos':serializer.data})
        else:
            return redirect('home')
    else:
        return redirect('home')

# ADIMINISTARTEUR

@login_required
def adminhome(request):
    orders=Panier.objects.all().order_by('-id')
    return render(request,'camera/adminhome.html',{'orders':orders})

@login_required
def panierdetail(request,pk):
    panier=Panier.objects.get(id=pk)
    orders=panier.commande.all()
    return render(request,'camera/panierdetail.html',{'panier':panier,'orders':orders})

@login_required
def orderdetail(request,pk):
    ids=[]
    order=Commande.objects.get(id=pk)
    typec=order.typec
    images=Photo.objects.filter(commande__id=order.id)
    for image in images :
        ids.append(image.id)

    return render(request,'camera/orderdetail.html',{'order':order,'order_id':order.id,'images':images,'ids':ids,'typec':typec})

@login_required
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

def downlaodalbumsquare(request):

    pk=request.GET.get('order_id', None)   
    i=int(float(str(request.GET.get('i', None))))


    order=Commande.objects.get(id=pk)

    listphoto =order.listphoto.split('/')
    
    photo1=Photo.objects.get(id=int(float(str(listphoto[i]))))
    im_pil=Image.open(photo1.image)
    img_cv=np.array(im_pil)
    img1=editimagesquare(img_cv,photo1.datacrop)

    photo2=Photo.objects.get(id=int(float(str(listphoto[i+1]))))
    im_pil=Image.open(photo2.image)
    img_cv=np.array(im_pil)
    img2=editimagesquare(img_cv,photo2.datacrop)

    photo3=Photo.objects.get(id=int(float(str(listphoto[i+2]))))
    im_pil=Image.open(photo3.image)
    img_cv=np.array(im_pil)
    img3=editimagesquare(img_cv,photo3.datacrop)

    photo4=Photo.objects.get(id=int(float(str(listphoto[i+3]))))
    im_pil=Image.open(photo4.image)
    img_cv=np.array(im_pil)
    img4=editimagesquare(img_cv,photo4.datacrop)

    photo5=Photo.objects.get(id=int(float(str(listphoto[i+4]))))
    im_pil=Image.open(photo5.image)
    img_cv=np.array(im_pil)
    img5=editimagesquare(img_cv,photo5.datacrop)

    photo6=Photo.objects.get(id=int(float(str(listphoto[i+5]))))
    im_pil=Image.open(photo6.image)
    img_cv=np.array(im_pil)
    img6=editimagesquare(img_cv,photo6.datacrop)

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
    filename=f'image-{pk}.png'
    content = "attachement; filename=%s" %(filename)
    response['Content-Disposition'] = content

    return response

def downlaodalbumrectangle(request):
    pk=request.GET.get('order_id', None)   
    i=int(float(str(request.GET.get('i', None))))

    order=Commande.objects.get(id=pk)

    listphoto =order.listphoto.split('/')

    photo1=Photo.objects.get(id=int(float(str(listphoto[i]))))
    im_pil=Image.open(photo1.image)
    img_cv=np.array(im_pil)
    img1=editimage(img_cv)

    photo2=Photo.objects.get(id=int(float(str(listphoto[i+1]))))
    im_pil=Image.open(photo2.image)
    img_cv=np.array(im_pil)
    img2=editimage(img_cv)

    im_tile= concat_tile_resize([
    [img1],
    [img2],
    ])

    #convert back to pil image
    im_pil=Image.fromarray(im_tile)

    #show image
    buffer=BytesIO()
    im_pil.save(buffer,format='png')
    image_png=buffer.getvalue()
    response = HttpResponse(image_png, content_type='image/png')
    filename=f'image-{pk}.png'
    content = "attachement; filename=%s" %(filename)
    response['Content-Disposition'] = content

    return response
