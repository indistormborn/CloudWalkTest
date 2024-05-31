import { Game } from '../controllers/LogParser';
import { IReport } from '../model/IReport';
import { Report } from './Report';

describe('Report', () => {
  const game: Game = [
    {
      killer: 'Isgalamido',
      victim: 'Mocinha',
      reason: 'MOD_ROCKET',
    },
    {
      killer: '<world>',
      victim: 'Zeh',
      reason: 'MOD_TRIGGER_HURT',
    },
    {
      killer: '<world>',
      victim: 'Zeh',
      reason: 'MOD_TRIGGER_HURT',
    },
    {
      killer: '<world>',
      victim: 'Dono da Bola',
      reason: 'MOD_FALLING',
    },
  ];

  const json: IReport = {
    totalKills: 4,
    players: ['Isgalamido', 'Mocinha', 'Zeh', 'Dono da Bola'],
    rank: [
      ['Isgalamido', 1],
      ['Dono da Bola', -1],
      ['Zeh', -2],
    ],
    deathCauses: {
      MOD_ROCKET: 1,
      MOD_TRIGGER_HURT: 2,
      MOD_FALLING: 1,
    },
  };
  const text = `
  Total kills: 4
  Players: 
  - Isgalamido
  - Mocinha
  - Zeh
  - Dono da Bola
  Rank: 
  - Isgalamido: 1 kills
  - Dono da Bola: -1 kills
  - Zeh: -2 kills
  Death causes: 
  - MOD_ROCKET: 1 times
  - MOD_TRIGGER_HURT: 2 times
  - MOD_FALLING: 1 times`;

  it('should generate report and return in JSON format', () => {
    const report = new Report(game);
    expect(report.toJSON()).toEqual(json);
  });

  it('should generate report and return in text format', () => {
    const report = new Report(game);
    expect(
      report
        .toPlainText()
        .split('\n')
        .map((line) => line.trim()),
    ).toEqual(text.split('\n').map((line) => line.trim()));
  });
});
