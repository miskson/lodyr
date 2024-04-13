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


const fetchVideoToMp3 = async (videoId) => {
    const fetchAPI = await fetch(`https://youtube-mp36.p.rapidapi.com/dl?id=${videoId}`, {
        "method": "GET",
        "headers": {
            'X-RapidAPI-Key': process.env.API_KEY,
            'X-RapidAPI-Host': process.env.API_HOST,
        }
    })

    const fetchResponce = await fetchAPI.json()
    // console.log('!!!fetchResponce \n', fetchResponce)
    return fetchResponce;
}

const convertVideoToMP3 = async (videoId, retryCount = 30) => {
    let fetchResponce = await fetchVideoToMp3(videoId);

    while (fetchResponce.status === 'processing' && retryCount > 0) {
        await new Promise(resolve => setTimeout(resolve, 1000))
        fetchResponce = await fetchVideoToMp3(videoId);
        retryCount--;
    }
    return fetchResponce
}

app.post("/convert-mp3", async (req, res) => {
    try {
        const videoUrl = req.body.videoUrl
        const rexp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/gm;

        if (!videoUrl || !videoUrl.match(rexp)) {
            return res.render('index', { success: false, message: 'Invalid input. Please input YouTube video url' })
        }

        const videoId = videoUrl.match(rexp)[0].slice(-11);

        const fetchResponce = await convertVideoToMP3(videoId)

        if (fetchResponce.status === 'ok') {
            renderResponce(fetchResponce, res)
        } else {
            return res.render('index', { success: false, message: fetchResponce?.msg || fetchResponce?.messages })
        }
    } catch (err) {
        if (!res.headersSent) {
            return res.sendStatus(500).send('Whoops...Internal Server Error occured. Reload page and try again, please.')
        }
    }
})

function renderResponce(fetchResponce, res) {
    const size = ['Bytes', 'KB', 'MB', 'GB'];
    formatBytes = (bytes) => {
        if (bytes === 0) return '0 Bytes';

        const unitIndex = Math.floor(Math.log(bytes) / Math.log(1000));// 1000 base unit
        const formattedBytes = (bytes / 1000 ** unitIndex).toFixed(2);// 2 decimal

        return `${formattedBytes} ${size[unitIndex]}`;
    };

    formatSeconds = (seconds) => {
        const min = Math.floor(seconds / 60);
        const sec = Math.round(seconds - min * 60)
        return `${min} : ${sec >= 10 ? sec : '0' + sec}`
    }

    return res.render('index', {
        success: true,
        song_title: fetchResponce?.title,
        song_duration: formatSeconds(fetchResponce?.duration),
        song_size: formatBytes(fetchResponce?.filesize),
        song_link: fetchResponce?.link
    })
}


app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))