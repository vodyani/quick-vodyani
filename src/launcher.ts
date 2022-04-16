/* eslint-disable @typescript-eslint/no-var-requires */
import { lt } from 'semver';
import { Command } from 'commander';

import {
  HelpHandler,
  ApiGenerator,
  CreateProjectHandler,
} from './commands';
import { Logger } from './base';
import { color } from './common';

export class Launcher {
  constructor(
    private readonly suggestNodeVersion = '16.0.0',
    private readonly currentNodeVersion = process.versions.node,
    private readonly cliVersion = require('../package.json').version,
  ) {
    if (lt(this.currentNodeVersion, this.suggestNodeVersion)) {
      Logger.warn(
        `You are using Node.js version ${this.currentNodeVersion}, Please consider upgrading to Node.js ${this.suggestNodeVersion} or higher.`,
      );
    }
  }

  public build() {
    const program = new Command();

    program
      .version(this.cliVersion, '-v, --verbose', 'Output the current version.')
      .option('-h, --help', 'Output usage information.')
      .usage('[options]');

    program
      .command('help')
      .description(`❓ ${color.grey('Get Help.')}`)
      .action(HelpHandler.outputUsage);

    program
      .command('new')
      .usage('[command]')
      .description(`🚀 ${color.cyan('Create vodyani application.')}`)
      .action(async () => (CreateProjectHandler.download(this.cliVersion)));

    program
      .command('a')
      .usage('[command]')
      .description(`🔌 ${color.green('Generate api module.')}`)
      .action(async () => ApiGenerator.build());

    program
      .command('d')
      .usage('[command]')
      .description(`🌏 ${color.green('Generate domain module.')}`)
      .action(async () => console.log('1'));

    program
      .command('f')
      .usage('[command]')
      .description(`🏭 ${color.green('Generate file on demand.')}`)
      .action(async () => console.log('1'));

    program.parse(process.argv);
  }
}
