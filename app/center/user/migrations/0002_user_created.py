# Generated by Django 4.1.4 on 2023-01-20 21:52

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ("center_user", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="user",
            name="created",
            field=models.DateField(default=django.utils.timezone.now),
        ),
    ]
