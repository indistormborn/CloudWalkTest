export interface IReport {
  totalKills: number;
  players: string[];
  rank: [string, number][];
  deathCauses: { [key: string]: number };
}
