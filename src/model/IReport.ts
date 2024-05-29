export interface IReport {
  totalKills: number;
  players: string[];
  kills: {
    [key: string]: number;
  };
  rank: [string, number][];
}
