from django.db import models

# Create your models here.
class Employee(models.Model):
    employee_id= models.CharField(max_length=20,unique=True)
    name= models.CharField(max_length=100)
    email= models.EmailField(unique= True)
    department=models.CharField(max_length=50)
    def __str__(self):
        return self.name
class Attendance(models.Model):
    STATUS_CHOICES=(
        ('Present','Present'),
        ('Abesent','Absent'),
        )
    employee= models.ForeignKey(Employee,on_delete=models.CASCADE)
    date=models.DateField()
    status=models.CharField(max_length=10, choices=STATUS_CHOICES)