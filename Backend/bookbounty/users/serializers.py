from rest_framework import serializers
from .models import User,Book,Transaction

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','email', 'name','username','password','location']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
    
class BookSerializer(serializers.ModelSerializer):
    
    seller_name=serializers.CharField(source='seller.name', read_only=True)
    seller_location=serializers.CharField(source='seller.location', read_only=True)
    seller = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), write_only=True)

    class Meta:
        model = Book
        fields = ['book_id', 'title', 'author', 'description', 'price', 'condition', 'rating', 'ISBN', 'publication_year', 'publisher', 'category','seller', 'seller_name','seller_location','image','status']

class TransactionSerializer(serializers.ModelSerializer):
    seller = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), write_only=True)
    buyer = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), write_only=True)
    class Meta:
        model = Transaction
        fields = ['transaction_id', 'date', 'price', 'seller', 'buyer', 'book_id', 'payment_method','quantity']

class ListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['book_id', 'title', 'author', 'description', 'price', 'condition', 'rating', 'ISBN', 'publication_year', 'publisher', 'category','seller', 'image','status']