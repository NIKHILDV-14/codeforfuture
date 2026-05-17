from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name="home"),
    path("hackathon/", views.hackathons, name="hackathons"),
    path("internship/", views.internship, name="internship"),
    path("free_certification_courses/", views.free_certification_courses, name="free_certification_courses"),
    path("contact/", views.contact, name="contact"),
    path("recruiter/", views.recruiter, name="recruiter"),
]