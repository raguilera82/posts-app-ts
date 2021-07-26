import { User } from '../model/entities/user.entity';
import { EmailVO } from '../model/vos/email.vo';
import { IdVO } from '../model/vos/id.vo';

export interface UserRepository {

    save(user: User): Promise<void>;

    getAll(): Promise<User[]>;

    getById(id: IdVO): Promise<User | null>;

    getByEmail(email: EmailVO): Promise<User | null>;

    delete(id: IdVO): Promise<void>;

    update(user: User): Promise<void>;

}