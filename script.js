const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Global varialble API unecessary for 'LocalQuotes'  
let apiQuotes = [];


function showLoadingSpinner() {
    quoteContainer.hidden = true;
    loader.hidden = false;
}

function removeLoadingSpinner() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Show New Quote
function newQuote() {
    showLoadingSpinner();
    // Pick a random quote from apiQuotes array - Math Floor returns the largest interger less than or equal to a given number
    // Change 'apiQuotes' to 'localQuotes' for LocalQuotes
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if Author field is blank and replace with 'Unknown'
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    // Check Quote length to determine styling.  'classList.add' adds a CSS class.
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    removeLoadingSpinner();
}

// Get Quotes from API - If using LocalQuotes you can comment out this function
async function getQuotes() {
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote()
// If theres an error call the function again at the bottom (recursive function)
     } catch (error) {
        getQuote();
    }
}

// Tweet Quote - use `` and ? indicates a query perameter
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes(); 
// For LocalQuotes use 'newQuote();' on load instead
// newQuote();
