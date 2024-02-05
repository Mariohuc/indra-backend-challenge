export interface IRepository<T> {
  getAll(metadata?: { page?: number; limit?: number }): Promise<any>;
  getById(id: string): Promise<T>;
  create(newItem: T): Promise<T>;
}
