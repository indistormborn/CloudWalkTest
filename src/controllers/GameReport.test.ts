import { readFileSync, unlinkSync } from 'fs';
import { GameReport } from './GameReport';
import path from 'path';
import { Game } from './LogParser';

describe('GameReport', () => {
  let gameReport: GameReport;
  const kills = JSON.parse(readFileSync(path.resolve(__dirname, '../../data/kills.json'), 'utf-8'));
  const jsonReport = JSON.parse(readFileSync(path.resolve(__dirname, '../../data/report.json'), 'utf-8'));
  const textReport = readFileSync(path.resolve(__dirname, '../../data/report.txt'), 'utf-8');

  beforeEach(() => {
    gameReport = new GameReport(kills as unknown as Game[]);
  });

  it('should generate a report in JSON format', () => {
    expect(gameReport.toJSON()).toEqual(jsonReport);
  });

  it('should generate a report in plain text format', () => {
    expect(gameReport.toPlainText()).toEqual(textReport);
  });

  describe('save report in JSON', () => {
    const jsonFile = `report-${new Date().toISOString().slice(0, 10)}.json`;

    afterEach(() => {
      unlinkSync(jsonFile);
    });

    it('should save file', () => {
      gameReport.saveJSON();
      expect(JSON.parse(readFileSync(jsonFile, 'utf-8'))).toEqual(gameReport.toJSON());
    });
  });

  describe('save report in text', () => {
    const textFile = `report-${new Date().toISOString().slice(0, 10)}.txt`;

    afterEach(() => {
      unlinkSync(textFile);
    });

    it('should save file', () => {
      gameReport.savePlainText();
      expect(readFileSync(textFile, 'utf-8')).toEqual(gameReport.toPlainText());
    });
  });
});
