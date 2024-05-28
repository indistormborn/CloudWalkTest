import { GameLogParser } from './GameLogParser';

const logPath = 'data/qgames.log';

const parser = new GameLogParser(logPath);
console.log(JSON.stringify(parser.getGames()));
