import {Component, OnInit} from '@angular/core';
import {TicketService} from "./ticket/ticket.service";
import {SwimmingLaneDefinition} from "../model/swimming-lane-definition";
import {SwimmingLane} from "../model/swimming-lane";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {Ticket} from "../model/ticket";
import {SWIMMING_LANE_CONSTANTS} from "../constants/swimming-lane-definitions";

@Component({
  selector: 'app-swimming-lanes',
  templateUrl: './swimming-lanes.component.html',
  styleUrls: ['./swimming-lanes.component.scss']
})
export class SwimmingLanesComponent {

  swimmingLaneDefinitions = SWIMMING_LANE_CONSTANTS;

  constructor(public ticketService: TicketService) { }

  getTickets(swimmingLane: SwimmingLane) {
    return this.ticketService.getTicketList(swimmingLane);
  }

  /**
   * Upon clicking the add card button, the ticket mode isCreatedTicket will be activated
   * This allows the new ticket component to know when to show or hide itself.
   */
  onAddCard() {
    this.ticketService.isCreatingTicket = true;
  }

  /**
   * This is triggered by the ticket component after the user presses the done button.
   */
  onTicketCreated() {
    this.ticketService.isCreatingTicket = false;
  }

  isBacklogSwimmingLane(swimmingLaneDefinition: SwimmingLaneDefinition) {
    return swimmingLaneDefinition.id === SwimmingLane.BACKLOG;
  }

  /**
   * This method is triggered when the user moves tickets via drag and drop.
   * Can be used for recording or moving tickets into a different status.
   * @param $event
   */
  drop($event: CdkDragDrop<Ticket[], any>) {
    if ($event.previousContainer === $event.container) {
      moveItemInArray(
        $event.container.data,
        $event.previousIndex,
        $event.currentIndex
      );
    } else {
      transferArrayItem(
        $event.previousContainer.data,
        $event.container.data,
        $event.previousIndex,
        $event.currentIndex
      )
    }
    this.ticketService.saveTicketsPosition();
  }
}
