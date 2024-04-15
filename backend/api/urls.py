from django.urls import path, include
from rest_framework.routers import SimpleRouter

from api import views

router = SimpleRouter()

router.register('news', views.NewsViewSet)
router.register('comments', views.CommentsViewSet)


urlpatterns = [
    path('', include(router.urls)), 
]
