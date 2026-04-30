const sequelize = require('./src/config/db');

async function show() {
  try {
    const [tables] = await sequelize.query('SHOW TABLES;');
    console.log(tables);
  } catch (err) {
    console.error(err);
  } finally {
    process.exit();
  }
}
show();
