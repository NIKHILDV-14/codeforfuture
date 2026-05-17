from django.db import models

class Internship(models.Model):
    title = models.CharField(max_length=200)
    company = models.CharField(max_length=200)
    description = models.TextField()
    apply_link = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} - {self.company}"
    




class Hackathon(models.Model):
    title = models.CharField(max_length=200)
    organizer = models.CharField(max_length=200)
    location = models.CharField(max_length=100)
    prize = models.CharField(max_length=100)
    participants = models.IntegerField()
    start_date = models.DateField()
    end_date = models.DateField()
    tags = models.CharField(max_length=200)
    apply_link = models.URLField()

    def __str__(self):
        return self.title







class FreeCourse(models.Model):
    title = models.CharField(max_length=200)
    provider = models.CharField(max_length=200)

    description = models.TextField(blank=True)

    duration = models.CharField(max_length=100, help_text="Example: 3 hours / 4 weeks")

    certificate = models.BooleanField(default=True)

    link = models.URLField()

    logo = models.ImageField(upload_to="course_logos/", blank=True, null=True)

    tags = models.CharField(
        max_length=200,
        blank=True,
        help_text="Comma separated tags like: AI, Python, ML"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]   # newest first
        verbose_name = "Free Course"
        verbose_name_plural = "Free Courses"

    def __str__(self):
        return self.title
    






from django.db import models

class ContactMessage(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    subject = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name