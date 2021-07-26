import sequelize from '../config/postgresql';
import { DataTypes } from 'sequelize';

const UserModel = sequelize.define('users', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
    
});

export { UserModel };