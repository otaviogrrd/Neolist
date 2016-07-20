
var idSelecionado = 0;
function pegaIdSelecionado(arg) {  
	idSelecionado = arg;
	return false;
}

var map={"â":"a","Â":"A","à":"a","À":"A","á":"a","Á":"A","ã":"a","Ã":"A","ê":"e","Ê":"E","è":"e","È":"E","é":"e","É":"E","î":"i","Î":"I","ì":"i","Ì":"I","í":"i","Í":"I","õ":"o","Õ":"O","ô":"o","Ô":"O","ò":"o","Ò":"O","ó":"o","Ó":"O","ü":"u","Ü":"U","û":"u","Û":"U","ú":"u","Ú":"U","ù":"u","Ù":"U","ç":"c","Ç":"C"};
function removerAcentos(s){ return s.replace(/[\W\[\] ]/g,function(a){return map[a]||a}) };

$(document).on("pageshow", "#contatos-page", function() {
    $("#contatoslist").empty().listview("refresh");

    var url = "http://neolist.com.br/appweb/getContatosNeoList.php";
    $.getJSON(url, function(result, status) {
            if (status === 'success') {

                window.localStorage.clear();

                $.each(result, function(i, field) {
                    var id = field.id;
                    var nome = field.nome;
                    var username = field.login;
                    var categoria = field.categoria;
                    var idioma = field.idioma;
                    var email = field.email;
                    var telefone = field.telefone;
                    var pais = field.pais;
                    var estado = field.estado;
                    var cidade = field.cidade;
                    var descricao_categoria = field.descricao_categoria;
                    var descricao_idioma = field.descricao_idioma;
                    var nome_pais = field.nome_pais;
                    var localData = JSON.stringify(field);
                    window.localStorage.setItem('CONTACT' + id, localData);

                    if (categoria === '2') { //peregrino
                        $("#contatoslist").append('<a ' +
                            'style="border: 1px solid #11af4a!important; background:#11af4a!important;" ' +
                            'onclick="pegaIdSelecionado(' + id + ');" href="#detalhes-page" ' +
                            'idContato="' + id + '" data-role="button" data-corners="true" data-shadow="true" ' +
                            'data-iconshadow="true" data-wrapperels="span" class="rever ui-btn ui-shadow ui-btn-corner-all ' +
                            'ui-btn-icon-left ui-btn-up-f"><span class="ui-btn-inner"><span class="ui-btn-text">' + nome + '</span>' +
                            '<span style="display:none;">' + descricao_categoria + '</span>' +
                            '<span class="ui-icon ui-icon-check">&nbsp;</span></span></a>');
                    } else if (categoria === '5' || categoria === '6') {
                        $("#contatoslist").append('<a ' +
                            'style="border: 1px solid #c70f0f!important; background:#c70f0f!important;" ' +
                            'onclick="pegaIdSelecionado(' + id + ');" href="#detalhes-page" ' +
                            'idContato="' + id + '" data-role="button" data-corners="true" data-shadow="true" ' +
                            'class="rever ui-btn ui-shadow ui-btn-corner-all ' +
                            'ui-btn-icon-left ui-btn-up-f"><span class="ui-btn-inner"><span class="ui-btn-text">' + nome + '</span>' +
                            '<span style="display:none;">' + descricao_categoria + '</span>' +
                            '<span class="ui-icon ui-icon-plus">&nbsp;</span></span></a>');
                    } else if (categoria === '7') { //brigadista
                        $("#contatoslist").append('<a ' +
                            'style="border: 1px solid #ef7008!important; background:#ef7008!important;" ' +
                            'onclick="pegaIdSelecionado(' + id + ');" href="#detalhes-page" ' +
                            'idContato="' + id + '" data-role="button" data-corners="true" data-shadow="true" ' +
                            'class="rever ui-btn ui-shadow ui-btn-corner-all ' +
                            'ui-btn-icon-left ui-btn-up-f"><span class="ui-btn-inner"><span class="ui-btn-text">' + nome + '</span>' +
                            '<span style="display:none;">' + descricao_categoria + '</span>' +
                            '<span class="ui-icon ui-icon-alert">&nbsp;</span></span></a>');
                    } else if (categoria === '1') { //monitor
                        $("#contatoslist").append('<a ' +
                            'style="border: 1px solid #6c49f1!important; background:#6c49f1!important;" ' +
                            'onclick="pegaIdSelecionado(' + id + ');" href="#detalhes-page" ' +
                            'idContato="' + id + '" data-role="button" data-corners="true" data-shadow="true" ' +
                            'class="rever ui-btn ui-shadow ui-btn-corner-all ' +
                            'ui-btn-icon-left ui-btn-up-f"><span class="ui-btn-inner"><span class="ui-btn-text">' + nome + '</span>' +
                            '<span style="display:none;">' + descricao_categoria + '</span>' +
                            '<span class="ui-icon ui-icon-alert">&nbsp;</span></span></a>');

                    } else { //responsaveis
                        $("#contatoslist").append('<a ' +
                            'onclick="pegaIdSelecionado(' + id + ');" href="#detalhes-page" ' +
                            'idContato="' + id + '" data-role="button" data-corners="true" data-shadow="true" ' +
                            'data-iconshadow="true" data-wrapperels="span" class="rever ui-btn ui-shadow ui-btn-corner-all ' +
                            'ui-btn-icon-left ui-btn-up-f"><span class="ui-btn-inner"><span class="ui-btn-text">' + nome + '</span>' +
                            '<span style="display:none;">' + descricao_categoria + '</span>' +
                            '<span class="ui-icon ui-icon-flat-man ui-icon-shadow">&nbsp;</span></span></a>');
                    }
                });
            }
            $('#contatoslist').listview('refresh');
        })
        .fail(function() {
            $('#popUpConexErro').popup('open');
            var i = 1;
            while (i < 5000) {
                var localData = JSON.parse(window.localStorage.getItem('CONTACT' + i));
                if (localData !== null) {
                    var id = localData.id;
                    var nome = localData.nome;
                    var username = localData.login;
                    var categoria = localData.categoria;
                    var idioma = localData.idioma;
                    var email = localData.email;
                    var telefone = localData.telefone;
                    var pais = localData.pais;
                    var estado = localData.estado;
                    var cidade = localData.cidade;
                    var descricao_categoria = localData.descricao_categoria;
                    var descricao_idioma = localData.descricao_idioma;
                    var nome_pais = localData.nome_pais;


                    if (categoria === '2') { //peregrino
                        $("#contatoslist").append('<a ' +
                            'style="border: 1px solid #11af4a!important; background:#11af4a!important;" ' +
                            'onclick="pegaIdSelecionado(' + id + ');" href="#detalhes-page" ' +
                            'idContato="' + id + '" data-role="button" data-corners="true" data-shadow="true" ' +
                            'data-iconshadow="true" data-wrapperels="span" class="rever ui-btn ui-shadow ui-btn-corner-all ' +
                            'ui-btn-icon-left ui-btn-up-f"><span class="ui-btn-inner"><span class="ui-btn-text">' + nome + '</span>' +
                            '<span style="display:none;">' + categoria + '</span>' +
                            '<span class="ui-icon ui-icon-check">&nbsp;</span></span></a>');
                    } else if (categoria === '5' || categoria === '6') {
                        $("#contatoslist").append('<a ' +
                            'style="border: 1px solid #c70f0f!important; background:#c70f0f!important;" ' +
                            'onclick="pegaIdSelecionado(' + id + ');" href="#detalhes-page" ' +
                            'idContato="' + id + '" data-role="button" data-corners="true" data-shadow="true" ' +
                            'class="rever ui-btn ui-shadow ui-btn-corner-all ' +
                            'ui-btn-icon-left ui-btn-up-f"><span class="ui-btn-inner"><span class="ui-btn-text">' + nome + '</span>' +
                            '<span style="display:none;">' + categoria + '</span>' +
                            '<span class="ui-icon ui-icon-plus">&nbsp;</span></span></a>');
                    } else if (categoria === '7') { //brigadista
                        $("#contatoslist").append('<a ' +
                            'style="border: 1px solid #ef7008!important; background:#ef7008!important;" ' +
                            'onclick="pegaIdSelecionado(' + id + ');" href="#detalhes-page" ' +
                            'idContato="' + id + '" data-role="button" data-corners="true" data-shadow="true" ' +
                            'class="rever ui-btn ui-shadow ui-btn-corner-all ' +
                            'ui-btn-icon-left ui-btn-up-f"><span class="ui-btn-inner"><span class="ui-btn-text">' + nome + '</span>' +
                            '<span style="display:none;">' + categoria + '</span>' +
                            '<span class="ui-icon ui-icon-alert">&nbsp;</span></span></a>');
                    } else if (categoria === '1') { //monitor
                        $("#contatoslist").append('<a ' +
                            'style="border: 1px solid #6c49f1!important; background:#6c49f1!important;" ' +
                            'onclick="pegaIdSelecionado(' + id + ');" href="#detalhes-page" ' +
                            'idContato="' + id + '" data-role="button" data-corners="true" data-shadow="true" ' +
                            'class="rever ui-btn ui-shadow ui-btn-corner-all ' +
                            'ui-btn-icon-left ui-btn-up-f"><span class="ui-btn-inner"><span class="ui-btn-text">' + nome + '</span>' +
                            '<span style="display:none;">' + categoria + '</span>' +
                            '<span class="ui-icon ui-icon-alert">&nbsp;</span></span></a>');

                    } else { //responsaveis
                        $("#contatoslist").append('<a ' +
                            'onclick="pegaIdSelecionado(' + id + ');" href="#detalhes-page" ' +
                            'idContato="' + id + '" data-role="button" data-corners="true" data-shadow="true" ' +
                            'data-iconshadow="true" data-wrapperels="span" class="rever ui-btn ui-shadow ui-btn-corner-all ' +
                            'ui-btn-icon-left ui-btn-up-f"><span class="ui-btn-inner"><span class="ui-btn-text">' + nome + '</span>' +
                            '<span style="display:none;">' + categoria + '</span>' +
                            '<span class="ui-icon ui-icon-flat-man ui-icon-shadow">&nbsp;</span></span></a>');
                    }
                }
                i++;
            }
            $('#contatoslist').listview('refresh');
        });
});

$(document).on("pageshow", "#detalhes-page", function() {

    $("#nome-detalhe").val("");

    var localData = JSON.parse(window.localStorage.getItem('CONTACT' + idSelecionado));
    if (localData !== null) {
        var id = localData.id;
        var nome = localData.nome;
        var username = localData.login;
        var categoria = localData.categoria;
        var idioma = localData.idioma;
        var email = localData.email;
        var telefone = localData.telefone;
        var pais = localData.pais;
        var estado = localData.estado;
        var cidade = localData.cidade;
        var descricao_categoria = localData.descricao_categoria;
        var descricao_idioma = localData.descricao_idioma;
        var nome_pais = localData.nome_pais;
        // $("#listview").append('<a onclick="pegaIdSelecionado('+id+');" href="#detalhes-page" data-icon="flat-man" idContato="'+id+'" theme="f"  data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="rever ui-btn ui-shadow ui-btn-corner-all ui-btn-icon-left ui-btn-up-f"><span class="ui-btn-inner"><span class="ui-btn-text">'+nome+'</span><span class="ui-icon ui-icon-flat-man ui-icon-shadow">&nbsp;</span></span></a>');

        $("#nome-detalhe").val(nome);
        $("#categoria-detalhe").val(descricao_categoria);
        $("#idioma-detalhe").val(descricao_idioma);
        $("#email-detalhe").val(email);
        $("#telefone-detalhe").val(telefone);
        $("#pais-detalhe").val(nome_pais);

        if (estado == null || estado == "null" || estado == "") {
            $("#cidade-detalhe").val(cidade);
        } else {
            $("#cidade-detalhe").val(cidade + " - " + estado);
        }
    } else {
        var url = "http://neolist.com.br/appweb/getDetalheContatoNeoList.php?id=" + idSelecionado;
        $.getJSON(url, function(result, status) {
            if (status === 'success') {
                //console.log(result);

                $.each(result, function(i, field) {
                    var id = field.id;
                    var nome = field.nome;
                    var categoria = field.descricao_categoria;
                    var idioma = field.descricao_idioma;
                    var email = field.email;
                    var telefone = field.telefone;
                    var pais = field.nome_pais;
                    var cidade = field.cidade;
                    var estado = field.estado;
                    var descricao_categoria = field.descricao_categoria;
                    var descricao_idioma = field.descricao_idioma;
                    var nome_pais = field.nome_pais;


                    $("#nome-detalhe").val(nome);
                    $("#categoria-detalhe").val(categoria);
                    $("#idioma-detalhe").val(idioma);
                    $("#email-detalhe").val(email);
                    $("#telefone-detalhe").val(telefone);
                    $("#pais-detalhe").val(pais);

                    if (estado == null || estado == "null" || estado == "") {
                        $("#cidade-detalhe").val(cidade);
                    } else {
                        $("#cidade-detalhe").val(cidade + " - " + estado);
                    }


                });
            }
        });
    }
});


$(document).on("pageinit", "#login-page", function() {

    $("#input-username").val("");
    $("#input-senha").val("");
});

$(document).on("pagebeforeshow", "#cadastro-page", function() {

    $("#nome").val("");
    $("#username").val("");
    $("#senha").val("");
    $("#categoria").val("");
    $("#idioma").val("");
    $("#email").val("");
    $("#telefone").val("");
    $("#pais").val("");
    $("#estado").val("");
    $("#cidade").val("");
});

$("#btn-edit").click(function() {

    /*   $.ajax({
				url:"http://neolist.com.br/appweb/getSessaoUsuario.php?username="+username+"",
					dataType : "json",
					success : function(data) {
						if(data.length == 0) {
						  $.mobile.changePage("#home-page");
						} else if(data.length == 1) {
						   $.mobile.changePage("#edit-page");
						}
					}
				}); */

});

$("#call-btn").click(function() {
    var tel = $("#telefone-detalhe").val();
    document.location.href = 'tel:' + tel;
});

$("#login-btn").click(function() {

    var username = $("#input-username").val();
    var senha = $("#input-senha").val();

    if (username.length > 0 && senha.length > 0) {

        $.ajax({
            url: "http://neolist.com.br/appweb/getLoginNeoList.php?username=" + username + "&senha=" + senha,
            dataType: "json",
            //data : "GET",
            success: function(data) {
                //alert(data[0].login);
                if (data[0].login == null) {

                    $('#popUpDadosLoginInvalidos').popup('open');

                } else if (data[0].login != null) {

                    var url = "http://neolist.com.br/appweb/getDetalhesAlteracao.php?id=" + data[0].login;
                    $.getJSON(url, function(result) {
                        console.log(result);

                        $.each(result, function(i, field) {

                            var id = field.id;
                            var nome = field.nome;
                            var username = field.login;
                            var email = field.email;
                            var telefone = field.telefone;
                            var categoria = field.categoria;
                            var idioma = field.idioma;
                            var estado = field.estado;
                            var cidade = field.cidade;

                            $("#id-edit").val(id);
                            $("#nome-edit").val(nome);
                            $("#username-edit").val(username);
                            $("#email-edit").val(email);
                            $("#telefone-edit").val(telefone);
                            $("#categoria-edit").val(categoria);
                            $("#idioma-edit").val(idioma);
                            $("#estado-edit").val(estado);
                            $("#cidade-edit").val(cidade);
                        });
                    });

                    $.mobile.changePage("#edit-page");
                }
            }
        });

    } else {

        $('#popUpFaltaDadosLogin').popup('open');

    }

});


$("#insert").click(function() {

    var nome = removerAcentos($("#nome").val());
    var username = $("#username").val();
    var senha = $("#senha").val();
    var categoria = $("#categoria").val();
    var idioma = $("#idioma").val();
    var email = $("#email").val();
    var telefone = $("#telefone").val();
    var pais = $("#pais").val();
    var estado = removerAcentos($("#estado").val());
    var cidade = removerAcentos($("#cidade").val());
    var dataString = "nome=" + nome + "&username=" + username + "&senha=" + senha + "&idioma=" + idioma + "&email=" + email + "&telefone=" + telefone + "&pais=" + pais + "&cidade=" + cidade + "&estado=" + estado + "&insert=";
    /* alert(nome);
				alert(username);
				alert(senha);
				alert(categoria);
				alert(idioma);
				alert(pais);
				alert(email);
				alert(telefone);
				alert(estado);
				alert(cidade); */

    if ($.trim(nome).length >= 0 & $.trim(username).length >= 0 & $.trim(senha).length >= 0 & categoria > 0 & $.trim(idioma).length > 0 & $.trim(pais).length > 0 & $.trim(email).length > 0 & $.trim(telefone).length > 0 & $.trim(estado).length > 0 & $.trim(cidade).length > 0) {

        if ($.trim(username).length >= 6) {

            if ($.trim(senha).length >= 6) {

                $.ajax({
                    url: "http://neolist.com.br/appweb/getExistenciaLogin.php?username=" + username + "",
                    dataType: "json",
                    success: function(data) {
                        //alert(data[0].login);
                        if (data[0].login == null) {


                            $.ajax({
                                type: "POST",
                                //url: "http://phonegappro.esy.es/test/insert.php",
                                url: "http://neolist.com.br/appweb/insertUsuariosNeoList.php",
                                data: dataString,
                                crossDomain: true,
                                cache: false,
                                beforeSend: function() {
                                    $("#insert").val('Connecting...');
                                },
                                success: function(data) {
                                    $('#popUpCadastroSucesso').popup('open');
                                    $.mobile.changePage("#home-page");
                                }
                            });

                        } else {
                            $('#popUpLoginUtilizado').popup('open');

                        }
                    }
                });

            } else {

                $('#popUpValorMinimoCampoSenha').popup('open');
            }

        } else {

            $('#popUpValorMinimoCampoLogin').popup('open');
        }

    } else {

        $('#popUpCamposVazios').popup('open');
    }
    return false;
});

$("#update-btn").click(function() {

    var id = $("#id-edit").val();
    var nome = $("#nome-edit").val();
    var categoria = $("#categoria-edit").val();
    var idioma = $("#idioma-edit").val();
    var email = $("#email-edit").val();
    var telefone = $("#telefone-edit").val();
    var pais = $("#pais-edit").val();
    var estado = $("#estado-edit").val();
    var cidade = $("#cidade-edit").val();

    var dataString = "nome-edit=" + nome + "&categoria-edit=" + categoria + "&idioma-edit=" + idioma + "&email-edit=" + email + "&telefone-edit=" + telefone + "&pais-edit=" + pais + "&cidade-edit=" + cidade + "&estado-edit=" + estado + "id-edit=" + id + "&update=";

    /*alert(id);
    alert(nome);
    alert(categoria);
    alert(idioma);
    alert(pais);
    alert(email);
    alert(telefone);
    alert(estado);
    alert(cidade); */

    if ($.trim(nome).length >= 0 & categoria > 0 & $.trim(idioma).length > 0 & $.trim(pais).length > 0 & $.trim(email).length > 0 & $.trim(telefone).length > 0 &
        $.trim(estado).length > 0 & $.trim(cidade).length > 0) {

        $.ajax({
            type: "POST",
            //url: "http://phonegappro.esy.es/test/insert.php",
            url: "http://neolist.com.br/appweb/updateUsuariosNeoList.php",
            data: dataString,
            crossDomain: true,
            cache: false,
            beforeSend: function() {
                $("#insert").val('Connecting...');
            },
            success: function(data) {
                $.mobile.changePage("#home-page");
            }
        });

    } else {

        $('#popUpCamposVaziosUpdate').popup('open');
    }
    return false;
});