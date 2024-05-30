import { Game } from './LogParser';
import { Report } from '../entity/Report';
import { IReport } from '../model/IReport';
import { saveJSON, saveText } from '../helpers/Utils';

export class GameReport {
  private readonly games: Game[];
  private readonly report: Report[];
  private jsonReport?: IReport[];
  private textReport?: string;

  constructor(games: Game[]) {
    this.games = games;
    this.report = this.games.map((game) => new Report(game));
  }

  toJSON(): IReport[] {
    if (!this.jsonReport) this.jsonReport = this.report.map((report) => report.toJSON());
    return this.jsonReport
  }

  toPlainText(): string {
    if (!this.textReport) {
      this.textReport = this.report
        .map(
          (report, idx) => `------- Game ${idx + 1} ------- 
      ${report.toPlainText()}\n`,
        )
        .join('\n');
    }
    return this.textReport
  }

  saveJSON(): void {
    const name = `report-${new Date().toISOString().slice(0, 10)}.json`;
    if (this.jsonReport) return saveJSON(this.jsonReport, name);
    saveJSON(this.toJSON(), name);
  }

  savePlainText(): void {
    const name = `report-${new Date().toISOString().slice(0, 10)}.txt`;
    if (this.textReport) return saveText(this.textReport, name);
    saveText(this.toPlainText(), name);
  }

}
