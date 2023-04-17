// Define a discount function
function discount (price) {
  if (typeof price !== 'number' || price <= 0) {
    throw new Error('Invalid input: price must be a positive number')
  }

  return price * 0.9
}

// Export the discount function

/*
function sum(a, b) {
    return a + b;
  }
*/

module.exports = discount
