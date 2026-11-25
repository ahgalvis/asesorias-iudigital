const express = require('express');
const path = require('path');
const crud = require('./routes/crud');
const m = require('./models');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/health', (req, res) => res.json({ status: 'ok', version: process.env.APP_VERSION || 'dev' }));

app.use('/api/tipos-proyecto', crud(m.TipoProyecto));
app.use('/api/clientes', crud(m.Cliente));
app.use('/api/universidades', crud(m.Universidad));
app.use('/api/etapas', crud(m.Etapa));
app.use('/api/proyectos', crud(m.Proyecto, ['cliente', 'tipoProyecto', 'universidad', 'etapa']));

app.use((err, req, res, next) => {
  const status = err.name === 'ValidationError' || err.code === 11000 ? 400 : 500;
  res.status(status).json({ error: err.message });
});

module.exports = app;
