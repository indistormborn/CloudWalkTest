import { Game } from '../controllers/LogParser';
import { IReport } from '../model/IReport';

export class Report implements IReport {
  private readonly game: Game;
  private plainTextReport?: string;
  readonly totalKills: number;
  readonly players: string[];
  readonly rank: [string, number][];
  readonly deathCauses: { [key: string]: number };

  constructor(game: Game) {
    this.game = game;
    this.totalKills = this.game.length;
    this.players = this.getPlayers();
    this.rank = this.getPlayersRank();
    this.deathCauses = this.getDeathCausesCount();
  }

  toJSON(): IReport {
    return {
      totalKills: this.totalKills,
      players: this.players,
      rank: this.rank,
      deathCauses: this.deathCauses,
    };
  }

  toPlainText(): string {
    if (!this.plainTextReport) {
      this.plainTextReport = `
    Total kills: ${this.totalKills}
    Players: ${this.players.map((player) => `\n    - ${player}`).join('')}
    Rank: ${this.rank.map(([player, kills]) => `\n    - ${player}: ${kills} kills`).join('')}
    Death causes: ${Object.entries(this.deathCauses)
      .map(([cause, deaths]) => `\n    - ${cause}: ${deaths} times`)
      .join('')}`;
    }

    return this.plainTextReport;
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

  private getDeathCausesCount(): { [key: string]: number } {
    const deathCauses: { [key: string]: number } = {};
    this.game.forEach((kill) => {
      return (deathCauses[kill.reason] = (deathCauses[kill.reason] || 0) + 1);
    });
    return deathCauses;
  }
}
