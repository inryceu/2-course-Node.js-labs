import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import teamMembers from './data.js';

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/team/:memberId', (req, res) => {
  const memberId = req.params.memberId;
  const member = teamMembers[memberId];

  if (member) res.render('resume', { person: member });
  else res.status(404).send('Member not found');
});

app.listen(PORT, () => {
  console.log(`Server is running: http://localhost:${PORT}`);
});
