from config import *
from model import Casaco

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