from django.shortcuts import render
from .models import ToDo
from .serializers import ToDoSerializer
from rest_framework import viewsets

# Create your views here.
class ToDoView(viewsets.ModelViewSet):
    serializer_class = ToDoSerializer
    queryset = ToDo.objects.all()