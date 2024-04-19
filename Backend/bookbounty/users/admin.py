from django.contrib import admin
from .models import Book, Transaction, Category, User


# Register your models here.
admin.site.register(User)
admin.site.register(Book)
admin.site.register(Transaction)
admin.site.register(Category)
