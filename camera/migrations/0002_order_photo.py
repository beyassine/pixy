# Generated by Django 3.2.6 on 2021-08-24 18:29

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('camera', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Photo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='magnets_photos')),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nom', models.CharField(default='', max_length=100, verbose_name='Nom')),
                ('tel', models.CharField(default='', max_length=100, verbose_name='Telephone')),
                ('adresse', models.CharField(default='', max_length=1000, verbose_name='Telephone')),
                ('prix', models.DecimalField(decimal_places=2, max_digits=9)),
                ('date_ordered', models.DateTimeField(default=django.utils.timezone.now)),
                ('complete', models.BooleanField(default=False)),
                ('album', models.ManyToManyField(blank=True, to='camera.Photo')),
            ],
        ),
    ]
