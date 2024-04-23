# Lodyr: simple YT to MP3 converter
 
## Lodyr is an app that convert YouTube videos to MP3 format using dedicated API and returns link for the converted file download. 

This project is an example full-stack project that demonstrates usage of node and express.js possibilities AND also my attempt to create my own YT to mp3 converter for personal usage without any annoying ads and simple interface. The app logic is simple as that:

* User input link for preferred video to be converted to .mp3 format(video must not exceed 10min. length)

* After pressing 'Convert' button the app:
	* Trims YT link to extract video ID.
	*  Makes API request to convert video form ID extracted.
	*  Returns download link to new .mp3 file OR displays according  error if something went wrong.

## How to install and use:

To use Lodyr you need to have NodeJS and npm installed on your computer (https://nodejs.org/en/download). After that:

1. Clone this project.

2. Install all needed dependencies. Go to the folder where you've cloned this project and execute `npm install` command in your terminal or cmd.

3. Get API keys to use the converting feature of app . Go to https://rapidapi.com/ytjar/api/youtube-mp36/ and sign in.
 
4. Look to the right side of your screen where you will see `Code Snippets` tab. There you need to copy two values from `headers` object: `X-RapidAPI-Key` and `X-RapidApi-Host`.

5. Go to the root folder of lodyr and create `.env` file. 
	* Inside the `.env` file write two lines of code `API_KEY=` and `API_HOST=` (new line each). 
	* After `=` of `API_KEY` line paste your copied `X-RapidAPI-Key` value.
	* After `=` of `API_HOST` line paste your copied `X-RapidAPI-Host` value.
	* Save and close the file.

6. Start the project.  Type `npm run dev` in your cmd or terminal window and hit enter.

7. The app is running on your http://localhost:3500 port now.

8. Paste the link of YouTube video you want to convert to .mp3 and press 'Convert' button.

### Feel free to use and write down any issues if spotted :)