export interface ICrudRepository<I> {
  create(
    data: Omit<
      I,
      | 'id'
      | 'createdAt'
      | 'updatedAt'
      | 'hashPassword'
      | 'validatePassword'
      | 'accessToken'
      | 'images'
      | 'transactions'
    >,
  ): Promise<I>;
  update(data: Partial<I>): Promise<I>;
  findById(id: string): Promise<I>;
  delete(id: string): Promise<boolean>;
}
