# yearbook/serializers.py
from rest_framework import serializers
from .models import *

class ProfileImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = ProfileImage
        fields = ['image_url', 'caption']

    def get_image_url(self, obj):
        return obj.image.url if obj.image else None

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
    profile_images = ProfileImageSerializer(many=True, read_only=True, source='profile_images')
    
    class Meta:
        model = Student
        fields = ['id', 'name', 'department', 'department_name', 'photo_url', 'quote', 'last_words', 'highlight_tagline', 'description', 'is_featured', 'created_at', 'updated_at', 'my_story', 'profile_images']
        
    def get_photo_url(self, obj):
        return obj.photo.url if obj.photo else None

class FacultyTributeSerializer(serializers.ModelSerializer):
    photo_url = serializers.SerializerMethodField()
    
    class Meta:
        model = FacultyTribute
        fields = ['id', 'name', 'photo_url', 'message', 'position', 'order', 'department_name', 'years_of_service', 'specialization']
        
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
        fields = ['id', 'title', 'photo_url', 'caption', 'department', 'department_name', 'memory_type', 'created_at', 'author_name', 'author_program', 'author_year']
        
    def get_photo_url(self, obj):
        return obj.photo.url if obj.photo else None

class AlumniHighlightSerializer(serializers.ModelSerializer):
    photo_url = serializers.SerializerMethodField()
    department_name = serializers.CharField(source='department.name', read_only=True)
    profile_images = ProfileImageSerializer(many=True, read_only=True, source='profile_images')
    
    class Meta:
        model = AlumniHighlight
        fields = ['id', 'name', 'photo_url', 'bio', 'achievement', 'department', 'department_name', 'graduation_year', 'current_position', 'created_at', 'my_story', 'profile_images']
        
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