const express = require('express')
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
require("dotenv").config();

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
        return res.render('index', { success: false, message: 'Input youtube link' })
    }

    const fetchAPI = await fetch(`https://youtube-mp36.p.rapidapi.com/dl?id=${videoId}`, {
        "method": "GET",
        "headers": {
            'X-RapidAPI-Key': process.env.API_KEY,
            'X-RapidAPI-Host': process.env.API_HOST,
        }
    })

    const fetchResponce = await fetchAPI.json()

    if (fetchResponce.status === "ok") {
        return res.render('index', { success: true, song_title: fetchResponce?.title, song_link: fetchResponce?.link })
    }
    return res.render('index', { success: false, message: fetchResponce?.msg || fetchResponce?.messages })
})


app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))