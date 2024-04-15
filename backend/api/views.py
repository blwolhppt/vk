from django_filters.rest_framework import DjangoFilterBackend

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination

from api import serializers
from api.filters import ComFilter

from news.models import News, Comments


class NewsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = News.objects.all()
    serializer_class = serializers.NewsSerializer
    pagination_class = PageNumberPagination

    @action(detail=True, 
            methods=['POST'],
            )
    def add_positive_rating(self, request, pk=None):
        news = self.get_object()
        news.rating_positive += 1
        news.save()
        return Response('Все прошло успешно!')

    @action(detail=True, 
            methods=['POST'],
            )
    def add_negative_rating(self, request, pk=None):
        news = self.get_object()
        news.rating_negative += 1
        news.save()
        return Response('Все прошло успешно!')
    


class CommentsViewSet(viewsets.ModelViewSet):
    queryset = Comments.objects.all()
    serializer_class = serializers.CommentsSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = ComFilter

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            id_parent = request.data.get('parent_comment')
            if id_parent:
                try:
                    parent_comment = Comments.objects.get(pk=id_parent)
                    serializer.save(parent_comment=parent_comment)
                except Comments.DoesNotExist:
                    return Response('Нет главного коммента', status=status.HTTP_400_BAD_REQUEST)
            else:
                serializer.save()
            return Response('Все прошло успешно!', status=status.HTTP_201_CREATED)
        return Response('Возникла ошибка', status=status.HTTP_400_BAD_REQUEST)
    