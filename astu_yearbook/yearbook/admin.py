# yearbook/admin.py
from django.contrib import admin
from .models import *

@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    list_display = ('name', 'theme_color')
    search_fields = ('name',)
    prepopulated_fields = {'slug': ('name',)} if hasattr(Department, 'slug') else {}

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('name', 'department', 'is_featured')
    list_filter = ('department', 'is_featured')
    search_fields = ('name', 'quote')
    list_editable = ('is_featured',)
    autocomplete_fields = ('department',)

@admin.register(FacultyTribute)
class FacultyTributeAdmin(admin.ModelAdmin):
    list_display = ('name', 'position', 'order')
    list_editable = ('order',)
    ordering = ('order',)

@admin.register(PresidentMessage)
class PresidentMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'position', 'created_at')

@admin.register(MemoryBoard)
class MemoryBoardAdmin(admin.ModelAdmin):
    list_display = ('title', 'memory_type', 'department')
    list_filter = ('memory_type', 'department')
    search_fields = ('title', 'caption')
    autocomplete_fields = ('department',)

@admin.register(AlumniHighlight)
class AlumniHighlightAdmin(admin.ModelAdmin):
    list_display = ('name', 'department', 'graduation_year', 'current_position')
    list_filter = ('department', 'graduation_year')
    search_fields = ('name', 'current_position')
    autocomplete_fields = ('department',)

@admin.register(AboutASTU)
class AboutASTUAdmin(admin.ModelAdmin):
    list_display = ('established_year', 'student_count')
    
    def has_add_permission(self, request):
        # Only allow one instance
        return not AboutASTU.objects.exists()