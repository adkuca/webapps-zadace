import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import memoryStorage from './memoryStorage.js';
import HTTPError from './helpers/HTTPError.js';
import bodyCheck from './middleware/bodyCheck.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/vratiObavjesti', (req, res) => {
  res.status(200).json({
    data: memoryStorage.obavjesti.map(({ naziv, sadrzaj }) => ({ naziv, sadrzaj })),
  });
});

app.get('/vratiObavjest/:id', (req, res, next) => {
  const { id } = req.params;

  const obavjest = memoryStorage.obavjesti.find((obavjest) => obavjest.id === id);
  if (!obavjest) return next(new HTTPError('Resource not found.', 404));

  const data = { naziv: obavjest.naziv, sadrzaj: obavjest.sadrzaj, datum: obavjest.datum };

  res.status(200).json({ data });
});

app.post('/dodajObavjest', bodyCheck('naziv', 'sadrzaj'), (req, res) => {
  const body = { naziv: req.body.naziv, sadrzaj: req.body.sadrzaj };
  const newObavjest = {
    ...body,
    id: uuidv4(),
    datum: new Date().toString(),
  };

  memoryStorage.obavjesti.push(newObavjest);

  res.status(201).json({ data: newObavjest });
});

app.patch('/izmjeniObavjest/:id', bodyCheck('sadrzaj'), (req, res) => {
  const { id } = req.params;
  const { sadrzaj } = req.body;

  const obavjest = memoryStorage.obavjesti.find((item) => item.id === id);
  if (!obavjest) return next(new HTTPError('Resource not found.', 404));

  obavjest.sadrzaj = sadrzaj;

  res.status(200).json({ data: obavjest });
});

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({ error: err.message || 'Something bombed.' });
});

app.listen(port, () => console.log(`App listening on port ${port}`));
