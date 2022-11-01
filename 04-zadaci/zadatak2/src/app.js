import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import memoryStorage from './memoryStorage.js';
import HTTPError from './helpers/HTTPError.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/vratiAutore', (req, res) => {
  res.status(200).json({
    data: memoryStorage.autori.map(({ naziv, djela }) => ({ naziv, djela })),
  });
});

app.post(
  '/dodajAutora',
  (req, res, next) => {
    const { naziv, djela } = req.body;
    if (!naziv || !djela) return next(new HTTPError('Krivi kljucevi', 422));

    const max = 20;
    const tooLongDjelo = djela.find((djelo) => djelo.length > max);
    if (tooLongDjelo)
      return next(new HTTPError(`Djelo ${tooLongDjelo} ima vise od ${max} znakova`, 422));

    next();
  },
  (req, res) => {
    const body = { naziv: req.body.naziv, djela: req.body.djela };
    const newAutor = {
      ...body,
      id: uuidv4(),
      datum: new Date().toString(),
    };

    memoryStorage.autori.push(newAutor);

    res.status(201).json({ data: newAutor });
  }
);

app.delete('/izbrisiDjeloAutora/:id/:djelo', (req, res, next) => {
  const { id, djelo } = req.params;

  const autor = memoryStorage.autori.find((autor) => autor.id === id);
  if (!autor) return next(new HTTPError('Resource not found.', 404));

  const djeloIndex = autor.djela.indexOf(djelo);
  if (djeloIndex === -1) return next(new HTTPError('Resource not found.', 404));

  autor.djela.splice(djeloIndex, 1);

  res.status(204).json({ data: null });
});

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({ error: err.message || 'Something bombed.' });
});

app.listen(port, () => console.log(`App listening on port ${port}`));
