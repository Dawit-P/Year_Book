# yearbook/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'departments', views.DepartmentViewSet)
router.register(r'students', views.StudentViewSet)
router.register(r'faculty', views.FacultyTributeViewSet)
router.register(r'president', views.PresidentMessageViewSet)
router.register(r'memories', views.MemoryBoardViewSet)
router.register(r'alumni', views.AlumniHighlightViewSet)
router.register(r'about', views.AboutASTUViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]