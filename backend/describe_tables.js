const sequelize = require('./src/config/db');

async function describe() {
  try {
    const [partido] = await sequelize.query('DESCRIBE partido;');
    console.log('PARTIDO SCHEMA:');
    console.table(partido);

    const [gol] = await sequelize.query('DESCRIBE gol;');
    console.log('GOL SCHEMA:');
    console.table(gol);
  } catch (err) {
    console.error('Error fetching schema:', err);
  } finally {
    process.exit();
  }
}
describe();
