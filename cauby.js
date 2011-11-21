/// <reference path="jquery-1.5.1.min.js" />

var Cauby = {};
Cauby.start = function (containerSelector, defaultHash)
{
    var lastHash = null;

    // essa funcao verifica se houve alteracao na localizacao
    // vejo se o browser dah suporte a hashchange, senao, faco aa moda antiga (pooling 200ms)
    function checkHashChanged()
    {
        // se mudou o hash, refresco o conteudo
        var hash = window.location.hash.replace('#', '');
        if (!hash || hash == '/')
            hash = defaultHash ? defaultHash.replace('#', '') : "";
        if (hash != lastHash)
        {
            lastHash = hash;
            if (hash)
                $(containerSelector).load((window.location.pathname + '/' + hash).replace('///', '/').replace('//', '/'));
            else
                $(containerSelector).html("<br/>");
        }
    }
    if ("onhashchange" in window)
        $(window).bind("hashchange", checkHashChanged);
    else
        window.setInterval(checkHashChanged, 200);

    // estou iniciando o Cauby, devo ir para a pagina default
    // se tem "#" na url, eh pq o cara jah esta numa pagina especifica, nao vou levar ele de volta pro root
    if (!window.location.hash)
        window.location = "#/";

    // preciso fazer ao menos uma verificacao inicial (nao confio 100% no "hashchange")
    $(document).ready(checkHashChanged);
};
