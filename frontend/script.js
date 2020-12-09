$(function() {
    function exibir_casacos() {
        $.ajax({
            url: 'http://localhost:5000/listar_casacos',
            method: 'GET',
            dataType: 'json',
            success: listar,
            error: function() {
                alert("erro ao ler dados, verifique o backend");
            }
        });
        function listar (casacos) {
            $('#corpoTabelaCasacos').empty();
            mostrar_conteudo("casacos");
            for (var i in casacos) {
                lin = `<tr id="linha_${casacos[i].id}">
                <td> ${casacos[i].marca} </td>
                <td> ${casacos[i].cor} </td>
                <td> ${casacos[i].tamanho} </td>
                <td>
                    <a href=# id="${casacos[i].id}" class="excluir_casaco">
                        <p class="badge badge-danger">Excluir</p>
                    </a>
                </td>
                </tr>`;
                $('#corpoTabelaCasacos').append(lin);
            }
        }
    }

    function exibir_pessoas() {
        $.ajax({
            url: 'http://localhost:5000/listar_pessoas',
            method: 'GET',
            dataType: 'json',
            success: listar,
            error: function() {
                alert("erro ao ler dados, verifique o backend");
            }
        });
        function listar(pessoas) {
            $('#corpoTabelaPessoas').empty();
            mostrar_conteudo("pessoas");
            for (var i in pessoas) {
                lin = `<tr id="linha_${pessoas[i].id}">
                <td> ${pessoas[i].nome} </td>
                <td> ${pessoas[i].idade} </td>
                </tr>`;
                $('#corpoTabelaPessoas').append(lin);
            }
        }
    }

    function exibir_armarios() {
        $.ajax({
            url: 'http://localhost:5000/listar_armarios',
            method: 'GET',
            dataType: 'json',
            success: listar,
            error: function() {
                alert("erro ao ler dados, verifique o backend");
            }
        });
        function listar(armarios) {
            $('#corpoTabelaArmarios').empty();
            mostrar_conteudo("armarios");
            for (var i in armarios) {
                lin = `<tr id="linha_${armarios[i].id}">
                <td> ${armarios[i].capacidade} </td>
                <td> ${armarios[i].material} </td>
                <td> ${armarios[i].cor} </td>
                <td> ${armarios[i].casaco.marca} </td>
                <td> ${armarios[i].casaco.cor} </td>
                <td> ${armarios[i].casaco.tamanho} </td>
                <td> ${armarios[i].pessoa.nome} </td>
                <td> ${armarios[i].pessoa.idade} </td>
                </tr>`;
                $('#corpoTabelaArmarios').append(lin);
            }
        }
    }

    function mostrar_conteudo(identificador) {
        $("#casacos").addClass('d-none');
        $("#pessoas").addClass('d-none');
        $("#armarios").addClass('d-none');
        $("#conteudoInicial").addClass('d-none');
        $("#"+identificador).removeClass('d-none');
    }

    $(document).on("click", "#linkListarCasacos", function() {
        exibir_casacos();
    });

    $(document).on("click", "#linkListarPessoas", function() {
        exibir_pessoas();
    });

    $(document).on("click", "#linkListarArmarios", function() {
        exibir_armarios();
    });

    $(document).on("click", "#linkInicio", function() {
        mostrar_conteudo("conteudoInicial");
    });

    $(document).on("click", "#btIncluirCasaco", function() {
        marca = $("#campoMarca").val();
        cor = $("#campoCor").val();
        tamanho = $("#campoTamanho").val();
        var dados = JSON.stringify({ marca: marca, cor: cor, tamanho: tamanho});
        $.ajax({
            url: 'http://localhost:5000/incluir_casaco',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: dados,
            success: casacoIncluido,
            error: erroAoIncluir
        });
        function casacoIncluido (retorno) {
            if (retorno.resultado == "ok") {
                alert("casaco incluído com sucesso!");
                $("#campoMarca").val("");
                $("#campoCor").val("");
                $("#campoTamanho").val("");
            } else {
                alert(retorno.resultado + ":" + retorno.detalhes);
            }
        }
        function erroAoIncluir (retorno) {
            alert("ERRO: "+retorno.resultado + ":" + retorno.detalhes);
        }
    });

    $('#modalIncluirCasaco').on('hide.bs.modal', function (e) {
        if (! $("#tabelaCasacos").hasClass('d-none')) {
            exibir_casacos();
        }
    });

    $(document).on("click", ".excluir_casaco", function() {
        var idCasaco = $(this).attr("id");

        $.ajax({
          url: `http://localhost:5000/excluir_casaco/${idCasaco}`,
          type: "DELETE",
          dataType: 'json',
          success: excluirCasaco,
          error: deleteError
        });

        function excluirCasaco(retorno) {
          if (retorno.resultado == "ok") {
            $(`#linha_${idCasaco}`).fadeOut();
          } else {
            alert(`ERRO: ${retorno.resultado}: ${retorno.datalhes}`);
          }
        }

        function deleteError(retorno) {
          alert("Erro ¯|_(ツ)_/¯");
        }
      });
    mostrar_conteudo("conteudoInicial");
});