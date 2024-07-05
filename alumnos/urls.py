# alumnos/urls.py

# En urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('', views.inicio, name='inicio'),
    path('menú/', views.index, name='index'),
    path('compra/', views.compra, name='compra'),
    path('envivo/', views.envivo, name='envivo'),
    path('información/', views.info, name='info'),
    path('reseña/', views.resena, name='resena'),
    path('login/', views.login_view, name='login'),  # Ruta para la vista de inicio de sesión
]
