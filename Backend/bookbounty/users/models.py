from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class User(AbstractUser):
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    location = models.CharField(max_length=255, null=True, blank=True)
    REQUIRED_FIELDS = ['name']

    def __str__(self):
        return self.email


    
class Book(models.Model):
    book_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    condition_choices = [
        ('NEW', 'New'),
        ('LIKE_NEW', 'Like New'),
        ('GOOD', 'Good'),
        ('FAIR', 'Fair'),
        ('POOR', 'Poor'),
    ]
    condition = models.CharField(max_length=8, choices=condition_choices)
    rating = models.DecimalField(max_digits=3, decimal_places=2, null=True, blank=True)
    ISBN = models.CharField(max_length=13, null=True, blank=True)
    publication_date = models.DateField(null=True, blank=True)
    category = models.CharField(max_length=255, null=True, blank=True)
    seller = models.ForeignKey(User, on_delete=models.CASCADE, related_name='books')
    image = models.ImageField(upload_to='books/', blank=True, null=True)

    def __str__(self):
        return self.title

class Transaction(models.Model):
    transaction_id = models.AutoField(primary_key=True)
    date = models.DateField()
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    seller = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sales')
    buyer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='purchases')
    book = models.ForeignKey(Book, on_delete=models.CASCADE)

