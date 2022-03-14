//db----------------------------------
const faker = require('faker');
const Sequelize = require('sequelize');
const db = new Sequelize(
  process.env.DATABASE_URL ||
    'postgres://localhost/dealers_choice_react_webpack',
  { logging: false }
);

const Human = db.define('human', {
  name: {
    type: Sequelize.STRING,
  },
  phone: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
});

const createHuman = async (num) => {
  try {
    for (let i = 0; i < num; i++) {
      await Human.create({
        name: faker.name.findName(),
        phone: faker.phone.phoneNumber(),
        email: faker.internet.email(),
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const seedDb = async () => {
  try {
    await db.sync({ force: true });
    await createHuman(10);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { seedDb, Human };
