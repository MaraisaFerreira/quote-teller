const button = document.querySelector('#button');
const quoteText = document.querySelector('#quote-text');

let tts = window.speechSynthesis;
let textToSpeak = '';

button.addEventListener('click', () => {
	let toSpeak = new SpeechSynthesisUtterance();
	toSpeak['voiceURI'] = 'Google US English';
	toSpeak['localService'] = true;
	toSpeak.lang = 'en-US';
	getQuote();

	toSpeak.text = textToSpeak; //todo
	console.log(toSpeak);

	tts.speak(toSpeak);
});

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

		//Reduce font size for long quotes //todo on css
		if (data.quoteText.length > 120) {
			quoteText.classList.add('long-quote');
		} else {
			quoteText.classList.remove('long-quote');
		}

		quoteText.innerText = data.quoteText;
		textToSpeak = data.quoteText;
	} catch (error) {
		getQuote();
	}
}
