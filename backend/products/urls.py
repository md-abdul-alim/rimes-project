from django.urls import path
from .apis import ProductAPI

urlpatterns = [
    path('products/', ProductAPI.as_view()),
    path('products/<int:pk>/', ProductAPI.as_view())
]
