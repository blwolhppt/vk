from django_filters.rest_framework import FilterSet

from news.models import Comments


class ComFilter(FilterSet):
    class Meta:
        model = Comments
        fields = ['news']