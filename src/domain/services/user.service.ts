import { Role, RoleVO } from './../model/vos/role.vo';
import { Inject, Service } from 'typedi';
import { User, UserType } from '../model/entities/user.entity';
import { ExceptionWithCode } from '../model/exception-with-code';
import { EmailVO } from '../model/vos/email.vo';
import { IdVO } from '../model/vos/id.vo';
import { PasswordVO } from '../model/vos/password.vo';
import { UserRepository } from '../repositories/user.repository';
import bcrypt from 'bcrypt';
import { logger } from '../../infrastructure/config/logger';

@Service()
export class UserService {

    constructor(@Inject('UserRepository') private userRepository: UserRepository) {}

    async isValidPassword(password: PasswordVO, user: User): Promise<boolean> {
        return bcrypt.compare(password.value, user.password.value);
    }

    async persist(user: User): Promise<void> {
        const hash = await bcrypt.hash(user.password.value, 10);
        const encryptPassword = PasswordVO.create(hash);
        const newUser: UserType = {
            id: user.id,
            email: user.email,
            password: encryptPassword,
            role: user.role
        };
        logger.debug(`Save user ${JSON.stringify(newUser)}`)
        await this.userRepository.save(new User(newUser));
    }

    async getAll(): Promise<User[]> {
        return this.userRepository.getAll();
    }

    async getById(id: IdVO): Promise<User | null> {
        return this.userRepository.getById(id);
    }

    async getByEmail(email: EmailVO): Promise<User | null> {
        return this.userRepository.getByEmail(email);
    }

    async delete(id: IdVO): Promise<void> {
        await this.checkIfIDExits(id);
        await this.userRepository.delete(id);
    }

    async update(user: User): Promise<void> {
        await this.checkIfIDExits(user.id);
        const userOriginal = await this.userRepository.getById(user.id);
        
        const userMerge: UserType = {
            id: user.id,
            email: EmailVO.create(user.email.value ?? userOriginal?.email.value),
            password: PasswordVO.create(user.password.value ?? userOriginal?.password.value),
            role: RoleVO.create(user.role.value ?? userOriginal?.role.value)
        };
        await this.userRepository.update(new User(userMerge));
    }

    private async checkIfIDExits(id: IdVO): Promise<void> {
        const userDB = await this.getById(id);
        if (!userDB) {
            throw new ExceptionWithCode(404, `Id Not Found: ${id.value}`);
        }
    }
}