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
    publication_year = models.CharField(max_length=4, null=True, blank=True)
    publisher = models.CharField(max_length=255, null=True, blank=True)
    category = models.CharField(max_length=255, null=True, blank=True)
    seller = models.ForeignKey(User, on_delete=models.CASCADE, related_name='books',db_column='seller_id')

    # Your existing fields...
    status_choices = [
        ('available', 'Available'),
        ('order received', 'Order Received'),
        ('sold', 'Sold'),
    ]
    status = models.CharField(max_length=20, choices=status_choices, default='available')

    image = models.ImageField(upload_to='books/', blank=True, null=True)



    def __str__(self):
        return self.title



class Transaction(models.Model):

    transaction_id = models.AutoField(primary_key=True)
    date = models.DateField()
    quantity= models.IntegerField()
    price = models.IntegerField()
    seller = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sales')
    buyer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='purchases')
    book_id = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='orders')
    # shipping_address = models.OneToOneField(ShippingAddress, on_delete=models.SET_NULL, null=True, blank=True)

    payment_method = models.CharField(max_length=255)
    
class ShippingAddress(models.Model):

    address_line_1 = models.CharField(max_length=255)
    address_line_2 = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    postal_code = models.CharField(max_length=20)
    country = models.CharField(max_length=255)
    transaction = models.ForeignKey(Transaction, on_delete=models.CASCADE)
    def __str__(self):
        return f'{self.address_line_1}, {self.city}, {self.country}'