import path from 'path';
import { LogParser } from './LogParser';
import { readFileSync } from 'fs';

describe('LogParser', () => {
  it('if log is a valid game log, return structured game data', () => {
    const kills = JSON.parse(readFileSync(path.resolve(__dirname, '../../data/kills.json'), 'utf8'));
    const logParser = new LogParser(path.resolve(__dirname, '../../data/games_log.log'));
    const result = logParser.getGames();
    expect(result).toEqual(kills);
  });

  it('if log is not a valid game log, return empty array', () => {
    const logParser = new LogParser(path.resolve(__dirname, '../../data/not_a_game_log.log'));
    const result = logParser.getGames();
    expect(result).toEqual([]);
  });
});
