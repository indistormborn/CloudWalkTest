import { Game } from './GameLogParser';

export interface Report {
  totalKills: number;
  players: string[];
  kills: {
    [key: string]: number;
  };
}

export class GameReport {
  private readonly games: Game[];
  constructor(games: Game[]) {
    this.games = games;
  }

  playersAndKillPoints(): Report[] {
    const report: Report[] = [];

    for (const game of this.games) {
      const players = this.getPlayers(game);

      const kills = players.reduce((acc: { [key: string]: number }, player: string) => {
        const playerTotalKills = game.filter((kill) => kill.killer === player);
        const playerWorldDeaths = game.filter((kill) => kill.victim === player && kill.killer === '<world>');

        acc[player] = playerTotalKills.length - playerWorldDeaths.length;
        return acc;
      }, {});

      report.push({
        totalKills: game.length,
        players,
        kills,
      });
    }

    return report;
  }

  private getPlayers(game: Game) {
    const playersSet = new Set(game.map((kill) => [kill.killer, kill.victim]).flat());
    playersSet.delete('<world>');
    return Array.from(playersSet);
  }
}
