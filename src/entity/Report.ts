import { Game } from '../controllers/LogParser';
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
    const playerScores: { [key: string]: number } = {};

    this.game.forEach((kill) => {
      if (kill.killer !== '<world>') return (playerScores[kill.killer] = (playerScores[kill.killer] || 0) + 1); // add to player's kills if killer is not <world>
      if (kill.killer === '<world>') return (playerScores[kill.victim] = (playerScores[kill.victim] || 0) - 1); // subtract from player's kills if killer is <world>
    });

    return Object.entries(playerScores).sort((a, b) => b[1] - a[1]);
  }
}
