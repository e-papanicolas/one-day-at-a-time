export abstract class IGenericRepository<T> {
  abstract create(item: T): Promise<T>;

  abstract findAll(): Promise<T[]>;

  abstract findOne(id: number): Promise<T>;

  abstract update(id: number, item: T): Promise<T>;

  abstract remove(id: number): Promise<void>;
}
