from django.db import models

class Resultado(models.Model):
    nome = models.CharField(max_length=100)
    imagem = models.URLField()
    data = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nome
