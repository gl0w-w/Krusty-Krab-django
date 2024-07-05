# alumnos/views.py
from django.shortcuts import render, redirect
from django.contrib.auth import login
from django.contrib.auth.forms import UserCreationForm
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponseRedirect
import json
from .models import Credenciales
from django.core.mail import send_mail
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import render, redirect
from django.urls import reverse
from django.contrib import messages
from django.contrib.auth import authenticate, login
from .forms import UsuarioForm


def inicio(request):
    return render(request, 'alumnos/inicio.html')

def index(request):
    return render(request, 'alumnos/index.html')

def compra(request):
    return render(request, 'alumnos/compra.html')

def envivo(request):
    return render(request, 'alumnos/envivo.html')

def info(request):
    return render(request, 'alumnos/info.html')

def resena(request):
    return render(request, 'alumnos/resena.html')



from django.shortcuts import render, redirect
from django.contrib.auth.hashers import make_password
from .forms import UsuarioForm
from .models import Usuario

# Vista para renderizar la página de registro y manejar el registro de usuarios
def login_view(request):
    if request.method == 'POST':
        form = UsuarioForm(request.POST)
        if form.is_valid():
            usuario = form.save(commit=False)
            usuario.contraseña = make_password(form.cleaned_data['contraseña'])
            usuario.save()
            # Redirige al usuario a donde desees después del registro exitoso
            return redirect('index')
    else:
        form = UsuarioForm()
    return render(request, 'alumnos/login.html', {'form': form})

