from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .serializers import CashbackSettingSerializer, CashbackTransactionSerializer
from .models import CashbackSetting, CashbackTransaction


class CashbackSettingListCreateView(generics.ListCreateAPIView):
    queryset = CashbackSetting.objects.all()
    serializer_class = CashbackSettingSerializer
    
    def create(self, request, *args, **kwargs):
        if CashbackSetting.objects.exists():
            return Response(
                {"detail": "Only one cashback setting is allowed. Please update the existing one."},
                status=status.HTTP_400_BAD_REQUEST
            )
        return super().create(request, *args, **kwargs)

class CashbackTransactionListCreateView(generics.ListCreateAPIView):
    queryset = CashbackTransaction.objects.all()
    serializer_class = CashbackTransactionSerializer

class CashbackSettingRetrieveView(generics.RetrieveUpdateAPIView):
    queryset = CashbackSetting.objects.all()
    serializer_class = CashbackSettingSerializer
