from django.db import models

class Expense(models.Model):
    CATEGORY_CHOICES = [
        ('Transportation', 'Transportation'),
        ('Meals', 'Meals'),
        ('Accommodation', 'Accommodation'),
        ('Miscellaneous', 'Miscellaneous Business Expenses'),
    ]
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.category}: {self.amount}"
