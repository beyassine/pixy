from rest_framework import serializers
from .models import *
from .utils import resizeimage

class Base64ImageField(serializers.ImageField):

    def to_internal_value(self, data):
        from django.core.files.base import ContentFile
        import base64
        import six
        import uuid

        # Check if this is a base64 string
        if isinstance(data, six.string_types):
            # Check if the base64 string is in the "data:" format
            if 'data:' in data and ';base64,' in data:
                # Break out the header from the base64 content
                header, data = data.split(';base64,')

            # Try to decode the file. Return validation error if it fails.
            try:
                decoded_file = base64.b64decode(data)

                #Resize image
                decoded_file=resizeimage(decoded_file)
                
            except TypeError:
                self.fail('invalid_image')

            # Generate file name:
            # 12 characters are more than enough.
            file_name = str(uuid.uuid4())[:12]
            # Get the file name extension:
            file_extension = self.get_file_extension(file_name, decoded_file)

            complete_file_name = "%s.%s" % (file_name, file_extension, )

            

            data = ContentFile(decoded_file, name=complete_file_name)

        return super(Base64ImageField, self).to_internal_value(data)

    def get_file_extension(self, file_name, decoded_file):
        import imghdr

        extension = imghdr.what(file_name, decoded_file)
        extension = "jpg" if extension == "jpeg" else extension

        return extension


class PhotoSerializer(serializers.ModelSerializer):
    image = Base64ImageField(
        max_length=None, use_url=True,
    )

    class Meta:
        model = Photo
        fields = ("id",'image','datacrop')



class CommandeSerializer(serializers.ModelSerializer):
   
    class Meta:
        model = Commande
        fields = ('id', 'listphoto', 'typec', 'prix', 'nbre')

    def create(self, validated_data):

        instance = Commande.objects.create(**validated_data)

        if (validated_data['listphoto'] != ''):

            listphoto = validated_data['listphoto'].split('/')

            for i in listphoto:
                if (i != ''):
                    c = Photo.objects.get(id=int(i))
                    instance.photo.add(c)
        return instance

    def update(self,instance, validated_data):

        instance.photo.clear()
        instance.listphoto = validated_data['listphoto']

        if (validated_data['listphoto'] != ''):

            listphoto = validated_data['listphoto'].split('/')

            for i in listphoto:
                if (i != ''):
                    c = Photo.objects.get(id=int(i))
                    instance.photo.add(c)
        return instance

class PanierSerializer(serializers.ModelSerializer):
   
    class Meta:
        model = Panier
        fields = ('id', 'listcommande', 'nom', 'tel', 'adresse','ville','prix','complete')

    def create(self, validated_data):

        instance = Panier.objects.create(**validated_data)

        if (validated_data['listcommande'] != ''):

            listcommande = validated_data['listcommande'].split('/')

            for i in listcommande:
                if (i != ''):
                    c = Commande.objects.get(id=int(i))
                    instance.commande.add(c)
        return instance
