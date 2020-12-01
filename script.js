const button = document.querySelector('#button');
const quoteText = document.querySelector('#quote-text');
const loader = document.querySelector('#loader');

let tts = window.speechSynthesis;

let toSpeak = new SpeechSynthesisUtterance();
toSpeak['voiceURI'] = 'Google US English';
toSpeak['localService'] = true;
toSpeak.lang = 'en-US';

let textToSpeak = '';
quoteText.hidden = true;
button.disabled = true;

getQuote();

//get quote from API
async function getQuote() {
	const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
	const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

	try {
		const response = await fetch(proxyUrl + apiUrl);
		const data = await response.json();
		let author = '';

		//If author is blank add unknown
		if (data.quoteAuthor === '') {
			author = 'Unknown';
		} else {
			author = data.quoteAuthor;
		}

		textToSpeak = `${data.quoteText}   
		Author: ${author}`; //to speak

		loader.style.display = 'none';
		button.disabled = false;
	} catch (error) {
		getQuote();
	}
}

//btn click
button.addEventListener('click', () => {
	if (textToSpeak !== '') {
		toSpeak.text = textToSpeak;

		tts.speak(toSpeak);
		quoteText.innerText = textToSpeak;
		quoteText.hidden = false;
		button.disabled = true;
	}
});

//reading beginning
//toSpeak.addEventListener('start', () => {});

//reading finished
toSpeak.addEventListener('end', () => {
	getQuote();
	quoteText.hidden = true;
	loader.style.display = 'flex';
});
