from post.models import Post
from rest_framework import status
from .serializers import *
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from post.models import Post
from post.utils import CustomPagination


class UserApi(CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]



class PostAllView(ListAPIView):
    queryset = Post.objects.all().order_by('-date')
    serializer_class = AllPostSerializer
    permission_classes = [AllowAny]
    pagination_class = CustomPagination


class PostDetailsView(RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = AllPostSerializer
    permission_classes = [AllowAny]
    lookup_field = 'slug'
    lookup_url_kwarg = "slug"



class CreatePostAPIView(CreateAPIView):
    
    serializer_class = CreatePostSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class PostCommentCreateView(CreateAPIView):
    queryset = PostComment.objects.all()
    serializer_class = PostCommentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        try:
            post = Post.objects.filter(slug__exact=self.request.data['slug']).first()
            serializer.save(commented_by_id=self.request.user.id,post_id=post.id,)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        except post.DoesNotExist:
            return PostComment.objects.none()


class CurrentPostCommentView(ListAPIView):
    serializer_class = PostCommentSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        try:
            post= Post.objects.filter(slug__exact=self.kwargs["slug"]).first()
            queryset = PostComment.objects.filter(post_id=post.id)
            return queryset
        except Post.DoesNotExist:
            return PostComment.objects.none()



class PostLikeView(CreateAPIView):
    serializer_class = PostLikeSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        
            check_like = PostLike.objects.filter(liked_by_id=self.request.user.id,post__slug__exact=self.request.data['slug'])

            if bool(check_like):
                obj = check_like.first()
                if self.request.data['liked']== True:
                    obj.liked = True
                    obj.save()
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
            if bool(check_like):
                obj = check_like.first()
                if self.request.data['liked']== False:
                    obj.liked = False
                    obj.save()
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                    postid = Post.objects.get(slug__exact=self.request.data['slug'])
                    obj = PostLike(liked_by=self.request.user,post=postid,liked=True)
                    obj.save()
                    return Response(serializer.data, status=status.HTTP_201_CREATED)




class CurrentPostLikeView(ListAPIView):
    serializer_class = LikeCountserializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        try:
            post= Post.objects.filter(slug__exact=self.kwargs["slug"]).first()
            queryset = PostLike.objects.filter(post_id=post.id)
            return queryset
        except Post.DoesNotExist:
            return PostLike.objects.none()

   