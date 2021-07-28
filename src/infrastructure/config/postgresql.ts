import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('postgres://pguser:pguser@localhost:5432/pgdb');

sequelize.authenticate()
    .then(() => console.log('Connection postgresql established'))
    .catch(err => console.log(err));

sequelize.sync({force: true}).then(() => {
    console.log('Database & tables created');
});

export default sequelize;