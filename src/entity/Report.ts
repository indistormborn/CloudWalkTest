import { Game } from '../GameLogParser';
import { IReport } from '../model/IReport';

export class Report implements IReport {
  private readonly game: Game;
  readonly totalKills: number;
  readonly players: string[];
  readonly rank: [string, number][];

  constructor(game: Game) {
    this.game = game;
    this.totalKills = this.game.length;
    this.players = this.getPlayers();
    this.rank = this.getPlayersRank();
  }

  toJSON(): IReport {
    return {
      totalKills: this.totalKills,
      players: this.players,
      rank: this.rank,
    };
  }

  toPlainText(): string {
    return `
    Total kills: ${this.totalKills}
    Players: ${this.players.map((player) => `\n    - ${player}`).join('')}
    Rank: ${this.rank.map(([player, kills]) => `\n    - ${player}: ${kills} kills`).join('')}`;
  }

  private getPlayers(): string[] {
    const playersSet = new Set(this.game.map((kill) => [kill.killer, kill.victim]).flat());
    playersSet.delete('<world>');
    return Array.from(playersSet);
  }

  private getPlayersRank(): [string, number][] {
    return Object.entries(this.players.reduce((acc: { [key: string]: number }, player: string) => {
      const playerTotalKills = this.game.filter((kill) => kill.killer === player);
      const playerWorldDeaths = this.game.filter((kill) => kill.victim === player && kill.killer === '<world>');

      acc[player] = playerTotalKills.length - playerWorldDeaths.length;
      return acc;
    }, {})).sort((a, b) => b[1] - a[1]);
  }
}
