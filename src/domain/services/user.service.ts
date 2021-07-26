import { Inject, Service } from 'typedi';
import { User, UserType } from '../model/entities/user.entity';
import { ExceptionWithCode } from '../model/exception-with-code';
import { EmailVO } from '../model/vos/email.vo';
import { IdVO } from '../model/vos/id.vo';
import { PasswordVO } from '../model/vos/password.vo';
import { UserRepository } from '../repositories/user.repository';

@Service()
export class UserService {

    constructor(@Inject('UserRepository') private userRepository: UserRepository) {}

    async persist(user: User): Promise<void> {
        await this.userRepository.save(user);
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
            password: PasswordVO.create(user.password.value ?? userOriginal?.password.value)
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