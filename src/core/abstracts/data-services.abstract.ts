import { Entry } from '../entities/entry.entity';
import { Note } from '../entities/note.entity';
import { User } from '../entities/user.entity';
import { IGenericRepository } from './generic-repository.abstract';

export abstract class IDataServices {
  abstract users: IGenericRepository<User>;
  abstract entries: IGenericRepository<Entry>;
  abstract notes: IGenericRepository<Note>;
}
