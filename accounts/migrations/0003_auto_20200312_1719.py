# Generated by Django 3.0.4 on 2020-03-12 17:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_remove_userprofile_email'),
    ]

    operations = [
        migrations.CreateModel(
            name='Instrument',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.TextField()),
            ],
        ),
        migrations.AddField(
            model_name='userprofile',
            name='instruments',
            field=models.ManyToManyField(blank=True, related_name='instruments', to='accounts.Instrument'),
        ),
    ]