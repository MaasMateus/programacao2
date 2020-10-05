$(function() { // quando o documento estiver pronto/carregado
    
    // função para exibir casacoss na tabela
    function exibir_casacos() {
        $.ajax({
            url: 'http://localhost:5000/listar_casacos',
            method: 'GET',
            dataType: 'json', // os dados são recebidos no formato json
            success: listar, // chama a função listar para processar o resultado
            error: function() {
                alert("erro ao ler dados, verifique o backend");
            }
        });
        function listar (casacos) {
            // esvaziar o corpo da tabela
            $('#corpoTabelaCasacos').empty();
            // tornar a tabela visível
            mostrar_conteudo("tabelaCasacos");      
            // percorrer a lista de casacoss retornadas; 
            for (var i in casacos) { //i vale a posição no vetor
                lin = '<tr>' + // elabora linha com os dados da casaco
                '<td>' + casacos[i].marca + '</td>' + 
                '<td>' + casacos[i].cor + '</td>' + 
                '<td>' + casacos[i].tamanho + '</td>' + 
                '</tr>';
                // adiciona a linha no corpo da tabela
                $('#corpoTabelaCasacos').append(lin);
            }
        }
    }

    // função que mostra um conteúdo e esconde os outros
    function mostrar_conteudo(identificador) {
        // esconde todos os conteúdos
        $("#tabelaCasaco").addClass('invisible');
        $("#conteudoInicial").addClass('invisible');
        // torna o conteúdo escolhido visível
        $("#"+identificador).removeClass('invisible');      
    }

    // código para mapear o click do link Listar
    $(document).on("click", "#linkListarCasacos", function() {
        exibir_casacos();
    });
    
    // código para mapear click do link Inicio
    $(document).on("click", "#linkInicio", function() {
        mostrar_conteudo("conteudoInicial");
    });

    // código para mapear click do botão incluir casaco
    $(document).on("click", "#btIncluirCasaco", function() {
        //pegar dados da tela
        marca = $("#campoMarca").val();
        cor = $("#campoCor").val();
        tamanho = $("#campoTamanho").val();
        // preparar dados no formato json
        var dados = JSON.stringify({ marca: marca, cor: cor, tamanho: tamanho});
        // fazer requisição para o back-end
        $.ajax({
            url: 'http://localhost:5000/incluir_casaco',
            type: 'POST',
            dataType: 'json', // os dados são recebidos no formato json
            contentType: 'application/json', // tipo dos dados enviados
            data: dados, // estes são os dados enviados
            success: casacoIncluido, // chama a função listar para processar o resultado
            error: erroAoIncluir
        });
        function casacoIncluido (retorno) {
            if (retorno.resultado == "ok") { // a operação deu certo?
                // informar resultado de sucesso
                alert("casaco incluído com sucesso!");
                // limpar os campos
                $("#campoMarca").val("");
                $("#campoCor").val("");
                $("#campoTamanho").val("");
            } else {
                // informar mensagem de erro
                alert(retorno.resultado + ":" + retorno.detalhes);
            }            
        }
        function erroAoIncluir (retorno) {
            // informar mensagem de erro
            alert("ERRO: "+retorno.resultado + ":" + retorno.detalhes);
        }
    });

    // código a ser executado quando a janela de inclusão de casacos for fechada
    $('#modalIncluirCasaco').on('hide.bs.modal', function (e) {
        // se a página de listagem não estiver invisível
        if (! $("#tabelaCasacos").hasClass('invisible')) {
            // atualizar a página de listagem
            exibir_casacos();
        }
    });

    // a função abaixo é executada quando a página abre
    mostrar_conteudo("conteudoInicial");
});