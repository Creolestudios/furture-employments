import { Injectable } from '@nestjs/common';
import { getError } from '../../utils/errors/errors';
import { getFileUrl } from '../../utils/upload';

@Injectable()
export class FileService {
  constructor() {}

  async getDownloadFileUrl(fileName: string) {
    try {
      const url = getFileUrl(fileName);

      return { url, fileName };
    } catch (error) {
      throw getError(error);
    }
  }
}
