from django.urls import path
from .views import *
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [

    #Authenticated API
    path('auth/new-post/', CreatePostAPIView.as_view()),  # create request.user post
    path('auth/new-comment/', PostCommentCreateView.as_view()),
    path('auth/new-like/', PostLikeView.as_view()),

    # public API
    path('public/create-user/', csrf_exempt(UserApi.as_view())),
    path('public/comments/<str:slug>/', CurrentPostCommentView.as_view()),
    path('public/posts/', PostAllView.as_view()),
    path('public/likes-count/<str:slug>/', CurrentPostLikeView.as_view()),
    path('public/post-details/<str:slug>/', PostDetailsView.as_view()),]