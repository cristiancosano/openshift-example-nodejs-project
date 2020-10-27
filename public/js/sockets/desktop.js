let socket = io()
let searchParams = new URLSearchParams(window.location.search)
let user = $('#number')

function serveTicket(){
    socket.emit('serveTicket', searchParams.get('desktop'), (number)=>{
        if(number == `Doesn't have tickets`){
            alert(number)
            return
        }
        else user.text('Ticket: '+number)
    })
}

socket.on('connect', () => {
    console.log('Connected to server')
})

socket.on('disconnect', () => {
    console.log('Disconnected from server')
})

if(searchParams.has('desktop')){
    serveTicket()
    $('button').click( () => {
        serveTicket()
    })
    $('#title').text(`Desktop ${searchParams.get('desktop')}`)
}