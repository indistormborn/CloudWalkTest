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

  const parser = new LogParser(filePath);
  const reporter = new GameReport(parser.getGames());

  const outputFormat = await select({
    message: 'Would you link the output in which format?',
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
})();
