$( document ).ready(function() {
    $("#link_listar").click(function () {
        $.ajax({
            url: "http://localhost:5000/listar_casacos",
            method: "GET",
            dataType: "json",
            success: listar_casacos,
            error: function () {
                alert("back-end not connected!");
            }
        });
        function listar_casacos(casacos) {
            for (var i in casacos) {
            line = "<tr>" +
                "<td>" + casacos[i].id + "</td>" +
                "<td>" + casacos[i].marca + "</td>" +
                "<td>" + casacos[i].cor + "</td>" +
                "<td>" + casacos[i].tamanho + "</td>"
                "</tr>";
            $("#tabelaCasaco").append(line);
            };
        };
    });
})