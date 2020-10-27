const fs = require('fs')
const Ticket = require('./ticket')

class TicketControl{
    

    constructor(){
        this.lastNumber
        this.currentDate
        this.tickets = []
        this.lastFour = []
        this.loadData()
    }

    getLastTicket(){
        this.loadData()
        return `Ticket: ${this.lastNumber}`
    }

    getLastFour(){
        return this.lastFour
    }


    serveTicket(desktop){
        this.loadData()
        if(this.tickets.length == 0){
            return `Doesn't have tickets`
        }
        else{
             let number = this.tickets[0].number
             this.tickets.shift()
             let ticket = new Ticket(number, desktop)
             this.lastFour.unshift(ticket)
             if(this.lastFour.length > 4){
                 this.lastFour.splice(-1,1) // Delete last element from array
             }
             this.saveFile()
             return number

        }
    }

    nextTicket(){
        this.loadData()
        this.lastNumber += 1
        let ticket = new Ticket(this.lastNumber, null)
        this.tickets.push(ticket)
        this.saveFile()
        return `Ticket: ${this.lastNumber}`
    }

   

    saveFile(){
        let json = {
            lastNumber: this.lastNumber,
            currentDate: this.currentDate,
            tickets: this.tickets,
            lastFour: this.lastFour
        }
        fs.writeFileSync('./server/data/data.json', JSON.stringify(json))
    }

    loadData(){
        let data = JSON.parse(fs.readFileSync('./server/data/data.json', 'utf8'))
        let currentDate = new Date().getDate()

        if(data.currentDate == currentDate){
            this.lastNumber = data.lastNumber 
            this.currentDate = data.currentDate
            this.tickets = data.tickets || []
            this.lastFour = data.lastFour || []
        }
        else this.resetCounter()
    }
    resetCounter(){
        this.lastNumber = 0
        this.currentDate = new Date().getDate()
        this.tickets = []
        this.lastFour = []
        this.saveFile()
    }

}

module.exports = {
    TicketControl
}