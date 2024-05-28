import { GameLogParser } from './GameLogParser';
import { GameReport } from './Report';

const logPath = 'data/qgames.log';

const parser = new GameLogParser(logPath);
const reporter = new GameReport(parser.getGames());
console.log(JSON.stringify(reporter.playersAndKillPoints()));