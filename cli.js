#!/usr/bin/env node

'use strict';

const spedGen = require('sped-gen');
const path = require('path');
const yargs = require('yargs');
const pkg = require('./package');

const binName = Object.keys(pkg.bin)[0];

const argv = yargs
  .usage(`Usage: ${binName} <options>`)

  .option('f', {
    alias: 'config-file',
    describe: 'Arquivo de configuração. Deve ser um modulo que\nexporta as opções para o SPED-Gen',
    demand: true,
    type: 'string'
  })

  .option('l', {
    alias: 'layout-sped',
    describe: 'Layout SPED cujos metadados serão usados',
    choices: [spedGen.layouts.FISCAL, spedGen.layouts.CONTRIB],
    default: spedGen.layouts.FISCAL,
    type: 'string'
  })

  .option('o', {
    alias: 'output-dir',
    describe: 'Diretório onde os arquivos gerados serão gravados.\nPode ser um template',
    type: 'string'
  })

  .option('a', {
    alias: 'aditional-fields',
    describe: 'Campos adicionais (chave=valor)',
    type: 'array'
  })

  .version(() => {
    const cliVersion = pkg.version;
    const spedGenVersion = require('./node_modules/sped-gen/package').version;

    return `CLI v${cliVersion}\nSPED-Gen v${spedGenVersion}`;
  })
  .alias('v', 'version')

  .help('h')
  .alias('h', 'help')

  .example(`${binName}`, '-f myConfig.js -l fiscal -a foo=bar baz=qux -o "./out/bloco{{bloco}}"')

  .wrap(yargs.terminalWidth())
  .argv;


const options = require(path.resolve(argv.f));

options.layoutSped = options.layoutSped || argv.l;

if (argv.a && argv.a.length) {
  const aditionalFields = {};

  argv.a.forEach(kv => {
    const parts = kv.split('=');
    if (parts[0] && parts[1]) {
      aditionalFields[parts[0]] = parts[1];
    }
  });

  options.aditionalFields = Object.assign({}, aditionalFields, options.aditionalFields)
}

if (argv.o) {
  const outputDir = path.resolve(argv.o);

  if (typeof options.fileName === 'function') {
    options.fileName = options.fileName(options);
  }

  const basename = path.basename(options.fileName);
  options.fileName = path.join(outputDir, basename);
}

spedGen(options);