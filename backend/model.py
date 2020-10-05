from config import *

class Casaco(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    marca = db.Column(db.String(254))
    cor = db.Column(db.String(254))
    tamanho = db.Column(db.String(254))

    def __str__(self):
        return str(self.id)+") "+ self.marca + ", " +\
            self.cor + ", " + self.tamanho

    def json(self):
        return {
            "id": self.id,
            "marca": self.marca,
            "cor": self.cor,
            "tamanho": self.tamanho
        }

if __name__ == "__main__":

    if os.path.exists(arquivobd):
        os.remove(arquivobd)

    db.create_all()

    casaco1 = Casaco(marca = "Adidas", cor = "branco", 
        tamanho = "M")
    casaco2 = Casaco(marca = "Nike", cor = "preto", 
        tamanho = "G")        
    
    db.session.add(casaco1)
    db.session.add(casaco2)
    db.session.commit()