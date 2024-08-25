export interface IStorageProvider {
  upload(path: string): Promise<{ url: string; public_id: string }>;
  delete(storageId: string): Promise<void>;
}
