import dataTickets from "../assets/tickets.json"
import { ITicket } from "../types"

export default async function getTickets() {
    return new Promise<ITicket[]>((resolve)=>{
        setTimeout(()=>{
            resolve(dataTickets.tickets)
        }, 1000)
    })
}