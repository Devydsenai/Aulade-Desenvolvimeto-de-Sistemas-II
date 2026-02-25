/**
 * Script de seed - reservado para uso futuro.
 * Os usuários criam suas próprias contas via POST /api/auth/registrar
 *
 * Exemplo de registro:
 * POST /api/auth/registrar
 * Body: { "nome": "João", "email": "joao@email.com", "senha": "123456", "perfil": "PROPRIETARIO" }
 */
require('dotenv').config();
const mysql = require('mysql2/promise');

async function seed() {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'JB_Motos'
  });
  await conn.execute('SELECT 1');
  console.log('Conexão OK. Use POST /api/auth/registrar para criar sua conta.');
  await conn.end();
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
