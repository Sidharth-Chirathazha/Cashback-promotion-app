from django.db import models

class CashbackSetting(models.Model):
    min_order_amount = models.DecimalField(max_digits=10, decimal_places=2)
    cashback_percentage = models.DecimalField(max_digits=5, decimal_places=2)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)

    def __str__(self):
        return f"{self.cashback_percentage}% cashback on orders over ${self.min_order_amount}"


class CashbackTransaction(models.Model):
    order_id = models.CharField(max_length=100, unique=True)
    customer_id = models.CharField(max_length=100, null=True, blank=True)
    customer_email = models.EmailField(null=True, blank=True)
    order_amount = models.DecimalField(max_digits=10, decimal_places=2)
    cashback_amount = models.DecimalField(max_digits=10, decimal_places=2)
    status_choices = [
        ('pending', 'Pending'),
        ('redeemed', 'Redeemed'),
    ]
    status = models.CharField(max_length=10, choices=status_choices, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order {self.order_id} - {self.cashback_amount} ({self.status})"

