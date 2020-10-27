let socket = io()
let label = $('#lblNewTicket')


socket.on('connect', () => {
    console.log('Connected to server')
})

socket.on('currentStatus', (currentStatus) => {
    label.text(currentStatus.ticket)
})

socket.on('disconnect', () => {
    console.log('Disconnected from server')
})

$('button').click(() => {
    socket.emit('nextTicket', (ticket) => {
        label.text(ticket)
    })
})