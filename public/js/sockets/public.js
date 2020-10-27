let socket = io()

function paint(lastFour){
    let audio = new Audio('audio/new-ticket.mp3')
    audio.play()
    let cont = 1
    lastFour.forEach(element => {
        $(`#lblTicket${cont}`).text(`Ticket ${element.number}`)
        $(`#lblDesktop${cont}`).text(`Desktop ${element.desktop}`)
        cont++
    });
}


socket.on('connect', () => {
    console.log('Connected to server')
})

socket.on('disconnect', () => {
    console.log('Disconnected from server')
})

socket.emit('getLastFour', (lastFour) => {
    paint(lastFour)
} )

socket.on('getLastFour', (lastFour) => {
    paint(lastFour)
})