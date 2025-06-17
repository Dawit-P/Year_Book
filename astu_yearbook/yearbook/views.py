# yearbook/views.py (updated)
from rest_framework import viewsets, filters
from .models import *
from .serializers import *
from .pagination import SmallResultsPagination, LargeResultsPagination
from django_filters.rest_framework import DjangoFilterBackend

class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.all().prefetch_related('students')
    serializer_class = DepartmentSerializer
    pagination_class = SmallResultsPagination
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']

class StudentViewSet(viewsets.ModelViewSet):
    serializer_class = StudentSerializer
    pagination_class = LargeResultsPagination
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['department', 'is_featured']
    search_fields = ['name', 'quote', 'last_words']
    queryset = Student.objects.all()  # ADD THIS LINE

    def get_queryset(self):
        queryset = super().get_queryset().select_related('department')
        
        # Custom filtering for featured students
        is_featured = self.request.query_params.get('is_featured')
        if is_featured in ['true', '1']:
            queryset = queryset.filter(is_featured=True)
            
        return queryset

class FacultyTributeViewSet(viewsets.ModelViewSet):
    queryset = FacultyTribute.objects.all().order_by('order')
    serializer_class = FacultyTributeSerializer
    pagination_class = SmallResultsPagination

class PresidentMessageViewSet(viewsets.ModelViewSet):
    serializer_class = PresidentMessageSerializer
    queryset = PresidentMessage.objects.all()  # ADD THIS LINE

    def get_queryset(self):
        # Return only the latest message
        return super().get_queryset().order_by('-id')[:1]

class MemoryBoardViewSet(viewsets.ModelViewSet):
    queryset = MemoryBoard.objects.select_related('department').all()
    serializer_class = MemoryBoardSerializer
    pagination_class = SmallResultsPagination
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['department', 'memory_type']
    search_fields = ['title', 'caption', 'author_name', 'author_program', 'author_year']

class AlumniHighlightViewSet(viewsets.ModelViewSet):
    queryset = AlumniHighlight.objects.select_related('department').all()
    serializer_class = AlumniHighlightSerializer
    pagination_class = SmallResultsPagination
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['department', 'graduation_year']
    search_fields = ['name', 'current_position']

class AboutASTUViewSet(viewsets.ModelViewSet):
    serializer_class = AboutASTUSerializer
    queryset = AboutASTU.objects.all()  # ADD THIS LINE

    def get_queryset(self):
        # Ensure we always have an AboutASTU instance
        about, _ = AboutASTU.objects.get_or_create(pk=1)
        return super().get_queryset().filter(pk=1)