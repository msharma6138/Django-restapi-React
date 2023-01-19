from django.shortcuts import render
from rest_framework import viewsets
from .serializer import demoappserializer
from .models import demoapp

class demoappview(viewsets.ModelViewSet):
    serializer_class=demoappserializer
    queryset=demoapp.objects.all()

# Create your views here.
