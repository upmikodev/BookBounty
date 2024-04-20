from rest_framework import serializers
from .models import User,Book,Transaction,ShippingAddress

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

class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        exclude = ['transaction']

class TransactionSerializer(serializers.ModelSerializer):
    seller = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), write_only=True)
    buyer = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), write_only=True)
    shipping_address = ShippingAddressSerializer(write_only=True)
    class Meta:
        model = Transaction
        fields = ['transaction_id', 'date', 'price', 'seller', 'buyer', 'book_id', 'payment_method','quantity','shipping_address']
    def create(self, validated_data):
        shipping_address= validated_data.pop('shipping_address', None)
        seller = validated_data.pop('seller')
        buyer = validated_data.pop('buyer')

        transaction = Transaction.objects.create(seller=seller, buyer=buyer, **validated_data)

        if shipping_address:
            ShippingAddress.objects.create(transaction=transaction, **shipping_address)
    
        return transaction


class ListingSerializer(serializers.ModelSerializer):
    shipping_address = serializers.SerializerMethodField()
    class Meta:
        model = Book
        fields = ['book_id', 'title', 'author', 'description', 'price', 'condition', 'rating', 'ISBN', 'publication_year', 'publisher', 'category','seller', 'image','status','shipping_address']
    def get_shipping_address(self, obj):
        if obj.status == 'order received':
            transaction = Transaction.objects.filter(book_id=obj.book_id).first()
            if transaction:
                shipping_address = ShippingAddress.objects.filter(transaction=transaction).first()
                return ShippingAddressSerializer(shipping_address).data if shipping_address else None
        return None