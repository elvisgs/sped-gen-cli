# SPED-Gen CLI

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

-o, --output-dir        Diretório onde os arquivos gerados serão gravados.
                        Pode ser um template [string]

-a, --aditional-fields  Campos adicionais (chave=valor) [array]

-h, --help              Exibe ajuda

-v, --version           Exibe a versão
```

### Exemplo
```shell
$ sped-gen -f myConfig.js -l fiscal -a foo=bar baz=qux -o "./out/bloco{{bloco}}"
```