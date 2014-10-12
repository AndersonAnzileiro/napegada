﻿///<reference path="http://code.jquery.com/jquery-1.9.1.js" />

$(function () {
    $('#frm-usuario-perfil-dados .form-control').attr('disabled', 'disabled');
    $('#frm-usuario-perfil-conta .form-control').attr('disabled', 'disabled');

    $('#btn-modal-entrar').on('click', function () {
        f.resetar(['.msg', '.load', '.form-control'], true);
    });

    $('#btn-modal-registrar').on('click', function () {
        f.resetar(['.msg', '.load', '.form-control'], true);
    });

    $('#btn-entrar').on('click', function () {
        if (!f.patternEmail($('#u-email').val())) {
            $('.msg').html(f.alerta('alert alert-warning alert-dismissible', 'Ops! Digite um email válido. Ex: fulano.tal@mail.com'));
            return false;
        }
        if ($('#u-senha').val() == '') {
            $('.msg').html(f.alerta('alert alert-warning alert-dismissible', 'Ops! Digite sua senha.'));
            return false;
        }
        var retornoJson = undefined;
        $.ajax({
            url: '/Usuario/Entrar',
            type: 'post',
            data: $('#frm-usuario-entrar').serialize(),
            beforeSend: f.exibirLoad('.load', true),
            success: function (r) {
                retornoJson = r.url;
            },
            complete: function () {
                f.exibirLoad('.load', false)
                if (retornoJson == '/Site/Home') {
                    $('.msg').html(f.alerta('alert alert-warning alert-dismissible', 'Ops! Usuario ou senha são inválidos.'));
                } else {
                    f.redirecionar(retornoJson);
                }
            }
        });
    });

    $('#btn-registrar').click(function () {
        if ($(this).valid()) {
            $('#btn-registrar').attr('disabled', 'disabled');
            $('#btn-registrar').text('Entrando...');
            var dados = $('#frm-usuario-registrar').serialize();
            $.ajax({
                url: '/Usuario/Registrar',
                type: 'post',
                data: dados,
                beforeSend: f.exibirLoad('.load', true),
                complete: function () {
                    f.postar('/Usuario/Entrar', data_ = dados, function (r) {
                        f.exibirLoad('.load', false);
                        f.redirecionar(r.url);
                    });
                }
            });
        }
    });

    $('#btn-sair').on('click', function () {
        f.obter('/Usuario/Sair', undefined, function (r) { f.redirecionar(r.url) });
    });
});

//funções
var f = {
    'ajax': function (url_, type_, data_, beforeSend_, success_, complete_, error_) {
        $.ajax({
            url: url_,
            type: type_,
            data: data_,
            beforeSend: beforeSend_,
            success: success_,
            complete: complete_,
            error: error_
        });
    },
    'postar': function (url_, data_, callback_, type_) {
        $.post(url_, data_, callback_, type_);
    },
    'obter': function (url_, data_, callback_) {
        $.getJSON(url_, data_, callback_);
    },
    'redirecionar': function (url_) {
        return window.location.href = url_;
    },
    'exibirLoad': function (elemento, mostrar) {
        if (mostrar) {
            $(elemento).html('<img src="/Content/images/load-100x9.gif" />');
        } else {
            $(elemento).html('');
        }
    },
    'alerta': function (tipo, msg) {
        return '<div class="' + tipo + '" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Fechar</span></button><strong></strong>' + msg + '</div>';
    },
    'resetar': function (elementos, resetar) {
        if (resetar) {
            $.each(elementos, function (k, v) {
                $(v).html('');
                $(v).val('');
            });
        }
    },
    'patternEmail': function (dados) {
        var pattern = new RegExp(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/);
        return pattern.test(dados);
    }
};