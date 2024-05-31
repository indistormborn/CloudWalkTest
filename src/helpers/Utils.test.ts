import path from 'path';
import { openLogFile, removeTimestampFromLog, saveJSON, saveText } from './Utils';
import { readFileSync, unlinkSync } from 'fs';

describe('Utils', () => {
  describe('openLogFile', () => {
    it('if file exists, return file content', () => {
      const result = openLogFile(path.resolve(__dirname, '../../data/games_log.log'));
      expect(typeof result).toBe('string');
    });

    it('if file does not exists, throws error', () => {
      expect(() => openLogFile('not_a_file')).toThrow('File not_a_file does not exist');
    });
  });

  describe('saveJSON', () => {
    afterEach(() => {
      unlinkSync('test.json');
    });

    it('should save data to a file', () => {
      const data = { name: 'test', age: 20 };
      saveJSON(data, 'test.json');
      expect(readFileSync('test.json', 'utf8')).toEqual(JSON.stringify(data));
    });

    it('if path does not include .json, should add .json', () => {
      const data = { name: 'test', age: 20 };
      saveJSON(data, 'test');
      expect(readFileSync('test.json', 'utf8')).toEqual(JSON.stringify(data));
    });
  });

  describe('saveText', () => {
    afterEach(() => {
      unlinkSync('test.txt');
    });

    it('should save text to a file', () => {
      const text = 'Hello, world!';
      saveText(text, 'test.txt');
      expect(readFileSync('test.txt', 'utf8')).toEqual(text);
    });

    it('if path does not include .txt, should add .txt', () => {
      const text = 'Hello, world!';
      saveText(text, 'test');
      expect(readFileSync('test.txt', 'utf8')).toEqual(text);
    });
  });

  describe('removeTimestampFromLog', () => {
    it('should remove timestamp from log', () => {
      const log = '21:42 Kill: 1022 2 22: <world> killed Isgalamido by MOD_TRIGGER_HURT';
      const result = removeTimestampFromLog(log);
      expect(result).toEqual('Kill: 1022 2 22: <world> killed Isgalamido by MOD_TRIGGER_HURT');
    });
  });
});
