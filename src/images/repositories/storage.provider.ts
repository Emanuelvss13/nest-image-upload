export interface IStorageProvider {
  upload(path: string): Promise<{ url: string; public_id: string }>;
  exists(storageId: string): Promise<boolean>;
  delete(storageId: string): Promise<void>;
}
