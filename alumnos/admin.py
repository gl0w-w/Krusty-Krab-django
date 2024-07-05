from django.contrib import admin
from .models import  Credenciales  # Importa todos tus modelos aquí
from . import views
from .models import Credenciales, Usuario


@admin.register(Credenciales)
class CredencialesAdmin(admin.ModelAdmin):
    list_display = ['username']
    search_fields = ['username']


admin.site.register(Usuario)