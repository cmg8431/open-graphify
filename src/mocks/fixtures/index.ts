import * as fs from 'fs';
import path from 'path';

const fixturesDirPath = path.join(__dirname, './');

export const exampleHTML = fs.readFileSync(
  path.join(fixturesDirPath, 'example.html'),
  'utf-8',
);
