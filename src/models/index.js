const { Schema, model } = require('mongoose');
const opts = { timestamps: { createdAt: 'fechaCreacion', updatedAt: 'fechaActualizacion' } };

const TipoProyecto = model('TipoProyecto', new Schema({
  nombre: { type: String, required: true,
    enum: ['ensayo', 'artículo', 'monografía', 'trabajo final de pregrado', 'trabajo final de especialización'] }
}, opts));

const Cliente = model('Cliente', new Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true }
}, opts));

const Universidad = model('Universidad', new Schema({
  nombre: { type: String, required: true },
  direccion: String,
  telefono: String
}, opts));

const Etapa = model('Etapa', new Schema({
  nombre: { type: String, required: true,
    enum: ['anteproyecto', 'entrega parcial 1', 'entrega parcial 2', 'entrega final'] }
}, opts));

const Proyecto = model('Proyecto', new Schema({
  numero: { type: String, required: true, unique: true },
  titulo: { type: String, required: true },
  fechaIniciacion: Date,
  fechaEntrega: Date,
  valor: Number,
  cliente: { type: Schema.Types.ObjectId, ref: 'Cliente', required: true },
  tipoProyecto: { type: Schema.Types.ObjectId, ref: 'TipoProyecto', required: true },
  universidad: { type: Schema.Types.ObjectId, ref: 'Universidad', required: true },
  etapa: { type: Schema.Types.ObjectId, ref: 'Etapa', required: true }
}, opts));

module.exports = { TipoProyecto, Cliente, Universidad, Etapa, Proyecto };
