import * as fs from 'fs';
import * as csv from 'csv-parser';

export async function parseCsv(filePath: string): Promise<any[]> {
  const results = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
}
