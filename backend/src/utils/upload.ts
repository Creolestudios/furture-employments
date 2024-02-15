import * as fs from 'fs';
import * as path from 'path';
import { FileUpload } from 'graphql-upload';

export const fileUpload = async (file) => {
  const { createReadStream } = file;

  const stream = createReadStream();
  const chunks = [];

  const buffer = new Promise<Buffer>((resolve, reject) => {
    let buffer: Buffer;

    stream.on('data', function (chunk) {
      chunks.push(chunk);
    });
    stream.on('error', reject);
    stream.on('end', function () {
      buffer = Buffer.concat(chunks);
      resolve(buffer);
    });

    buffer = Buffer.concat(chunks);
  });
  return buffer;
};

export const fileWrite = (
  dirPath: string,
  file: any,
  Dir: string,
  fileBuffer: Buffer,
  FilePath: string,
): any => {
  if (!fs.existsSync(Dir)) {
    fs.mkdirSync(Dir, { recursive: true });
  }

  fs.writeFileSync(
    dirPath + FilePath + path.extname(file.filename),
    fileBuffer,
  );
};

export const writeFile = (
  dirPath: string,
  file: FileUpload,
  fileBuffer: Buffer,
): any => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  fs.writeFileSync(`${dirPath}/${file.filename}`, fileBuffer);
};

export const validateFileFormat = (
  fileName: string,
  allowedFileFormats: string[],
) => {
  const fileParts = fileName.split('.');
  const extension = fileParts[fileParts.length - 1];

  return allowedFileFormats.includes(extension);
};

export const validateFileSize = async (
  fileStream: fs.ReadStream,
  allowedFileSizeInBytes: number,
) => {
  return new Promise((resolve, reject) => {
    let fileSizeInBytes = 0;

    fileStream
      .on('data', (data: Buffer) => {
        fileSizeInBytes += data.byteLength;
      })
      .on('end', () => {
        resolve(fileSizeInBytes <= allowedFileSizeInBytes);
      })
      .on('error', (err) => {
        reject(err);
      });
  });
};

export const getFileUrl = (fileName: string) =>
  `${process.env.SERVER_URL}/public/files/${fileName}`;
