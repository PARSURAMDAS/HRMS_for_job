from django.urls import path
from .views import *

urlpatterns= [
    path('employees/',employees),
    path('employees/<int:pk>/',delete_employee),
    path('attendance/',mark_attendance),
    path('attendance/<int:emp_id>/',attendance_by_employee),
]