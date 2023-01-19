from rest_framework import serializers
from .models import demoapp

class demoappserializer(serializers.ModelSerializer):
    class Meta:
        model=demoapp
        fields=('id','title','description','status','contributor')