import fs from 'fs'

export function openLogFile(path: string): string {
  if (fs.existsSync(path)) {
    return fs.readFileSync(path, 'utf8')
  } else {
    throw new Error(`File ${path} does not exist`)
  }
}

export function removeTimestampFromLog(text: string): string {
  return text.replace(/^\s*\d{1,2}:\d{2}\s*/, '')
}

