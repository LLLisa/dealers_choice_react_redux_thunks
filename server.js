//db----------------------------------
const { seedDb, Human, Company } = require('./db');

//server------------------------------------
const express = require('express');
const app = express();
const path = require('path');
const faker = require('faker');

app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/client', express.static(path.join(__dirname, 'client')));
app.use('/src', express.static(path.join(__dirname, 'src')));

const init = async () => {
  try {
    await seedDb();
    console.log('-----synced-----');
    const port = process.env.PORT || 9001;
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

init();

//routes-------------------------------------------
app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

app.get('/babe', (req, res) => {
  res.send('hi babe');
});

app.get('/api/humans', async (req, res, next) => {
  try {
    const response = await Human.findAll();
    res.send(response);
  } catch (error) {
    next(error);
  }
});

app.post('/api/humans', async (req, res, next) => {
  try {
    const newHuman = await Human.create({
      name: faker.name.findName(),
      phone: faker.phone.phoneNumber(),
      email: faker.internet.email(),
    });
    res.send(newHuman);
  } catch (error) {
    next(error);
  }
});

app.delete('/api/humans/:doomed', async (req, res, next) => {
  try {
    const doomedHuman = await Human.findByPk(req.params.doomed);
    await doomedHuman.destroy();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

app.get('/api/companies', async (req, res, next) => {
  try {
    const response = await Company.findAll();
    res.send(response);
  } catch (error) {
    next(error);
  }
});
