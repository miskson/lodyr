const express = require('express')
const app = express()
const PORT = process.env.PORT || 3500

app.use("/", require('./routes/root'))

// app.get('/', (req, res) => res.send('Hello World!'))
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))