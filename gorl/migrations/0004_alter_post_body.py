# Generated by Django 4.1.4 on 2023-01-10 11:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gorl', '0003_alter_profile_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='body',
            field=models.TextField(),
        ),
    ]