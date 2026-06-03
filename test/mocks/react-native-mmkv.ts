const store: Record<string, string> = {};

export class MMKV {
  set = jest.fn((key: string, value: string) => {
    store[key] = String(value);
  });
  getString = jest.fn((key: string) => store[key]);
  getNumber = jest.fn((key: string) =>
    store[key] !== undefined ? Number(store[key]) : undefined,
  );
  getBoolean = jest.fn((key: string) =>
    store[key] !== undefined ? store[key] === 'true' : undefined,
  );
  delete = jest.fn((key: string) => {
    delete store[key];
  });
  contains = jest.fn((key: string) => key in store);
  getAllKeys = jest.fn(() => Object.keys(store));
  clearAll = jest.fn(() => {
    Object.keys(store).forEach(k => delete store[k]);
  });
}
