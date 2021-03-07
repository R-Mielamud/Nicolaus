# Generated by Django 3.1.5 on 2021-02-08 17:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('book_filters', '0007_status'),
        ('books', '0002_auto_20210206_1413'),
    ]

    operations = [
        migrations.AddField(
            model_name='book',
            name='status',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='books', to='book_filters.status'),
        ),
    ]
