//db----------------------------------
const faker = require('faker');
const Sequelize = require('sequelize');
const db = new Sequelize(
  process.env.DATABASE_URL ||
    'postgres://localhost/dealers_choice_react_redux_thunks',
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

const Company = db.define('company', {
  name: {
    type: Sequelize.STRING,
  },
  tagline: {
    type: Sequelize.STRING,
  },
});
Human.belongsTo(Company);
Company.hasMany(Human);

// let numOfCompanies = 0;
const createCompany = async (num) => {
  // numOfCompanies = num;
  try {
    for (let i = 0; i < num; i++) {
      await Company.create({
        name: faker.company.companyName(),
        tagline: faker.company.bs(),
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const createHuman = async (num) => {
  try {
    for (let i = 0; i < num; i++) {
      const newHuman = await Human.create({
        name: faker.name.findName(),
        phone: faker.phone.phoneNumber(),
        email: faker.internet.email(),
      });
      // newHuman.companyId = 5;
    }
  } catch (error) {
    console.log(error);
  }
};

const seedDb = async () => {
  try {
    await db.sync({ force: true });
    await createHuman(10);
    await createCompany(5);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { seedDb, Human, Company };
