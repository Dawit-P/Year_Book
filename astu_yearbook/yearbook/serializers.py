# yearbook/serializers.py
from rest_framework import serializers
from .models import *

class DepartmentSerializer(serializers.ModelSerializer):
    student_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Department
        fields = '__all__'
        
    def get_student_count(self, obj):
        return obj.students.count()

class StudentSerializer(serializers.ModelSerializer):
    department_name = serializers.CharField(source='department.name', read_only=True)
    photo_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Student
        fields = '__all__'
        
    def get_photo_url(self, obj):
        return obj.photo.url if obj.photo else None

class FacultyTributeSerializer(serializers.ModelSerializer):
    photo_url = serializers.SerializerMethodField()
    
    class Meta:
        model = FacultyTribute
        fields = '__all__'
        
    def get_photo_url(self, obj):
        return obj.photo.url if obj.photo else None

class PresidentMessageSerializer(serializers.ModelSerializer):
    photo_url = serializers.SerializerMethodField()
    
    class Meta:
        model = PresidentMessage
        fields = '__all__'
        
    def get_photo_url(self, obj):
        return obj.photo.url if obj.photo else None

class MemoryBoardSerializer(serializers.ModelSerializer):
    photo_url = serializers.SerializerMethodField()
    department_name = serializers.CharField(
        source='department.name', 
        read_only=True,
        allow_null=True
    )
    
    class Meta:
        model = MemoryBoard
        fields = '__all__'
        
    def get_photo_url(self, obj):
        return obj.photo.url if obj.photo else None

class AlumniHighlightSerializer(serializers.ModelSerializer):
    photo_url = serializers.SerializerMethodField()
    department_name = serializers.CharField(source='department.name', read_only=True)
    
    class Meta:
        model = AlumniHighlight
        fields = '__all__'
        
    def get_photo_url(self, obj):
        return obj.photo.url if obj.photo else None

class AboutASTUSerializer(serializers.ModelSerializer):
    logo_url = serializers.SerializerMethodField()
    campus_photo_url = serializers.SerializerMethodField()
    
    class Meta:
        model = AboutASTU
        fields = '__all__'
        
    def get_logo_url(self, obj):
        return obj.logo.url if obj.logo else None
        
    def get_campus_photo_url(self, obj):
        return obj.campus_photo.url if obj.campus_photo else None