const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');
const ticketControl = new TicketControl();
//on => Escuchar
//emit => Emitir
let getEstadoTicktes = () => {
    let estadoAct = ticketControl.getUltimoTicket();
    estadoAct = Object.assign(estadoAct, { ultimosN: ticketControl.getUltimosN() });
    return estadoAct;
}
io.on('connection', (client) => {
    client.emit('estadoActual', getEstadoTicktes());
    client.on('siguienteTicket', (data, callback) => {
        let resp = ticketControl.siguiente();
        console.log({ resp });
        callback(resp);
    });
    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            });
        }
        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        client.broadcast.emit('estadoActual', getEstadoTicktes());
        callback(atenderTicket);
    });
});