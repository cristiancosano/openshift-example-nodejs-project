const {io} = require('../server')
const {TicketControl} = require('../classes/ticket-control')

const ticketControl = new TicketControl() 

io.on('connection', (client) => {
    console.log('User connected');

    client.on('nextTicket', (callback) => {
        callback(ticketControl.nextTicket())

        client.broadcast.emit('currentStatus', {
            ticket: ticketControl.getLastTicket(),
        })

    })

    client.emit('currentStatus', {
        ticket: ticketControl.getLastTicket(),
    })

    client.on('serveTicket', (desktop, callback) => {
        callback(ticketControl.serveTicket(desktop))
        client.broadcast.emit('getLastFour', ticketControl.getLastFour())
    })

    client.on('getLastFour', (callback) => {
        callback(ticketControl.getLastFour())
    })
})