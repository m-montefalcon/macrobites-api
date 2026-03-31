import * as fs from 'fs';
import * as path from 'path';

// Get the seeder name from CLI arguments
const args = process.argv.slice(2);
if (!args[0]) {
  console.error('❌ Seeder name is required.');
  process.exit(1);
}

const seederName = args[0];

// Create timestamp prefix
const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, ''); // e.g., 20260331_144530
const fileName = `${timestamp}_${seederName}.seed.ts`;

// Seeder folder
const seedFolder = path.join(__dirname);
const filePath = path.join(seedFolder, fileName);

// Seeder template
const template = `import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';

export async function run${seederName}() {
  const app = await NestFactory.createApplicationContext(AppModule);

  // TODO: Add your seeding logic here

  console.log('🌱 Seeder ${seederName} ran successfully.');
  await app.close();
}
`;

// Write the file
fs.writeFileSync(filePath, template);
console.log(`✅ Seeder created: ${filePath}`);
