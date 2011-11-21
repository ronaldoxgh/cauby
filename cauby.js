/// <reference path="jquery-1.5.1.min.js" />

var Cauby = {};
Cauby.start = function (container, defHash)
{
    var lastHash = null;

    // essa funcao verifica se houve alteracao na localizacao
    // vejo se o browser dah suporte a hashchange, senao, faco aa moda antiga (pooling 200ms)
    function checkHashChanged()
    {
        // se mudou o hash, refresco o conteudo
        var path = window.location.toString(), hash;
        var i = path.indexOf('#');
        if (i != -1)
        {
            hash = path.substr(i + 1);
            path = path.substr(0, i);
            if (path && path[path.length - 1] == '/')
                path = path.substr(0, path.length - 1);
        }
        else
            hash = '';
        if (!hash || hash == '/')
            hash = defHash ? defHash.replace('#', '') : '';
        if (hash && hash[0] != '/')
            hash = '/' + hash;
        if (hash != lastHash)
        {
            lastHash = hash;
            if (hash)
                $(container).load(path + hash);
            else
                $(container).html('<br/>');
        }
    }

    if ('onhashchange' in window)
        $(window).bind('hashchange', checkHashChanged);
    else
        window.setInterval(checkHashChanged, 200);

    // estou iniciando o Cauby, devo ir para a pagina default
    // se tem '#' na url, eh pq o cara jah esta numa pagina especifica, nao vou levar ele de volta pro root
    if (!window.location.hash)
        window.location = '#/';

    // preciso fazer ao menos uma verificacao inicial (nao confio 100% no 'hashchange')
    $(document).ready(checkHashChanged);
};
