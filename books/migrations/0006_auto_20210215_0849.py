# Generated by Django 3.1.5 on 2021-02-15 08:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0005_auto_20210213_1308'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='book',
            options={'ordering': ['-chosen']},
        ),
    ]
