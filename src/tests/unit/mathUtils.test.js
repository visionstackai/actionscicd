// import discount and sum from './mathUtils';

// Unit tests for the discount function

const discount = require('../../utils/mathUtils.js')
// const sum = require('../../utils/mathUtils.js')

describe('discount function', () => {
  test('discount of 10% is applied correctly to positive numbers', () => {
    expect(discount(100)).toBe(90)
  })

  test('throws an error if the input is not a number', () => {
    expect(() => discount('foo')).toThrow('Invalid input: price must be a positive number')
  })

  test('throws an error if the input is zero', () => {
    expect(() => discount(0)).toThrow('Invalid input: price must be a positive number')
  })

  test('throws an error if the input is negative', () => {
    expect(() => discount(-100)).toThrow('Invalid input: price must be a positive number')
  })
})
