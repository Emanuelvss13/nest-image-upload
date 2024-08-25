import { IImageDelete } from '../../../images/dto/image-delete.dto';
import { IImageUpload } from '../../../images/dto/image-upload.dto';

export interface IImageEvent {
  save(data: IImageUpload): Promise<void>;
  delete(data: IImageDelete): Promise<void>;
}
