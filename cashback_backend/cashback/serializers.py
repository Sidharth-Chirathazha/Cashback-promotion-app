from rest_framework import serializers
from .models import CashbackSetting,CashbackTransaction

class CashbackSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = CashbackSetting
        fields = '__all__'
        read_only_fields = ['id']

class CashbackTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CashbackTransaction
        fields = '__all__'
        read_only_fields = ['id', 'created_at']