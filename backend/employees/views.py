from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Employee,Attendance

from .serializers import EmployeeSerializer, AttendanceSerializer

@api_view(['GET','POST'])
def employees(request):
    if request.method =='GET':
        data = Employee.objects.all()
        serializer=EmployeeSerializer(data,many=True)
        return Response(serializer.data)
    if request.method == 'POST':
        serializer = EmployeeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
@api_view(['DELETE'])
def delete_employee(request, pk):
    try:
        emp = Employee.objects.get(id=pk)
        emp.delete()
        return Response(status=204)
    except Employee.DoesNotExist:
        return Response({'error': 'Employee not found'}, status=404)   

@api_view(['GET', 'POST'])
def mark_attendance(request):

    if request.method == 'GET':
        records = Attendance.objects.all()
        serializer = AttendanceSerializer(records, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = AttendanceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

@api_view(['GET'])
def attendance_by_employee(request, emp_id):
    records = Attendance.objects.filter(employee_id=emp_id)
    serializer = AttendanceSerializer(records, many=True)
    return Response(serializer.data)