import {Component, OnInit} from '@angular/core';
import {TicketService} from "./swimming-lanes/ticket/ticket.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'kanban-challenge-ui';

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    /*
     * All tickets are fetched with this method upon the applications initial loading.
     */
    this.ticketService.getAllTickets();
  }
}
