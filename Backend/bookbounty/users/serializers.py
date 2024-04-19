from rest_framework import serializers
from .models import User,Book

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
    class Meta:
        model = Book
        fields = ['book_id', 'title', 'author', 'description', 'price', 'condition', 'rating', 'ISBN', 'publication_date', 'category', 'seller_name','seller_location','image']
