from config import *
from model import Casaco, Pessoa, Armario

@app.route("/")
def inicio():
    return 'Sistema de cadastro de casacos. '+\
        '<a href="/listar_casacos">Operação listar</a>'

@app.route("/listar_casacos")
def listar_casacos():
    casacos = db.session.query(Casaco).all()
    casacos_em_json = [ casaco.json() for casaco in casacos ]
    resultado = jsonify(casacos_em_json)
    resultado.headers.add("Access-Control-Allow-Origin", "*")
    return resultado

@app.route("/incluir_casaco", methods=["post"])
def incluir_casaco():
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    dados = request.get_json()

    try:
        novo_casaco = Casaco(**dados)
        db.session.add(novo_casaco)
        db.session.commit()

    except Exception as e:

        resposta = jsonify({"resultado": "error", "detalhes": str(e)})

    resposta.headers.add("Access-Control-Allow-Origin", "*")

    return resposta


@app.route("/excluir_casaco/<int:id_casaco>", methods=["delete"])
def excluir_casaco(id_casaco):
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})

    try:
        Casaco.query.filter(Casaco.id == id_casaco).delete()
        db.session.commit()

    except Exception as e:

        resposta = jsonify({"resultado": "error", "detalhes": str(e)})

    resposta.headers.add("Access-Control-Allow-Origin", "*")

    return resposta

@app.route("/listar_pessoas")
def listar_pessoas():
    pessoas = db.session.query(Pessoa).all()
    pessoas_em_json = [ pessoa.json() for pessoa in pessoas ]
    resultado = jsonify(pessoas_em_json)
    print(pessoas_em_json)
    resultado.headers.add("Access-Control-Allow-Origin", "*")
    return resultado

@app.route("/listar_armarios")
def listar_armarios():
    armarios = db.session.query(Armario).all()
    armarios_em_json = [ armario.json() for armario in armarios ]
    resultado = jsonify(armarios_em_json)
    resultado.headers.add("Access-Control-Allow-Origin", "*")
    return resultado