# Generated by Django 4.1.4 on 2023-01-09 10:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gorl', '0002_alter_profile_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='image',
            field=models.ImageField(default='default.png', null=True, upload_to='profile_pics'),
        ),
    ]
