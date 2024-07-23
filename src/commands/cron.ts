import { parseCron } from '../utils/cron';
import { Command } from 'commander';



export const cronCommand = new Command('parse-cron')
  .description('Parse a cron string')
  .argument('<cronString>', 'cron string to parse')
  .action((cronString: string) => {
    parseCron(cronString);
  });