from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FilesViewSet, translate, download

router = DefaultRouter()
router.register('files', FilesViewSet, basename='files')


urlpatterns = [
    path('api/', include(router.urls)),
    path('translate/<str:file_name>/<str:source>/<str:target>', translate),
    path('download/<str:file_name>', download),
]