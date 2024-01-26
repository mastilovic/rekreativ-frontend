import {Teammate} from "./teammate";

export interface Team {
  id: number;
  teamName: string;
  teammates: Teammate[];
  city: string;
  wins: number;
  totalGamesPlayer: number;
}
