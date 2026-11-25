// Router genérico: listar, crear y actualizar (lo que pide el caso de estudio)
const { Router } = require('express');

module.exports = (Model, populate = []) => {
  const r = Router();
  r.get('/', async (req, res, next) => {
    try { res.json(await Model.find().populate(populate)); } catch (e) { next(e); }
  });
  r.get('/:id', async (req, res, next) => {
    try {
      const doc = await Model.findById(req.params.id).populate(populate);
      doc ? res.json(doc) : res.status(404).json({ error: 'No encontrado' });
    } catch (e) { next(e); }
  });
  r.post('/', async (req, res, next) => {
    try { res.status(201).json(await Model.create(req.body)); } catch (e) { next(e); }
  });
  r.put('/:id', async (req, res, next) => {
    try {
      const doc = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      doc ? res.json(doc) : res.status(404).json({ error: 'No encontrado' });
    } catch (e) { next(e); }
  });
  return r;
};
