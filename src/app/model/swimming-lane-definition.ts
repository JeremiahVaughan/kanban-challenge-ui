import {SwimmingLane} from "./swimming-lane";

export class SwimmingLaneDefinition {
  /**
  * Id is used to uniquely identify a particular swimming lane. This value will never change
   * which gives us the liberty to change other variables as needed.
  */
  id!: SwimmingLane;
  title!: string;
  swimmingLanesConnectedTo!: SwimmingLane[];

  /**
   * Color that individual cards will be contrasted against
   */
  backdropColor!: string;

  constructor(id: SwimmingLane, title: string, backdropColor: string, swimmingLanesConnectedTo: SwimmingLane[]) {
    this.id = id;
    this.title = title;
    this.backdropColor = backdropColor;
    this.swimmingLanesConnectedTo = swimmingLanesConnectedTo;
  }
}
