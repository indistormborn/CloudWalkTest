import { Game } from '../GameLogParser';
import { IReport } from '../model/IReport';

export class Report implements IReport {
  private readonly game: Game;
  readonly totalKills: number;
  readonly players: string[];
  readonly kills: { [key: string]: number };

  constructor(game: Game) {
    this.game = game;
    this.totalKills = this.game.length;
    this.players = this.getPlayers();
    this.kills = this.getPlayerKills();
  }

  toJSON(): IReport {
    return {
      totalKills: this.totalKills,
      players: this.players,
      kills: this.kills,
    };
  }

  private getPlayers(): string[] {
    const playersSet = new Set(this.game.map((kill) => [kill.killer, kill.victim]).flat());
    playersSet.delete('<world>');
    return Array.from(playersSet);
  }

  private getPlayerKills(): { [key: string]: number } {
    return this.players.reduce((acc: { [key: string]: number }, player: string) => {
      const playerTotalKills = this.game.filter((kill) => kill.killer === player);
      const playerWorldDeaths = this.game.filter((kill) => kill.victim === player && kill.killer === '<world>');

      acc[player] = playerTotalKills.length - playerWorldDeaths.length;
      return acc;
    }, {});
  }
}
