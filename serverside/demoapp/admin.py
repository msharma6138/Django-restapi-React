from django.contrib import admin

from .models import demoapp

class demoappadmin(admin.ModelAdmin):
    list_display=("title","description","status","contributor")
    
    admin.site.register(demoapp)



