var socket = io();
var label = $('#lblNuevoTicket')
    //on => Escuchar
    //emit => Emitir 
socket.on('connect', function() {
    console.log('Conectado al servidor');
    socket.on('estadoActual', function(resp) {
        label.text(resp.mensaje);
    });
});
socket.on('disconnect', function() {
    console.log('Perdimos conección con el servidor');
});
$('button').on('click', function() {
    socket.emit('siguienteTicket', null, function(resp) {
        label.text(resp.mensaje);
    });
});