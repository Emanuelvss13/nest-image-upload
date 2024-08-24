export interface ICrudRepository<I> {
  create(
    data: Omit<
      I,
      'id' | 'createdAt' | 'updatedAt' | 'hashPassword' | 'validatePassword'
    >,
  ): Promise<I>;
  update(data: Partial<I>): Promise<I>;
  findById(id: string): Promise<I>;
  findAll(): Promise<I[]>;
  delete(id: string): Promise<boolean>;
}
