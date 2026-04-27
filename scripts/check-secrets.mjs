import { readdir, readFile } from 'node:fs/promises';
import { extname, join, relative } from 'node:path';

const ROOT = process.cwd();
const IGNORED_DIRS = new Set([
  '.git',
  '.idea',
  '.vscode',
  'dist',
  'node_modules',
]);
const IGNORED_FILES = new Set([
  'package-lock.json',
]);
const TEXT_EXTENSIONS = new Set([
  '',
  '.css',
  '.html',
  '.js',
  '.json',
  '.md',
  '.mjs',
  '.svg',
  '.ts',
  '.tsx',
  '.txt',
]);

const secretPatterns = [
  {
    name: 'private key block',
    pattern: /-----BEGIN (?:RSA |OPENSSH |EC |DSA )?PRIVATE KEY-----/,
  },
  {
    name: 'long secret assignment',
    pattern: /\b(?:api[_-]?key|secret|token|password|private[_-]?key)\b\s*[:=]\s*["']?[A-Za-z0-9_./+=-]{24,}/i,
  },
  {
    name: 'Bearer token',
    pattern: /\bBearer\s+[A-Za-z0-9_./+=-]{24,}/i,
  },
];

const isEnvFile = (fileName) => fileName === '.env' || fileName.startsWith('.env.');
const isSafeEnvReference = (line) => /\b(?:import\.meta\.env|process\.env)\b/.test(line);

async function* walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!IGNORED_DIRS.has(entry.name)) {
        yield* walk(join(directory, entry.name));
      }
      continue;
    }

    if (entry.isFile()) {
      yield join(directory, entry.name);
    }
  }
}

const findings = [];

for await (const filePath of walk(ROOT)) {
  const fileName = filePath.split(/[\\/]/).at(-1) ?? '';
  const relativePath = relative(ROOT, filePath).replaceAll('\\', '/');

  if (
    IGNORED_FILES.has(fileName) ||
    isEnvFile(fileName) ||
    !TEXT_EXTENSIONS.has(extname(fileName))
  ) {
    continue;
  }

  const content = await readFile(filePath, 'utf8');
  const lines = content.split(/\r?\n/);

  lines.forEach((line, index) => {
    if (isSafeEnvReference(line)) {
      return;
    }

    for (const { name, pattern } of secretPatterns) {
      if (pattern.test(line)) {
        findings.push(`${relativePath}:${index + 1} (${name})`);
      }
    }
  });
}

if (findings.length > 0) {
  console.error('Potential secrets found. Values are intentionally hidden:');
  findings.forEach((finding) => console.error(`- ${finding}`));
  process.exitCode = 1;
} else {
  console.log('No obvious committed secrets found.');
}
