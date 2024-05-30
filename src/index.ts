import { input, select } from '@inquirer/prompts';
import { LogParser } from './controllers/LogParser';
import { GameReport } from './controllers/GameReport';
import { existsSync } from 'fs';

(async () => {
  const filePath = await input({
    message: 'Add file path to parse',
    validate: (value) => {
      if (existsSync(value)) return true;
      return `Caminho do arquivo inválido, o arquivo não existe`;
    },
  });

  let parser: LogParser;

  try {
    parser = new LogParser(filePath);
  } catch (error) {
    return console.error('Unable to parse input file. Check file and try again.');
  }

  const reporter = new GameReport(parser.getGames());

  const outputFormat = await select({
    message: 'Select the output format for the report',
    choices: [
      {
        value: 'JSON',
      },
      {
        value: 'Text',
      },
    ],
  });

  if (outputFormat === 'JSON') console.log(reporter.toJSON());
  if (outputFormat === 'Text') console.log(reporter.toPlainText());

  const saveItOrNot = await select({
    message: 'Would like to save the output to a file?',
    choices: [
      {
        value: 'Yes',
      },
      {
        value: 'Exit',
      },
    ],
  });

  if (saveItOrNot === 'Yes') {
    if (outputFormat === 'JSON') console.log(reporter.saveJSON());
    if (outputFormat === 'Text') console.log(reporter.savePlainText());
  } else {
    process.exit(0)
  }
})();
