from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User
from .models import Post, Like, Comment, Profile
# Register your models here.


class UserAdmin(UserAdmin):
    list_display = ['username', 'email', 'image', ]
    filter_horizontal = []
    list_filter = []


admin.site.register(Post)
admin.site.register(Like)
admin.site.register(Comment)
# admin.site.register(CustomUser, UserAdmin)
# admin.site.register(User)
admin.site.register(Profile)
