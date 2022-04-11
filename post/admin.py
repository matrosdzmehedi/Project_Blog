from django.contrib import admin

from post.models import *

# Register your models here.
admin.site.register(Post)
admin.site.register(PostLike)
admin.site.register(PostComment)