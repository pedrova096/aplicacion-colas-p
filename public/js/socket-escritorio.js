var socket = io();
var label = $('small');
var searchParams = new URLSearchParams(window.location.search);
var escritorio = searchParams.get('escritorio');
socket.on('connect', function() {
    console.log('Conectado al servidor');
    if (!searchParams.has('escritorio')) {
        window.location = 'index.html';
        throw new Error('El escritorio es necesario');
    }
    $('h1').text('Escritorio ' + escritorio);
});
socket.on('disconnect', function() {
    console.log('Perdimos conección con el servidor');
});
$('button').on('click', function() {
    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {
        if (resp.numero) {
            label.text(resp.numero);
        } else {
            alert(resp);
        }
    });
});