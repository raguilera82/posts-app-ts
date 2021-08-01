import { Sequelize } from 'sequelize';

const user = process.env.PG_USER ?? 'pguser';
const pass = process.env.PG_PASS ?? 'pguser';
const host = process.env.PG_HOST ?? 'localhost';
const port = process.env.APP_PG_PORT ?? '5432';
const dbName = process.env.PG_DB_NAME ?? '';

const sequelize = new Sequelize(`postgres://${user}:${pass}@${host}:${port}/${dbName}`);

sequelize.authenticate()
    .then(() => console.log('Connection postgresql established'))
    .catch(err => console.log(err));

sequelize.sync({force: true}).then(() => {
    console.log('Database & tables created');
});

export default sequelize;