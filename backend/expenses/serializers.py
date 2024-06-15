from rest_framework import serializers
from .models import Trip, Expense

class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = ['id', 'category', 'amount', 'description']

class TripSerializer(serializers.ModelSerializer):
    expenses = ExpenseSerializer(many=True, read_only=True)
    fromWeather = serializers.JSONField()
    toWeather = serializers.JSONField()

    class Meta:
        model = Trip
        fields = ['id', 'fromLocation', 'toLocation', 'startDate', 'endDate', 'fromWeather', 'toWeather', 'expenses']
