import { Command } from 'commander';
import { cronCommand } from './commands/cron';


const program = new Command();

program
  .name('cron-string-parser')
  .description('A simple CLI tool for parsing cron strings')
  .version('0.1.0');

program.addCommand(cronCommand);
program.parse(process.argv);
