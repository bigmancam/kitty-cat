from django.db import models

# Create your models here.


class User(models.Model):
	name = models.CharField(max_length=128, unique=True)


	def __unicode__(self):
		return self.name

class Comment(models.Model):
    text = models.CharField(max_length=128)
