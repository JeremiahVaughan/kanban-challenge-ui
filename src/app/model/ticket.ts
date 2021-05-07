import {SwimmingLane} from "./swimming-lane";

export class Ticket {
  /**
   * @private server assigns the id
   */
  id!: string;

  readonly description: string;
  readonly createdBy: string;
  selected: boolean = false;

  /**
   * server assigns the createdDate
   */
  createdDate!: string;

  /**
   * server assigns the assignedSwimmingLane
   */
  assignedSwimmingLane!: SwimmingLane;

  constructor(description: string, assignedTo: string) {
    this.description = description;
    this.createdBy = assignedTo;
  }
}
