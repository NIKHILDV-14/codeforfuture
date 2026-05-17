from django.shortcuts import render,HttpResponse
from .models import Internship,Hackathon,FreeCourse,ContactMessage




def home(request):
    return render(request, 'home.html')






def internship(request):
    internships = Internship.objects.all().order_by('-created_at')
    return render(request, 'internship.html', {'internships': internships})




def hackathons(request):
    hackathons = Hackathon.objects.all().order_by('end_date')
    return render(request, 'hackathon.html', {'hackathons': hackathons})




def free_certification_courses(request):
    courses = FreeCourse.objects.all()

    for course in courses:
        if course.tags:
            course.tag_list = course.tags.split(',')
        else:
            course.tag_list = []

    return render(request, "free_certification_courses.html", {"free_courses": courses})






def contact(request):
    if request.method == "POST":
        name = request.POST.get("name")
        email = request.POST.get("email")
        phone = request.POST.get("phone")
        subject = request.POST.get("subject")
        message = request.POST.get("message")

        ContactMessage.objects.create(
            name=name,
            email=email,
            phone=phone,
            subject=subject,
            message=message
        )

    return render(request, "contact.html")





def recruiter(request):
    return render(request, 'recruiter.html')

