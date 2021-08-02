import { Role, RoleVO } from './../../domain/model/vos/role.vo';
import { User, UserType } from '../../domain/model/entities/user.entity';
import { EmailVO } from '../../domain/model/vos/email.vo';
import { IdVO } from '../../domain/model/vos/id.vo';
import { PasswordVO } from '../../domain/model/vos/password.vo';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UserModel } from './user.schema';

export class UserRepositoryPG implements UserRepository {

    async getByEmail(email: EmailVO): Promise<User | null> {
        const userDB: any = await UserModel.findOne({where: {
            email: email.value}
        });

        if (!userDB) {
            return null;
        }

        const userData: UserType = {
            id: IdVO.createWithUUID(userDB.id),
            email: EmailVO.create(userDB.email),
            password: PasswordVO.create(userDB.password),
            role: RoleVO.create(userDB.role)
        };

        return new User(userData);
    }
    
    async update(user: User): Promise<void> {
        await UserModel.update({
            id: user.id.value, 
            email: user.email.value, 
            password: user.password.value
        }, {
            where: {
                id: user.id.value    
            }
        }); 
    }
    
    async getAll(): Promise<User[]> {
        const users = await UserModel.findAll({});
        return users.map((ofModel: any) => {
            const userData: UserType = {
                id: IdVO.createWithUUID(ofModel.id),
                password: PasswordVO.create(ofModel.password),
                email: EmailVO.create(ofModel.email),
                role: RoleVO.create(ofModel.role)
            };
            return new User(userData);
        });
    }

    async getById(id: IdVO): Promise<User | null> {
        const userDB: any = await UserModel.findOne({where: {
            id: id.value
        }});

        if (!userDB) {
            return null;
        }

        const userData: UserType = {
            id: IdVO.createWithUUID(userDB.id),
            email: EmailVO.create(userDB.email),
            password: PasswordVO.create(userDB.password),
            role: RoleVO.create(userDB.role)
        };

        return new User(userData);
    }
    
    async save(user: User): Promise<void> {

        const id = user.id.value;
        const email = user.email.value;
        const password = user.password.value;
        const role = user.role.value;
    
        const userModel = UserModel.build({id, email, password, role});
        await userModel.save();
    }

    async delete(id: IdVO): Promise<void> {
        await UserModel.destroy({
            where: {
                id: id.value
            }
        });
    }

    async deleteAll(): Promise<void> {
        await UserModel.destroy({
            where: {},
            truncate: true
        });
    }

}