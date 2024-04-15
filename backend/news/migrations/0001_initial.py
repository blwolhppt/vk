# Generated by Django 5.0.4 on 2024-04-15 14:29

import django.db.models.deletion
import news.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='News',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=300, verbose_name='Название')),
                ('rating_positive', models.IntegerField(default=0, verbose_name='Кол-во позитивных голосов')),
                ('rating_negative', models.IntegerField(default=0, verbose_name='Кол-во негативных голосов')),
                ('author', models.CharField(max_length=300, validators=[news.validators.validate_username], verbose_name='Автор новости')),
                ('href', models.CharField(max_length=500, verbose_name='Ссылка на новость')),
                ('title', models.CharField(max_length=300, verbose_name='Заголовок')),
                ('pub_date', models.DateTimeField(auto_now_add=True, verbose_name='Дата')),
                ('news_date', models.DateTimeField(verbose_name='Дата новости')),
            ],
            options={
                'verbose_name': 'Новости',
                'ordering': ['-pub_date'],
            },
        ),
        migrations.CreateModel(
            name='Comments',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('author', models.CharField(max_length=300, validators=[news.validators.validate_username], verbose_name='Никнейм')),
                ('text', models.TextField(verbose_name='Текст комментария')),
                ('pub_date', models.DateTimeField(auto_now_add=True, verbose_name='Дата комментария')),
                ('parent_comment', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='news.comments')),
                ('news', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='Комментарий', to='news.news')),
            ],
            options={
                'verbose_name': 'Комментарии',
                'ordering': ['-pub_date'],
            },
        ),
    ]
