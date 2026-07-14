import sharp from 'sharp';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = path.join(root, 'static', 'profile.png');
const outPng = path.join(root, 'static', 'favicon.png');
const size = 128;

const circle = Buffer.from(
	`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="white"/></svg>`
);

await sharp(src)
	.resize(size, size, { fit: 'cover', position: 'top' })
	.composite([{ input: circle, blend: 'dest-in' }])
	.png()
	.toFile(outPng);

console.log('Circular favicon written to', outPng);
