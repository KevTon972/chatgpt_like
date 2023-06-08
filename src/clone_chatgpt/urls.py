"""
URL configuration for clone_chatgpt project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from .views import index, get__and_return_chatgpt_response, get_and_return_user_input

urlpatterns = [
    path('', index, name='index'),
    path('get__and_return_chatgpt_response/', get__and_return_chatgpt_response, name='get__and_return_chatgpt_response'),
    path('get_and_return_user_input/', get_and_return_user_input, name='get_and_return_user_input'),
    path('admin/', admin.site.urls),
]
