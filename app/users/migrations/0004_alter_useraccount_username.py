# Generated by Django 4.1.4 on 2023-04-09 04:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0003_alter_useraccount_email"),
    ]

    operations = [
        migrations.AlterField(
            model_name="useraccount",
            name="username",
            field=models.CharField(max_length=225, unique=True),
        ),
    ]
