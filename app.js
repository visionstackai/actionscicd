const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const skuRouter = require('./src/routes/sku')
const bookRouter = require('./src/routes/book')
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // limit each IP to 100 requests per windowMs
});


//  the logMiddleware function is added to the Express application using the app.use() method. This function logs the request method and URL for every incoming request, and then calls the next() function to pass control to the next middleware function in the stack. If there are no more middleware functions, the final request handler for the route is executed.
const logMiddleware = (req, res, next) => {
  console.log(`Request ${req.method} for URL ${req.url}`)
  next()
}
app.use(logMiddleware)
//  The body-parser middleware can parse the body of incoming requests and make it available in the req.body property.
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.use("/api/resources", limiter)
app.use('/test', limiter)

app.use('/api/resources', skuRouter)
app.use('/test', bookRouter)

module.exports = app
