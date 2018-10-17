const fs = require('fs');
class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}
class TicketControl {
    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimosN = [];
        let data = require('../data/data.json');
        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimosN = data.ultimosN || [];
        } else {
            this.reiniciarConteo();
        }
    }
    siguiente() {
        this.ultimo++;
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);
        this.guardarJSON();
        return this.getUltimoTicket();
    }
    getUltimoTicket() {
        return {
            mensaje: `Ticket ${this.ultimo}`,
            ultimo: this.ultimo
        }
    }
    getUltimosN() {
        return this.ultimosN;
    }
    atenderTicket(escritorio) {
        if (this.tickets.length === 0) {
            return 'No hay mas tickets';
        }
        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift();
        let ticketAtender = new Ticket(numeroTicket, escritorio);
        this.ultimosN.unshift(ticketAtender);
        if (this.ultimosN.length > 4) {
            this.ultimosN.splice(-1, 1); //atiende el ultimo
        }
        this.guardarJSON();
        return ticketAtender;
    }
    reiniciarConteo() {
        this.ultimo = 0;
        this.tickets = []
        console.log('Se ha inicializado un nuevo dia');
        this.guardarJSON();
    }
    guardarJSON() {
        let JSONdata = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimosN: this.ultimosN
        };
        fs.writeFileSync('./server/data/data.json', JSON.stringify(JSONdata));
    }
}
module.exports = {
    TicketControl
}