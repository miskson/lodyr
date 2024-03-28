const exp = require('constants');
const express = require('express')
const path = require('path')
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));


const app = express()
const PORT = process.env.PORT || 3500

app.set('view engine', 'ejs');

app.use(express.static('public'))
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
app.use("/", require('./routes/root'))

app.post("/convert-mp3", async (req, res) => {
    const videoId = req.body.videoId
    if (!videoId) {
        console.log('no video id')
        return res.render('index', { success: false, message: 'Input youtube link' })
    }
    console.log(videoId, path.join(__dirname, 'views'))
})


// app.get('/', (req, res) => res.send('Hello World!'))
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))