import { LogParser } from './controllers/LogParser';
import { GameReport } from './controllers/GameReport';

const logPath = 'data/qgames.log';

const parser = new LogParser(logPath);
const reporter = new GameReport(parser.getGames());
// console.log(JSON.stringify(reporter.toJSON()));
console.log(reporter.toPlainText());
