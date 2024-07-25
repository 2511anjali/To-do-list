from django.db import models

# Create your models here.
class ToDo(models.Model):
    title =  models.CharField(max_length = 120)
    description = models.CharField(max_length=500)
    completed = models.BooleanField(default=False)

    def _str_(self):
        return self.title
