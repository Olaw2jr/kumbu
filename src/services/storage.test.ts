import {getJSON, setJSON, storage} from './storage';

describe('StorageService', () => {
  beforeEach(() => {
    storage.clearAll();
  });

  it('returns undefined for missing keys', () => {
    expect(getJSON('nonexistent')).toBeUndefined();
  });

  it('stores and retrieves JSON objects', () => {
    const data = {name: 'test', value: 42};
    setJSON('test-key', data);
    expect(getJSON('test-key')).toEqual(data);
  });

  it('stores and retrieves arrays', () => {
    const arr = [1, 2, 3];
    setJSON('arr-key', arr);
    expect(getJSON('arr-key')).toEqual(arr);
  });

  it('overwrites existing values', () => {
    setJSON('key', {a: 1});
    setJSON('key', {a: 2});
    expect(getJSON('key')).toEqual({a: 2});
  });

  it('handles invalid JSON gracefully', () => {
    storage.set('bad-json', 'not valid json{');
    expect(getJSON('bad-json')).toBeUndefined();
  });
});
