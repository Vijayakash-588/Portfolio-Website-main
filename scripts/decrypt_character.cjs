const fs = require('fs');
const crypto = require('crypto');

const encPath = 'public/models/character.enc';
const outPath = 'public/models/character.recovered.glb';
const password = 'Character3D#@';

if (!fs.existsSync(encPath)) {
  console.error('Encrypted file not found:', encPath);
  process.exit(2);
}

const enc = fs.readFileSync(encPath);
const iv = enc.slice(0, 16);
const data = enc.slice(16);
const key = crypto.createHash('sha256').update(password).digest();
const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
let out;
try {
  out = Buffer.concat([decipher.update(data), decipher.final()]);
} catch (err) {
  console.error('Decryption failed:', err.message);
  process.exit(3);
}

fs.writeFileSync(outPath, out);
console.log('Wrote recovered GLB to', outPath, '(', out.length, 'bytes )');
