import { Game } from './LogParser';
import { Report } from '../entity/Report';
import { IReport } from '../model/IReport';

export class GameReport {
  private readonly games: Game[];
  private readonly report: Report[];

  constructor(games: Game[]) {
    this.games = games;
    this.report = this.games.map((game) => new Report(game));
  }

  toJSON(): IReport[] {
    return this.report.map((report) => report.toJSON());
  }

  toPlainText(): string {
    return this.report
      .map(
        (report, idx) => `------- Game ${idx} ------- 
      ${report.toPlainText()}\n`,
      )
      .join('\n');
  }
}