# Generated by Django 4.1.4 on 2023-04-05 21:12

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("posts", "0002_alter_post_date"),
    ]

    operations = [
        migrations.AlterField(
            model_name="post",
            name="date",
            field=models.DateTimeField(
                default=datetime.datetime(2023, 4, 5, 21, 12, 57, 766768)
            ),
        ),
    ]
