var socket = io();
var lblTickets = [$('#lblTicket1'), $('#lblTicket2'), $('#lblTicket3'), $('#lblTicket4')];
var lblEscritorios = [$('#lblEscritorio1'), $('#lblEscritorio2'), $('#lblEscritorio3'), $('#lblEscritorio4')];
socket.on('connect', function() {
    console.log('Conectado al servidor');
});
socket.on('disconnect', function() {
    console.log('Perdimos conección con el servidor');
});
socket.on('estadoActual', function(resp) {
    console.log(resp);
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    actualizaHTML(resp.ultimosN);
});

function actualizaHTML(ultimosN) {
    for (var i = 0; i < ultimosN.length; i++) {
        lblTickets[i].text('Ticket ' + ultimosN[i].numero);
        lblEscritorios[i].text('Escritorio ' + ultimosN[i].escritorio);
    }
}