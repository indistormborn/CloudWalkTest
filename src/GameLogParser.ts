import { removeTimestampFromLog, openLogFile } from './utils';

export interface Kill {
  killer: string;
  victim: string;
  reason: string;
}

export type Game = Kill[];

export class GameLogParser {
  private readonly games: Game[];
  constructor(filePath: string) {
    const logFile = openLogFile(filePath);
    const gameLogs = this.splitLogFileIntoGameArrays(logFile);
    this.games = this.structureGameLogs(gameLogs);
  }

  private splitLogFileIntoGameArrays(logFile: string): Array<Array<string>> {
    const lines = logFile.split('\n');
    const games: string[][] = [];
    let pointer = -1;

    lines.forEach((line) => {
      // todo botar indicador do inicio numa env
      if (line.includes('InitGame')) {
        games.push([]);
        return (pointer = pointer + 1);
      }
      // todo botar o indicador do fim numa env
      if (line.includes('ShutdownGame')) return;
      if (!line.includes('Kill:')) return;

      const cleanedLine = removeTimestampFromLog(line).trim();

      if (pointer != -1) games[pointer].push(cleanedLine);
    });

    return games;
  }

  private structureGameLogs(games: Array<Array<string>>): Array<Game> {
    const structuredGames: Array<Game> = [];
    for (let i = 0; i < games.length; i++) {
      const game = games[i];
      const gameKills = game.map((log) => {
        const match = log.match(/^[^:]*:[^:]*:(.*)$/);
        const cleanedLog = match ? match[1] : log;
        return {
          killer: this.getKiller(cleanedLog),
          victim: this.getVictim(cleanedLog),
          reason: this.getReason(cleanedLog),
        };
      });
      structuredGames.push(gameKills);
    }
    return structuredGames;
  }

  private getKiller(log: string) {
    return log.split('killed')[0].trim();
  }

  private getVictim(log: string) {
    return log.split('killed')[1].split('by')[0].trim();
  }

  private getReason(log: string) {
    return log.split('by')[1].trim();
  }

  getGames(): Game[] {
    return this.games;
  }
}
