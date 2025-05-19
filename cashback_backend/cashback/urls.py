from django.urls import path
from .views import CashbackSettingListCreateView, CashbackTransactionListCreateView, CashbackSettingRetrieveView

urlpatterns = [
    path('settings/', CashbackSettingListCreateView.as_view(), name='cashback-settings'),
    path('settings/<int:pk>/', CashbackSettingRetrieveView.as_view(), name='cashback-settings'),
    path('transactions/', CashbackTransactionListCreateView.as_view(), name='cashback-transactions'),
]
