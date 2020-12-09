from config import *


class Casaco(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    marca = db.Column(db.String(254))
    cor = db.Column(db.String(254))
    tamanho = db.Column(db.String(254))


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


    def __str__(self):
        return f"{self.id}) {self.nome}; {self.idade}"


    def json(self):
        return {
            "id": self.id,
            "nome": self.nome,
            "idade": self.idade
        }


class Armario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    capacidade = db.Column(db.Integer)
    material = db.Column(db.String(254))
    cor = db.Column(db.String(254))

    pessoa_id = db.Column(db.ForeignKey(Pessoa.id), nullable=False)
    pessoa = db.relationship("Pessoa")

    casaco_id = db.Column(db.ForeignKey(Casaco.id), nullable=False)
    casaco = db.relationship("Casaco")


    def __str__(self):
        return f"{self.id}) {self.capacidade}; {self.material}; {self.cor};\n"+\
               f"{self.pessoa};\n" +\
               f"{self.casaco}"


    def json(self):
        return {
            "id": self.id,
            "capacidade": self.capacidade,
            "material": self.material,
            "cor": self.cor,
            "pessoa_id": self.pessoa_id,
            "pessoa": self.pessoa.json(),
            "casaco_id": self.casaco_id,
            "casaco": self.casaco.json()
        }


if __name__ == "__main__":

    if os.path.exists(arquivobd):
        os.remove(arquivobd)

    db.create_all()

    casaco1 = Casaco(marca="Adidas", cor="branco", tamanho="M")
    db.session.add(casaco1)

    pessoa1 = Pessoa(nome="Robson", idade=17)
    db.session.add(pessoa1)

    armario1 = Armario(capacidade=50, material="Alumínio", cor="Marrom",
                       pessoa=pessoa1, casaco=casaco1)
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