import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TicketService} from "./ticket.service";
import {Ticket} from "../../model/ticket";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SwimmingLane} from "../../model/swimming-lane";
import {transferArrayItem} from "@angular/cdk/drag-drop";
import {KeyValue} from "@angular/common";


@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  @Input() ticket!: Ticket;
  @Output() ticketCreated: EventEmitter<boolean> = new EventEmitter();

  form!: FormGroup;
  DESCRIPTION_FORM_CONTROL_NAME = 'descriptionFormControlName';
  DROP_DOWN = 'dropDown';
  options: any[] = [];

  constructor(public ticketService: TicketService) {}

  /**
   * Using the pattern validator to prevent unwanted characters into the description.
   */
  ngOnInit(): void {
    this.form = new FormGroup({
      [this.DESCRIPTION_FORM_CONTROL_NAME]: new FormControl(
        this.ticket?.description ?
          this.ticket.description :
          '', [
        Validators.required,
        Validators.pattern('[A-Za-z0-9 .,]*')]
      ),
      [this.DROP_DOWN]: new FormControl(
        ''
      )
    });

    /**
     * The ticket description is currently not editable after its creation per current requirements.
     */
    if (this.ticket?.description) {
      this.form.get(this.DESCRIPTION_FORM_CONTROL_NAME)?.disable();
    }

    let filterResult = [];

    this.ticketService.getApiItems().subscribe(res => {
      filterResult = res.results.map((item: any) => {
        let fullName = item.name.title + ' ' + item.name.first + ' ' + item.name.last;
        return {value: fullName.toLocaleUpperCase(), key: fullName, gender: item.gender}
      });
      this.options = filterResult.filter((person: any) => {
        return person.gender === 'male';
      });
    });
  }

  onCreateTicket() {
    if (this.form.valid) {
      const newTicket = new Ticket(
        this.form.get(this.DESCRIPTION_FORM_CONTROL_NAME)?.value,
        'John Doe' // todo add in functionality for created by. Currently out of scope of this challenge.
      );
      this.ticketService.createNewTicket(newTicket);
      this.ticketService.getTicketList(SwimmingLane.BACKLOG).value.push(newTicket);
      this.ticketCreated.emit(true);
    } else {
      this.form.markAllAsTouched();
    }
  }

  moveTicketRight() {
    if (this.ticket.assignedSwimmingLane === SwimmingLane.BACKLOG) {
      this.moveTicket(
        this.ticketService.getTicketList(SwimmingLane.BACKLOG),
        this.ticketService.getTicketList(SwimmingLane.IN_PROGRESS)
      );
    } else if (this.ticket.assignedSwimmingLane === SwimmingLane.IN_PROGRESS) {
      this.moveTicket(
        this.ticketService.getTicketList(SwimmingLane.IN_PROGRESS),
        this.ticketService.getTicketList(SwimmingLane.COMPLETE)
      );
    }
  }

  moveTicketLeft() {
    if (this.ticket.assignedSwimmingLane === SwimmingLane.IN_PROGRESS) {
      this.moveTicket(
        this.ticketService.getTicketList(SwimmingLane.IN_PROGRESS),
        this.ticketService.getTicketList(SwimmingLane.BACKLOG)
      );
    } else if (this.ticket.assignedSwimmingLane === SwimmingLane.COMPLETE) {
      this.moveTicket(
        this.ticketService.getTicketList(SwimmingLane.COMPLETE),
        this.ticketService.getTicketList(SwimmingLane.IN_PROGRESS)
      );
    }
  }

  private moveTicket(
    currentTicketList: KeyValue<SwimmingLane, Ticket[]>,
    targetTicketList: KeyValue<SwimmingLane, Ticket[]>
  ) {
    const indexOfCurrentTicket = this.getTicketsCurrentIndex(this.ticket);
    const targetIndex = this.ticketService.getTicketList(this.ticket.assignedSwimmingLane).value.length + 1;
    transferArrayItem(
      currentTicketList.value,
      targetTicketList.value,
      indexOfCurrentTicket,
      targetIndex
    )
    this.ticketService.saveTicketsPosition();
  }

  private getTicketsCurrentIndex(ticket: Ticket) {
    return this.ticketService.getTicketList(ticket.assignedSwimmingLane).value
      .map(ticket => ticket.id).indexOf(ticket.id);
  }

  isLeftArrowUsable() {
    return this.ticket && this.ticket.assignedSwimmingLane !== SwimmingLane.BACKLOG;
  }

  isRightArrowUsable() {
    return this.ticket && this.ticket.assignedSwimmingLane !== SwimmingLane.COMPLETE;
  }

  selectTicket() {
    this.ticketService.deselectAllTickets();
    if (this.ticket) {
      this.ticket.selected = true;
    }
  }
}
