from rest_framework import serializers
from post.models import Post, PostComment, PostLike
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator
from rest_framework.parsers import MultiPartParser, FormParser


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password', 'placeholder': 'Password'}
    )
    email = serializers.EmailField(required=True, validators=[UniqueValidator(queryset=User.objects.all())])

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = super().create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user


class PostLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostLike
        fields = ['liked']


class LikeCountserializer(serializers.ModelSerializer):
    count_liked = serializers.SerializerMethodField()
    count_unliked = serializers.SerializerMethodField()
    class Meta:
        model = PostLike
        fields = ['count_liked','count_unliked']

    def get_count_liked(self,obj):
                return PostLike.objects.filter(post=obj.post, liked=True).count()
    def get_count_unliked(self,obj):
                return PostLike.objects.filter(post=obj.post, liked=False).count()







class AllPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['title', 'description', 'date', 'slug', 'image', 'author']
        read_only_fields = ['title', 'description', 'date', 'slug', 'image', 'author']
        depth = 1

    def to_representation(self, instance):
        rep = super(AllPostSerializer, self).to_representation(instance)
        rep['author'] = instance.author.username
        return rep



class CreatePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['title', 'description', 'image']
        parser_classes = (MultiPartParser, FormParser)

    
class PostCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostComment
        fields = ['commented_by', 'body']
        depth = 1

    def to_representation(self, instance):
        rep = super(PostCommentSerializer, self).to_representation(instance)
        rep['commented_by'] = instance.commented_by.username
        return rep