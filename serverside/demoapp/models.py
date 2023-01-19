from django.db import models

class demoapp(models.Model):
    title=models.CharField(max_length=150)
    description=models.CharField(max_length=4000)
    status=models.BooleanField(default=False)
    contributor=models.CharField(max_length=15)
    
    def __str__(self) -> str:
        return super().__str__(self.title)
    
# Create your models here.
