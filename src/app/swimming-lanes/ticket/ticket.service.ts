import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Ticket} from "../../model/ticket";
import {environment} from "../../../environments/environment";
import {SwimmingLane} from "../../model/swimming-lane";
import {KeyValue} from "@angular/common";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  /**
   * Url is read from the properties file. This file is swapped out with the production config file when deployed.
   * This can be further configured in the angular.json file.
   * @private
   */
  private url = environment.baseUrl + '/api/kanban';
  ticketLists: Map<SwimmingLane, Ticket[]> = new Map();
  isCreatingTicket = false;

  private testUrl = 'https://randomuser.me/api/?results=25';

  constructor(private httpClient: HttpClient) {
  }

  getAllTickets() {
    this.httpClient.get<Ticket[]>(this.url).subscribe(res => {
      this.initializeTickets(res);
    }, error => {
      console.error('Get all Tickets called failed due to: ', error);
    });
  }

  getApiItems(): Observable<any> {
    return this.httpClient.get<any>(this.testUrl);
  }

  /**
   * Creating a new ticket also retrieves the state again from the server for the rest
   * of the tickets. This can be improved for performance sake, but does increase the
   * complexity of the application to ensure both client and server states state in sync.
   * @param ticket
   */
  createNewTicket(ticket: Ticket) {
    this.httpClient.put<Ticket[]>(this.url, ticket).subscribe(res => {
      this.initializeTickets(res);
    });
  }

  /**
   * Unlike create new ticket, save tickets position does maintain a separate client and server state.
   * This increases performance as less information needs to be sent over the wire and processes in
   * both applications, but it does posses a risk of client / server de-syncing should a network call fail.
   */
  saveTicketsPosition() {
    this.ticketLists = this.syncTicketsToAssignedSwimmingLane(this.ticketLists);
    let consolidatedTickets: Ticket[] = [];
    this.ticketLists.forEach(ticketList => {
      consolidatedTickets = consolidatedTickets.concat(ticketList);
    });
    this.httpClient.post<boolean>(this.url, consolidatedTickets).subscribe(res => {
      if (!res) {
        alert("Connection with server failed, unable to save ticket ordering and swimming lane");
      }
    });
  }

  getTicketList(swimmingLane: SwimmingLane): KeyValue<SwimmingLane, Ticket[]> {
    const tickets = this.ticketLists.get(swimmingLane);
    return {key: swimmingLane, value: tickets ? tickets : []};
  }

  /**
   * Tickets are stored in map form for easy accessibly via the SwimmingLane enum.
   * The server sends these tickets an an array though, so this transformation is needed.
   * @param swimmingLane
   */
  private initializeTickets(res: Ticket[]) {
    const backlogTickets = res.filter(ticket => {
      return ticket.assignedSwimmingLane === SwimmingLane.BACKLOG;
    });
    this.ticketLists.set(SwimmingLane.BACKLOG, backlogTickets);

    const inProgressTickets = res.filter(ticket => {
      return ticket.assignedSwimmingLane === SwimmingLane.IN_PROGRESS;
    });
    this.ticketLists.set(SwimmingLane.IN_PROGRESS, inProgressTickets);

    const completedTickets = res.filter(ticket => {
      return ticket.assignedSwimmingLane === SwimmingLane.COMPLETE;
    });
    this.ticketLists.set(SwimmingLane.COMPLETE, completedTickets);
  }

  /**
   * @param ticketLists is to be modified so all tickets are assigned the swimming lane
   * that they are currently under. This is a necessary step because the two methods (drag/drop or arrow click)
   * of moving tickets into different swimming lanes accounts for application state, but not persistence state.
   * @private
   */
  private syncTicketsToAssignedSwimmingLane(ticketLists: Map<SwimmingLane, Ticket[]>) {
    const result: Map<SwimmingLane, Ticket[]> = new Map();
    ticketLists.forEach((tickets, swimmingLane) => {
      const resultTickets = tickets.map(ticket => {
        ticket.assignedSwimmingLane = swimmingLane;
        return ticket;
      });
      result.set(swimmingLane, resultTickets);
    });
    return result;
  }

  deselectAllTickets() {
    this.ticketLists.forEach((swimmingLane, key) => {
      swimmingLane.forEach(ticket => {
        ticket.selected = false;
      });
    });
  }
}
