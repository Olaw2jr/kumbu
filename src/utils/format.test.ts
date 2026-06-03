import {formatTime, formatTimerMs, formatDuration, padCount} from './format';

describe('formatTime', () => {
  it('formats 0 seconds as 00:00', () => {
    expect(formatTime(0)).toBe('00:00');
  });

  it('formats 78 seconds as 01:18', () => {
    expect(formatTime(78)).toBe('01:18');
  });

  it('formats 204 seconds as 03:24', () => {
    expect(formatTime(204)).toBe('03:24');
  });
});

describe('formatTimerMs', () => {
  it('formats 4000ms as 00:04.00', () => {
    const result = formatTimerMs(4000);
    expect(result).toEqual({mm: '00', ss: '04', cs: '00'});
  });

  it('formats 23410ms as 00:23.41', () => {
    const result = formatTimerMs(23410);
    expect(result).toEqual({mm: '00', ss: '23', cs: '41'});
  });

  it('formats 65000ms as 01:05.00', () => {
    const result = formatTimerMs(65000);
    expect(result).toEqual({mm: '01', ss: '05', cs: '00'});
  });
});

describe('formatDuration', () => {
  it('formats 204 seconds as 03:24', () => {
    expect(formatDuration(204)).toBe('03:24');
  });
});

describe('padCount', () => {
  it('pads single digit with zero', () => {
    expect(padCount(7)).toBe('07');
  });

  it('does not pad double digit', () => {
    expect(padCount(18)).toBe('18');
  });
});
