import { IImageUpload } from '../../../images/dto/image-upload.dto';

export interface IStorageEvent {
  save(data: IImageUpload): Promise<void>;
}
