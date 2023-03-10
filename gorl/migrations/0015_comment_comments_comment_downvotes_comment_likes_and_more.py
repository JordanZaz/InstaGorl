# Generated by Django 4.1.4 on 2023-02-14 11:06

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('gorl', '0014_delete_file'),
    ]

    operations = [
        migrations.AddField(
            model_name='comment',
            name='comments',
            field=models.ManyToManyField(blank=True, related_name='child_comments', to='gorl.comment'),
        ),
        migrations.AddField(
            model_name='comment',
            name='downvotes',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='comment',
            name='likes',
            field=models.ManyToManyField(blank=True, to='gorl.like'),
        ),
        migrations.AddField(
            model_name='comment',
            name='parent_comment',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='replies', to='gorl.comment'),
        ),
        migrations.AddField(
            model_name='comment',
            name='upvotes',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='comment',
            name='voters',
            field=models.ManyToManyField(blank=True, related_name='comment_voters', to=settings.AUTH_USER_MODEL),
        ),
    ]
