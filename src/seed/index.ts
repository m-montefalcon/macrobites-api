/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as fs from 'fs';
import * as path from 'path';

const seedFolder = __dirname;

// Get CLI argument (optional specific seeder)
const args = process.argv.slice(2);
const specificSeeder = args[0]?.toLowerCase(); // e.g., "usersseed"

// Read all seed files
const files = fs.readdirSync(seedFolder).filter((f) => f.endsWith('.seed.ts'));

async function runSeeder(filePath: string) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const module = require(filePath) as Record<string, unknown>;
  const fnName = Object.keys(module).find((k) => k.startsWith('run'));
  if (!fnName) return;
  console.log(`🌱 Running seeder: ${fnName}`);
  await (module[fnName] as () => Promise<void>)();
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async () => {
  if (specificSeeder) {
    // Find file that matches the specific seeder name (case-insensitive)
    const match = files.find((f) => f.toLowerCase().includes(specificSeeder));
    if (!match) {
      console.error(`❌ Seeder "${specificSeeder}" not found.`);
      process.exit(1);
    }
    await runSeeder(path.join(seedFolder, match));
  } else {
    // Run all seeders in alphabetical order (timestamp first)
    files.sort();
    for (const file of files) {
      await runSeeder(path.join(seedFolder, file));
    }
  }
  console.log('✅ Seeder run finished.');
  process.exit(0);
})();
