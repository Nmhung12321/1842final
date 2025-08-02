const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

global.Vocab = require('./api/models/VocabModels');
global.Category = require('./api/models/CategoryModel');

const vocabRoutes = require('./api/routes/VocabRoutes');
const categoryRoutes = require('./api/routes/CategoryRoutes');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/vocab-builder')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB failed: ', err));

const port = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

vocabRoutes(app);
categoryRoutes(app);

app.listen(port);
app.use((req, res) => {
  res.status(404).send({ url: `${req.originalUrl} not found` });
});
console.log(`Server started on port ${port}`);
