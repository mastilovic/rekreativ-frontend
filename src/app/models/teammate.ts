import {Team} from "./team";

export interface Teammate {
  id?: number;
  name: string;
  totalGamesPlayed?: number;
  wins?: number;
  winRate?: number;
  team?: Team[];
}
