# Generated by Django 3.0.4 on 2020-03-12 19:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0005_userprofile_link'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='link',
            field=models.CharField(max_length=55),
        ),
    ]
