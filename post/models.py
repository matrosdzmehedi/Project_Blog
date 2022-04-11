from django.db import models
from django.db.models.signals import pre_save
from .utils import unique_slug_generator
from django.urls import reverse
from django.contrib.auth.models import User



class Post(models.Model):
    title = models.CharField(max_length=150, null=False, blank=False)
    description = models.TextField(null=False, blank=False)
    image = models.ImageField(null=True, blank=True, upload_to='post')
    date = models.DateTimeField(auto_now_add=True)
    slug = models.SlugField(null=False, blank=False, allow_unicode=True)
    author = models.ForeignKey(User, default=None, on_delete=models.CASCADE, related_name='user')

    class Meta:
        verbose_name = 'post'
        verbose_name_plural = 'posts'
        db_table = 'post'


    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('post', kwargs={'slug': self.slug})


def pre_save_receiver_post(sender, instance, *args, **kwargs):
    if not instance.slug:
        instance.slug = unique_slug_generator(instance)


pre_save.connect(pre_save_receiver_post, sender=Post)



class PostComment(models.Model):
    commented_by = models.ForeignKey(User, default=None, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, default=None, on_delete=models.CASCADE)
    body = models.TextField(null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'comment'
        verbose_name_plural = 'comments'
        db_table = 'comment'

class PostLike(models.Model):
    liked_by = models.ForeignKey(User, default=None, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, default=None, on_delete=models.CASCADE)
    liked = models.BooleanField(null=True)

    class Meta:
        verbose_name = 'like'
        verbose_name_plural = 'likes'
        db_table = 'postlike'