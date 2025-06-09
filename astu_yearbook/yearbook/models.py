# yearbook/models.py
from django.db import models

class Department(models.Model):
    name = models.CharField(max_length=100, unique=True)
    cover_image = models.ImageField(upload_to='departments/')
    group_photo = models.ImageField(upload_to='departments/', blank=True, null=True)
    intro_message = models.TextField()
    theme_color = models.CharField(max_length=7, default='#3498db')  # HEX format

    class Meta:
        ordering = ['name']
        verbose_name = "Department"
        verbose_name_plural = "Departments"
        
    def __str__(self):
        return self.name

class Student(models.Model):
    name = models.CharField(max_length=100)
    department = models.ForeignKey(
        Department, 
        on_delete=models.CASCADE,
        related_name='students'
    )
    photo = models.ImageField(upload_to='students/')
    quote = models.CharField(max_length=200)
    last_words = models.TextField()
    highlight_tagline = models.CharField(max_length=100)
    description = models.TextField(help_text="What I'll miss most, proudest moments, etc.")
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name']
        verbose_name = "Student"
        verbose_name_plural = "Students"
        
    def __str__(self):
        return f"{self.name} ({self.department.name})"

class FacultyTribute(models.Model):
    name = models.CharField(max_length=100)
    photo = models.ImageField(upload_to='faculty/')
    message = models.TextField()
    position = models.CharField(max_length=100)
    order = models.PositiveIntegerField(default=0, help_text="Display order (lowest first)")

    class Meta:
        ordering = ['order', 'name']
        verbose_name = "Faculty Tribute"
        verbose_name_plural = "Faculty Tributes"
        
    def __str__(self):
        return f"{self.name} - {self.position}"

class PresidentMessage(models.Model):
    name = models.CharField(max_length=100)
    photo = models.ImageField(upload_to='president/')
    speech = models.TextField()
    position = models.CharField(max_length=100, default="University President")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "President Message"
        verbose_name_plural = "President Messages"
        
    def __str__(self):
        return f"{self.name} - {self.position}"

class MemoryBoard(models.Model):
    MEMORY_TYPES = [
        ('GRAD', 'Graduation'),
        ('PARTY', 'Party'),
        ('STUDY', 'Study Session'),
        ('SPORT', 'Sports Event'),
        ('OTHER', 'Other'),
    ]
    
    title = models.CharField(max_length=100)
    photo = models.ImageField(upload_to='memories/')
    caption = models.TextField()
    department = models.ForeignKey(
        Department, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True,
        related_name='memories'
    )
    memory_type = models.CharField(
        max_length=10, 
        choices=MEMORY_TYPES, 
        default='OTHER',
        help_text="Category for grouping memories"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Memory Board Entry"
        verbose_name_plural = "Memory Board Entries"
        
    def __str__(self):
        return f"{self.title} ({self.get_memory_type_display()})"

class AlumniHighlight(models.Model):
    name = models.CharField(max_length=100)
    photo = models.ImageField(upload_to='alumni/')
    bio = models.TextField()
    achievement = models.TextField()
    department = models.ForeignKey(
        Department, 
        on_delete=models.CASCADE,
        related_name='alumni'
    )
    graduation_year = models.PositiveIntegerField()
    current_position = models.CharField(max_length=150)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-graduation_year']
        verbose_name = "Alumni Highlight"
        verbose_name_plural = "Alumni Highlights"
        
    def __str__(self):
        return f"{self.name} ({self.department.name}, {self.graduation_year})"

class AboutASTU(models.Model):
    logo = models.ImageField(upload_to='about/')
    vision_statement = models.TextField()
    history_summary = models.TextField()
    campus_photo = models.ImageField(upload_to='about/')
    established_year = models.PositiveIntegerField(default=2007)
    student_count = models.PositiveIntegerField(default=10000)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "About ASTU"
        verbose_name_plural = "About ASTU"
        
    def __str__(self):
        return "About ASTU Information"
    
    def save(self, *args, **kwargs):
        # Ensure only one instance exists
        self.pk = 1
        super().save(*args, **kwargs)