
# todo/serializers.py

from rest_framework import serializers
from .models import Todo
from .models import Files

class TodoSerializer(serializers.ModelSerializer):
  class Meta:
    model = Todo
    fields = ('id', 'title', 'description', 'completed')

class FilesSerializer(serializers.ModelSerializer):
  class Meta:
    model = Files
    fields = ['id', 'file']
