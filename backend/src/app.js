require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { testConnection } = require('./config/db');
const authRoutes = require('./routes/auth');
const usuariosRoutes = require('./routes/usuarios');
const clientesRoutes = require('./routes/clientes');
const motosRoutes = require('./routes/motos');
const pecasRoutes = require('./routes/pecas');
const ordensServicosRoutes = require('./routes/ordensServicos');

const app = express();

app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/clientes', clientesRoutes);
app.use('/api/motos', motosRoutes);
app.use('/api/pecas', pecasRoutes);
app.use('/api/ordens-servico', ordensServicosRoutes);

// Rota simples para teste
app.get('/', (req, res) => {
  res.json({ mensagem: 'API JB Motos funcionando' });
});

// Rota não encontrada
app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada' });
});

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error('Erro:', err);
  res.status(500).json({ erro: 'Erro interno do servidor' });
});

const PORT = process.env.PORT || 5000;

async function iniciar() {
  const dbOk = await testConnection();
  if (!dbOk) {
    console.error('Verifique as configurações do banco em .env');
    process.exit(1);
  }
  app.listen(PORT, () => {
    console.log(`\n🚀 JB Motos API rodando em http://localhost:${PORT}`);
    console.log(`   Endpoints: /api/auth, /api/usuarios, /api/clientes, /api/motos, /api/pecas, /api/ordens-servico\n`);
  });
}

iniciar();
