from django.db import models
from django.contrib.auth.models import User
from PIL import Image
from django.conf import settings
import os


class Profile(models.Model):
    image = models.ImageField(default='default.png',
                              upload_to='profile_pics', null=True)

    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user.username}'s Profile"

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

        img = Image.open(self.image.path)

        if img.height > 200 or img.width > 200:
            output_size = (200, 200)
            img.thumbnail(output_size)
            img.save(self.image.path)


class Post(models.Model):
    author = models.ForeignKey(
        User, on_delete=models.CASCADE, blank=True, null=True)
    date_posted = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100)
    body = models.TextField()
    comments = models.ManyToManyField('Comment', blank=True)
    upvotes = models.IntegerField(default=0)
    downvotes = models.IntegerField(default=0)
    likes = models.ManyToManyField('Like', blank=True)
    voters = models.ManyToManyField(User, related_name="voters", blank=True)

    files = models.FileField(upload_to='post_files', blank=True, null=True)
    file_url = models.URLField(blank=True, null=True)

    @property
    def score(self):
        return self.upvotes - self.downvotes

    def __str__(self):
        return f"ID{self.id} title: {self.title}, Posted by: {self.author}"

    def upvote(self, user):
        like, created = Like.objects.get_or_create(user_id=user, post_id=self)
        if created:
            like.upvote = True
            like.downvote = False
            like.save()
            self.upvotes += 1
            self.voters.add(user)
        elif like.downvote == True:
            like.downvote = False
            like.upvote = True
            like.save()
            self.upvotes += 1
            self.downvotes -= 1
        else:
            if like.upvote:
                like.delete()
                self.upvotes -= 1
                self.voters.remove(user)
            else:
                like.upvote = True
                like.save()
                self.upvotes += 1
                self.voters.add(user)
        self.save()

    def downvote(self, user):
        like, created = Like.objects.get_or_create(user_id=user, post_id=self)
        if created:
            like.downvote = True
            like.upvote = False
            like.save()
            self.downvotes += 1
            self.voters.add(user)
        elif like.upvote == True:
            like.upvote = False
            like.downvote = True
            like.save()
            self.downvotes += 1
            self.upvotes -= 1
        else:
            if like.downvote:
                like.delete()
                self.downvotes -= 1
                self.voters.remove(user)
            else:
                like.downvote = True
                like.save()
                self.downvotes += 1
                self.voters.add(user)
        self.save()


class Comment(models.Model):
    content = models.TextField()
    author = models.ForeignKey(
        User, on_delete=models.CASCADE, blank=True, null=True)
    post_id = models.ForeignKey(
        Post, on_delete=models.CASCADE, blank=True, null=True)
    date_posted = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comment by: {self.author} on Post {self.post_id}"


class Like(models.Model):
    user_id = models.ForeignKey(
        User, on_delete=models.CASCADE, blank=True, null=True)
    post_id = models.ForeignKey(
        Post, on_delete=models.CASCADE, blank=True, null=True)
    upvote = models.BooleanField(default=False)
    downvote = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user_id} liked {self.post_id}"
