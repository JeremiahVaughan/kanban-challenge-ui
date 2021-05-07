import {SwimmingLaneDefinition} from "../model/swimming-lane-definition";
import {SwimmingLane} from "../model/swimming-lane";

/**
 * Definitions used in tandem with looping are a good way to promote code reuse in angular projects.
 */
export const SWIMMING_LANE_CONSTANTS = [
  new SwimmingLaneDefinition(
    SwimmingLane.BACKLOG,
    'Backlog',
    '#adadad',
    [SwimmingLane.IN_PROGRESS, SwimmingLane.COMPLETE]
  ),
  new SwimmingLaneDefinition(
    SwimmingLane.IN_PROGRESS,
    'In Progress',
    '#0066ff',
    [SwimmingLane.BACKLOG, SwimmingLane.COMPLETE]
  ),
  new SwimmingLaneDefinition(
    SwimmingLane.COMPLETE,
    'Complete',
    '#037b24',
    [SwimmingLane.BACKLOG, SwimmingLane.IN_PROGRESS]
  )
]
