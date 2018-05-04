import express from 'express'
import actionModel from './data/helpers/actionModel'
import projectModel from './data/helpers/projectModel'

const app = express()

const readAll = database => {
  return (req, res) => {
    try {
      const document = database.get()
      if (document) {
        res.status(200).send(document)
      } else {
        res.status(404).send()
      }
    } catch (err) {
      next(err)
    }
  }  
}

app.get('/', )

// Catch-all error handler
app.use((err, req, res, next) => {
  // Defer to default handler if response is partially built
  if (res.headersSent) {
    return next(err)
  }
  res.status(500)
  res.render('error', { error: err })
})

app.listen(5000, console.log('Listening on port 5000'))