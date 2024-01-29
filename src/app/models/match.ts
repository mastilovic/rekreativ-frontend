import {Team} from "./team";

export interface Match {
  id?: number;
  teamA: Team;
  teamB: Team;
  teamAScore?: number;
  teamBScore?: number;
  winner?: string;
}
