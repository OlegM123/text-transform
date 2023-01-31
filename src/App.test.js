import textTransform from "./textFunction";
import { text1, text2, text3 } from './text';

test('isArray', () => {
  expect(Array.isArray(textTransform(text1))).toBe(true);
  expect(Array.isArray(textTransform(text2))).toBe(true);
  expect(Array.isArray(textTransform(text2))).toBe(true);
})

test('isStringArray', () => {
  textTransform(text1).every((item) => {
    expect(typeof (item)).toBe('string')
  })
  textTransform(text2).every((item) => {
    expect(typeof (item)).toBe('string')
  })
  textTransform(text3).every((item) => {
    expect(typeof (item)).toBe('string')
  })
})

test('arrLength', () => {
  textTransform(text1).map((item) => {
    expect(item.length).toBeLessThanOrEqual(25);
  })
  textTransform(text2).map((item) => {
    expect(item.length).toBeLessThanOrEqual(25);
  })
  textTransform(text3).map((item) => {
    expect(item.length).toBeLessThanOrEqual(25);
  })
})