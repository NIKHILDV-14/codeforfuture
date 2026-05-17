from django.contrib import admin
from .models import Internship, Hackathon, FreeCourse, ContactMessage

admin.site.register(Internship)
admin.site.register(Hackathon)
admin.site.register(FreeCourse)
admin.site.register(ContactMessage)