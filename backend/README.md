# Backend JB Motos (Ordens de Serviço)

API simples em Node.js + Express + MySQL para o sistema de ordens de serviço da oficina **JB Motos**, baseada no script SQL fornecido.

## Requisitos

- Node.js instalado
- MySQL rodando (local ou remoto)
- Banco de dados criado com o script `jb_motos` (o SQL que você já tem)

## Configuração

1. Copie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

2. Edite o `.env` com os dados do seu MySQL:

- `DB_HOST`
- `DB_PORT`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME` (deixe `jb_motos` se usou o script como está)

## Instalar dependências

Na raiz do projeto:

```bash
npm install
```

## Executar servidor

Modo normal:

```bash
npm start
```

Modo desenvolvimento (com auto-reload, se quiser):

```bash
npm run dev
```

O servidor sobe por padrão em `http://localhost:3000`.

## Endpoints principais

- `GET /` — teste (mensagem "API JB Motos funcionando")
- `GET /api/usuarios` — lista usuários
- `GET /api/clientes` — lista clientes
- `GET /api/motos` — lista motos com cliente
- `GET /api/pecas` — lista peças
- `GET /api/ordens-servico` — lista ordens com cliente/moto/funcionários
- `GET /api/ordens-servico/:id` — detalhes de uma OS + peças
- `GET /api/ordens-servico/:id/pecas` — peças de uma OS
- `POST /api/ordens-servico/:id/pecas` — adiciona peça em uma OS
- `GET /api/ordens-servico/historico/moto/:moto_id` — histórico de serviços por moto (view)

As rotas também possuem `POST`, `PUT` e `DELETE` para as tabelas principais (`usuarios`, `clientes`, `motos`, `pecas`, `ordens_servico`).
