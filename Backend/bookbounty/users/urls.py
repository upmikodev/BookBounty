from django.contrib import admin
from django.urls import path, include
from .views import RegisterView,LoginView,UserView,LogoutView,BookListAPIView

urlpatterns = [
    path('register',RegisterView.as_view()),
    path('login',LoginView.as_view()),
    path('user',UserView.as_view()),
    path('logout',LogoutView.as_view()),
    path('books/', BookListAPIView.as_view(), name='book-list'),
]
