import { Injectable, PipeTransform } from '@nestjs/common';
import { ReadStream } from 'fs';
import { validateFileFormat, validateFileSize } from '../upload';
import { GqlBadRequestErrorException } from '../errors/errors';
import {
  ALLOWED_FILE_FORMATS,
  ALLOWED_FILE_SIZE,
  ERROR_MSG,
} from '../constants';

@Injectable()
export class FileValidationPipe implements PipeTransform {
  async transform(value: any) {
    if (value && value.filename) {
      const { filename, createReadStream } = value;
      const fileStream = createReadStream() as ReadStream;

      const isFileFormatValid = validateFileFormat(
        filename,
        ALLOWED_FILE_FORMATS,
      );

      if (!isFileFormatValid) {
        throw GqlBadRequestErrorException(ERROR_MSG.INVALID_FILE_FORMAT);
      }
      const isFileSizeValid = validateFileSize(fileStream, ALLOWED_FILE_SIZE);

      if (!isFileSizeValid) {
        throw GqlBadRequestErrorException(ERROR_MSG.INVALID_FILE_SIZE);
      }
    }

    return value;
  }
}
