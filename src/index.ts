import { GameLogParser } from './GameLogParser';
import { GameReport } from './GameReport';

const logPath = 'data/qgames.log';

const parser = new GameLogParser(logPath);
const reporter = new GameReport(parser.getGames());
//console.log(JSON.stringify(reporter.toJSON()));
console.log(reporter.toPlainText());
