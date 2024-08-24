import { ICrudRepository } from '../../global/repository/crud.repository';
import { User } from '../entities/user.entity';

export interface IUserRepository extends ICrudRepository<User> {
  findByEmail(email: string): Promise<User>;
}
