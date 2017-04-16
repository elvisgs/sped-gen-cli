# SPED-Gen CLI

[![npm](https://img.shields.io/npm/v/sped-gen-cli.svg)](https://www.npmjs.com/package/sped-gen-cli)

> Command line interface para o [SPED-Gen](https://github.com/elvisgs/sped-gen)

## Instalação

```shell
$ npm install -g sped-gen-cli
```

## Uso
```shell
$ sped-gen <options>
```

### Opções
```
-f, --config-file       Arquivo de configuração. Deve ser um modulo que
                        exporta as opções para o SPED-Gen [string] [obrigatório]

-l, --layout-sped       Layout SPED cujos metadados serão usados
                        [string] [opções: "fiscal", "contrib"] [padrão: "fiscal"]

-r, --layout-version    Versão do layout SPED [string]

-o, --output-dir        Diretório onde os arquivos gerados serão gravados.
                        Pode ser um template [string]

-a, --aditional-fields  Campos adicionais (chave=valor) [array]

-h, --help              Exibe ajuda

-v, --version           Exibe a versão
```

### Exemplo
```shell
$ sped-gen -f my-config.js -l fiscal -r 011 -a foo=bar baz=qux -o "./out/bloco{{bloco}}"
```

## Arquivo de configuração
Abaixo está um exemplo de arquivo de configuração que informa ao SPED-Gen para gerar múltiplos arquivos de acordo com o template `my-template.hbs` nos diretórios `./out/contrib/blocoXXXX` com os nomes `RegistroXXXX.txt`.

*my-config.js:*

```javascript
'use strict';

const fs = require('fs');

module.exports = {
  layoutSped: 'contrib',
  singleFile: false,
  template: fs.readFileSync('./my-template.hbs').toString(),
  fileName: options => {
    const layout = options.layoutSped;
    return `./out/${layout}/bloco{{bloco}}/Registro{{id}}.txt`
  },
  filter: registro => {
    // ...
    return true;
  },
  handler: registro => {
    // ...
  },
  mapper: registro => {
    // ...
    return registro;
  },
  aditionalFields: {
    myKey: "value"
    // ...
  }
};
```