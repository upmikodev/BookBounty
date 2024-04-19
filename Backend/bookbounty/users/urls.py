from django.contrib import admin
from django.urls import path, include
from .views import RegisterView,LoginView,UserView,LogoutView,BookListAPIView,OrderAPIView,UserOrdersAPIView,ListingsAPIView

urlpatterns = [
    path('register',RegisterView.as_view()),
    path('login',LoginView.as_view()),
    path('user',UserView.as_view()),
    path('logout',LogoutView.as_view()),
    path('books/', BookListAPIView.as_view(), name='book-list'),
    path('books/<int:book_id>/', BookListAPIView.as_view(), name='book_api'),
    path('makeorder/', OrderAPIView.as_view(), name='make-order'),
    path('userorders/', UserOrdersAPIView.as_view(), name='user-orders'),
    path('userlistings/', ListingsAPIView.as_view(), name='listings_api'),
]
