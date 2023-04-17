// require("dotenv").config();

// console.log(`Your port is ${process.env.NODE_ENV}`);
const pool = require('../configs/db.config')

// connect to database
pool.connect()

// console.log(client);

// import discount from utils/mathUtils.js

const discount = require('../utils/mathUtils.js')
// const sumValues = require('../utils/sumUtils.js')

// Create a new record
exports.insertSku = (req, res) => {
  console.log(req.body)
  const data = req.body
  pool.query('INSERT INTO sku (sku, retailprice) VALUES($1, $2)',
    [data.sku, data.retailprice], (err, result) => {
      if (err) {
        res.status(500).send('Error inserting data')
        return
      }

      if (result){
        res.send('Data inserted successfully')
      }

      
    })
}

// Get all records
exports.getallSkus = (req, res) => {
  console.log(req.body)
  pool.query('SELECT * FROM sku', (err, result) => {
    if (err) {
      // console.log(err);
      // console.log(client.query('SELECT * FROM sku'))
      res.status(500).send('Error fetching data')
      return
    }

    res.send(result.rows)
  })
}

// Read a single record
exports.getSku = (req, res) => {
  // console.log(req.params)
  const sku = req.params.sku
  // console.log(sku);
  pool.query('SELECT * FROM sku WHERE sku=$1', [sku], (err, result) => {
    if (err) {
      res.status(500).send('Error fetching data')
      return
    }
    const originalPrice = result.rows[0].retailprice

    // Calculate the discounted price
    const discountedPrice = discount(originalPrice)

    // const sumTotal = sumValues(originalPrice, discountedPrice)

    res.json({
      sku,
      retailprice: result.rows[0].retailprice,
      discountedprice: discountedPrice
    })
  })
}

// Update a record
exports.updateSku = (req, res) => {
  const sku = req.params.sku
  const data = req.body
  // console.log(sku);
  // console.log(data);
  pool.query('UPDATE sku SET retailprice=$1 WHERE sku=$2',
    [data.retailprice, sku], (err, result) => {
      if (err) {
        res.status(500).send('Error updating data')
        return
      }
      if (result){
        res.send('Data updated successfully')
      }
    })
}

// Delete a record
exports.deleteSku = (req, res) => {
  const sku = req.params.sku
  pool.query('DELETE FROM SKU WHERE sku=$1', [sku], (err, result) => {
    if (err) {
      res.status(500).send('Error deleting data')
      return
    }

    if (result){
      res.send('Data deleted successfully')
    }

  })
}
