from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import UserSerializer,BookSerializer, TransactionSerializer,ListingSerializer
from rest_framework.response import Response
from .models import User, Book, Transaction
from rest_framework.exceptions import AuthenticationFailed
import jwt
from datetime import datetime, timezone,timedelta
from django.http import JsonResponse
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
import logging

# Create your views here.
class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed('User not found!')
        
        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password!')
        
        payload={
            'id':user.id,
            'exp':datetime.now(timezone.utc) + timedelta(minutes=60),
            'iat':datetime.now(timezone.utc)
        }
        
        token = jwt.encode(payload, 'secret', algorithm='HS256')

        response = Response()

        response.set_cookie(key='jwt',value=token,httponly=True)
        response.data={
            'jwt': token
        }
        return response
    
class UserView(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')

        user = User.objects.filter(id=payload['id']).first()
        serializer = UserSerializer(user)
        return Response(serializer.data)

class BookListAPIView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    def get(self, request,book_id=None):
        if book_id is not None:
            # Retrieve a single book by its ID
            try:
                book = Book.objects.get(pk=book_id)
                serializer = BookSerializer(book)
                return Response(serializer.data)
            except Book.DoesNotExist:
                return Response({'error': 'Book not found'}, status=status.HTTP_404_NOT_FOUND)
        else:
            books = Book.objects.all()
            serializer = BookSerializer(books, many=True)
            return Response(serializer.data)


    def post(self, request, format=None):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        try:
           payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')

        user = User.objects.filter(id=payload['id']).first()
        user_id = user.id

        # Attach the user's ID to the seller field in the request data
        mutable_data= request.data.copy()
        mutable_data['seller'] = user_id

        serializer = BookSerializer(data=mutable_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message':'success'
        }
        return response
    


class OrderAPIView(APIView):
    def post(self, request, format=None):

        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        try:
           payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')

        user = User.objects.filter(id=payload['id']).first()
        user_id = user.id

        mutable_data= request.data.copy()
        book_id = request.data.get('book_id')
        book = Book.objects.get(pk=book_id)
        book.status = 'order received'
        book.save()
        mutable_data['price']=int(book.price) * int(request.data.get('quantity'))
        mutable_data['buyer']= user_id
        mutable_data['seller']= book.seller.id
        serializer = TransactionSerializer(data=mutable_data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class UserOrdersAPIView(APIView):
    def get(self, request, format=None):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        try:
           payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')

        user = User.objects.filter(id=payload['id']).first()
        user_id = user.id
        # Retrieve transactions for the specified user
        transactions = Transaction.objects.filter(buyer_id=user_id)
        serializer = TransactionSerializer(transactions, many=True)
        return Response(serializer.data)

class ListingsAPIView(APIView):
    def get(self, request, format=None):

        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        try:
           payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')

        user = User.objects.filter(id=payload['id']).first()
        user_id = user.id
        
        # Retrieve listings for the specified user
        listings = Book.objects.filter(seller_id=user_id)
        serializer = ListingSerializer(listings, many=True)
        return Response(serializer.data)