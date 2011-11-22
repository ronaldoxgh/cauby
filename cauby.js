/// <reference path="jquery-1.5.1.min.js" />

var Cauby = {};
Cauby.start = function (container, defHash)
{
    var lastUrl = null;

    // essa funcao verifica se houve alteracao na localizacao
    // se mudou o hash, refresco o conteudo
    function checkHashChanged()
    {
        // da url, eu separo (path ? query # hash)
        // alternativamente, pode vir assim (path # hash ? query)
        // hash vazio ou raiz eu redireciono para o default (sem #)
        var path = window.location.toString();
        var h = path.split('#');
        var hash = h[1], q = h[0].split('?');
        var path = q[0], query = q[1];
        if (hash && !query && (q = hash.split('?')).length > 1)
        {
            hash = q[0];
            query = q[1];
        }
        if (!hash || hash == '/')
            hash = defHash ? defHash.replace('#', '') : '';
        var url = (path + '#' + hash).replace('/#/', '/').replace('/#', '/').replace('#/', '/').replace('#', '/') + (query ? '?' + query : '');
        if (url != lastUrl)
        {
            lastUrl = url;
            // s houver um hash, carrego o partial desse hash dentro do container
            if (hash)
                $(container).load(url);
            else
                $(container).html('');
        }
    }

    // vejo se o browser dah suporte a hashchange, senao, faco aa moda antiga (pooling 200ms)
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
