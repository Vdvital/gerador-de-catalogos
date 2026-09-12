# Gerador de Catálogos

MVP web para criar catálogos A4 a partir de uma planilha e de imagens nomeadas com o código do produto.

## O que já funciona

- Importação de `.xlsx`, `.xls` e `.csv`.
- Leitura de imagens individuais ou arquivo `.zip`.
- Associação automática da imagem pelo código do produto.
- Validação de códigos duplicados, campos obrigatórios e imagens ausentes.
- Organização por categoria.
- Personalização de título, empresa, cores, modelo e quantidade de produtos.
- Pré-visualização A4 responsiva.
- Geração e download do catálogo em PDF.
- Rascunho e histórico armazenados no navegador.
- Dashboard e visão administrativa inicial.

## Executar

Abra `index.html` ou rode um servidor local:

```bash
python3 -m http.server 8080
```

Depois acesse `http://localhost:8080`.

## Planilha

Colunas obrigatórias: `Código`, `Nome` e `Valor`.

Colunas opcionais: `Categoria`, `Novidade`, `Descrição`, `Quantidade por caixa`, `NCM`, `Material`, `Medidas`, `Código de barras`, `Promoção` e `Em produção`.

Veja `exemplo-produtos.csv`.

## Próxima etapa de produção

Conectar Supabase para autenticação, banco e armazenamento; integrar Mercado Pago/Asaas por webhook; mover a geração pesada para uma fila no servidor e aplicar limites reais por assinatura.

