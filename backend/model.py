from config import *


class Casaco(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    marca = db.Column(db.String(254))
    cor = db.Column(db.String(254))
    tamanho = db.Column(db.String(254))

    armario_casaco = db.relationship("Armario",
                                     back_populates="casaco_armario")


    def __str__(self):
        return f"{self.id}) {self.marca}; {self.cor}; {self.tamanho}"


    def json(self):
        return {
            "id": self.id,
            "marca": self.marca,
            "cor": self.cor,
            "tamanho": self.tamanho
        }


class Pessoa(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(254))
    idade = db.Column(db.Integer)

    armario_pessoa = db.relationship("Armario",
                                     back_populates="pessoa_armario")


    def __str__(self):
        return f"{self.id}) {self.nome}; {self.idade}"


    def json(self):
        return {
            "id": self.id,
            "marca": self.nome,
            "cor": self.idade
        }


class Armario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    capacidade = db.Column(db.Integer)
    material = db.Column(db.String(254))
    cor = db.Column(db.String(254))

    pessoa_id = db.Column(db.ForeignKey(Pessoa.id), nullable=False)
    pessoa_armario = db.relationship("Pessoa", back_populates="armario_pessoa")

    casaco_id = db.Column(db.ForeignKey(Casaco.id), nullable=False)
    casaco_armario = db.relationship("Casaco", back_populates="armario_casaco")


    def __str__(self):
        return f"{self.id}) {self.capacidade}; {self.material}; {self.cor};\n"+\
               f"{self.pessoa_armario};\n" +\
               f"{self.casaco_armario}"


    def json(self):
        return {
            "id": self.id,
            "capacidade": self.capacidade,
            "material": self.material,
            "cor": self.cor,
            "pessoa_id": self.pessoa_id,
            "pessoa_armario": self.pessoa_armario,
            "casaco_id": self.casaco_id,
            "casaco_armario": self.casaco_armario
        }


if __name__ == "__main__":

    if os.path.exists(arquivobd):
        os.remove(arquivobd)

    db.create_all()

    casaco1 = Casaco(marca="Adidas", cor="branco", tamanho="M")
    db.session.add(casaco1)

    pessoa1 = Pessoa(nome="Robson", idade=17)
    db.session.add(pessoa1)

    armario1 = Armario(capacidade=50, material="branco", cor="Marrom",
                       pessoa_armario=pessoa1, casaco_armario=casaco1)
    db.session.add(armario1)

    db.session.commit()

    print(casaco1)
    print(casaco1.json())
    print('\n')
    print(pessoa1)
    print(pessoa1.json())
    print('\n')
    print(armario1)
    print(armario1.json())