# Generated by Django 4.2.1 on 2023-05-27 23:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Messaging', '0014_remove_message_sender_message_user'),
    ]

    operations = [
        migrations.CreateModel(
            name='ChatRoom',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('room_name', models.IntegerField(blank=True, null=True)),
            ],
        ),
    ]
