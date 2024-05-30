import { existsSync, readFileSync, writeFileSync } from 'fs';

export function openLogFile(path: string): string {
  if (existsSync(path)) {
    return readFileSync(path, 'utf8');
  } else {
    throw new Error(`File ${path} does not exist`);
  }
}

export function saveJSON<T>(json: T, path: string): void {
  if (!path.endsWith('.json')) path = path + '.json';
  return writeFileSync(path, JSON.stringify(json), { encoding: 'utf-8' });
}

export function saveText(text: string, path: string): void {
  if (!path.endsWith('.txt')) path = path + '.txt';
  return writeFileSync(path, text, { encoding: 'utf-8' });
}

export function removeTimestampFromLog(text: string): string {
  return text.replace(/^\s*\d{1,2}:\d{2}\s*/, '');
}
