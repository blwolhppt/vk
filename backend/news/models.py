from django.db import models

from .constants import MAX_LENGTH, DEFAULT_RATING, MAX_LENGTH_LINK
from .validators import validate_username


class News(models.Model):
    name = models.CharField(max_length=MAX_LENGTH,
                            verbose_name='Название')
    rating_positive = models.IntegerField(default=DEFAULT_RATING,
                                          verbose_name='Кол-во позитивных '
                                                       'голосов')
    rating_negative = models.IntegerField(default=DEFAULT_RATING,
                                          verbose_name='Кол-во негативных '
                                                       'голосов')

    author = models.CharField(validators=(validate_username,),
                              max_length=MAX_LENGTH,
                              verbose_name='Автор новости')
    href = models.CharField(max_length=MAX_LENGTH_LINK,
                            verbose_name='Ссылка на новость')
    title = models.CharField(max_length=MAX_LENGTH,
                             verbose_name='Заголовок')
    pub_date = models.DateTimeField(verbose_name='Дата',
                                    auto_now_add=True)
    news_date = models.DateTimeField(verbose_name='Дата новости',
                                     auto_now_add=False)

    class Meta:
        verbose_name = 'Новости'
        ordering = ['-pub_date']

    def __str__(self):
        return self.name


class Comments(models.Model):
    news = models.ForeignKey(News,
                             blank=True,
                             null=True,
                             on_delete=models.CASCADE,
                             related_name='Комментарий',
                             )
    author = models.CharField(validators=(validate_username,),
                              max_length=MAX_LENGTH,
                              verbose_name='Никнейм')
    text = models.TextField(verbose_name='Текст комментария')
    parent_comment = models.ForeignKey(
        'self',
        blank=True,
        null=True,
        on_delete=models.CASCADE
    )
    pub_date = models.DateTimeField(verbose_name='Дата комментария',
                                    auto_now_add=True)

    class Meta:
        verbose_name = 'Комментарии'
        ordering = ['-pub_date']
