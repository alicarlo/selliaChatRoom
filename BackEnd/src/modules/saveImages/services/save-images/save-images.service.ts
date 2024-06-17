import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class SaveImagesService {
	async saveBase64Image(base64String: string, fileName: string): Promise<string> {
    const matches = base64String.match(/^data:image\/([A-Za-z-+/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      throw new Error('Invalid base64 string');
    }

    const imageType = matches[1];
    const base64Data = matches[2];

    const filePath = `public/${fileName}.${imageType}`;
    const buffer = Buffer.from(base64Data, 'base64');

    await fs.promises.writeFile(filePath, buffer);

    return filePath;
  }
}
