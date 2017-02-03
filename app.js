/*******************************************
STEP 1 - defining all the functions
********************************************/

function getAverageWordsPerSentence(text) {
    // get num sentences by splitting on ending punctuation
    // note that this is a naive approach and doesn't account
    // for things like "Mrs. Smith"
    //details and definition: https://en.wikipedia.org/wiki/Regular_expression
 //usage http://regexr.com/
    var numSentences = text.match(/[.!?]+/g) ? text.match(/[.!?]+/g).length : 1;
    var wordCount = tokenizeText(text).length;
    return (wordCount / numSentences).toFixed(2);
}

function getAverageWordLength(tokens) {
    // join all tokens together to create one big string
    // then divide that total length by the number
    // of tokens to get average
    var totalLength = tokens.join("").length;
    return (totalLength / tokens.length).toFixed(2);
}

function countDistinctWords(tokens) {
    // one way to solve this problem is by using a Set object
    // (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
    // as in the commented out lines below. we haven't covered sets in this
    // course, so we implement a different approach
    //
    //   var distinctWords = new Set(tokens);
    //   return distinctWords.size;

    // instead of using a set, we'll create an empty array of distinct words.
    // then we'll iterate over our tokens and check to see if the token is already
    // in distinct words. if it is we do nothing, if it's not we add it to our
    // list of distinct words
    var distinctWords = [];
    //loop throught the array of tokens ...
    for (var i = 0; i < tokens.length; i++) {
        //if the current word we are looping throught, is not already in the distinctWords words ...
        if (distinctWords.indexOf(tokens[i]) === -1) {
            //we will be pushing it into it ...
            distinctWords.push(tokens[i]);
        }
    }
    //return the lenght of the distinctWords
    return distinctWords.length;
}

// this is a naive implementation of text tokenization
// https://en.wikipedia.org/wiki/Tokenization_(lexical_analysis).
// the goal is to standardize some of the differences between
// words in a text by converting all to lowercase, removing punctuation
// etc., so that, for instance, the "there" in 'high there.' and "high ThErE "
// would both be converted into the same value ("there")
function tokenizeText(text) {
    //matching evertying that is not matching spaces, tabs or line ends
    return text.toLowerCase().match(/\b[^\s]+\b/g).sort();
}


function removeReturns(text) {
    return text.replace(/\r?\n|\r/g, "");
}



// generate and display analytics on text

function reportOnText(text) {
    // tokenize our text then compute our data points

    var tokens = tokenizeText(text);
    var numDistinctWords = countDistinctWords(tokens);
    var numTotalWords = tokens.length;
    var averageWordLength = getAverageWordLength(tokens);
    var averageWordsPerSentence = getAverageWordsPerSentence(text);

    // take our data and display it in the dom
    var textReport = $('.js-text-report');
    textReport.find('.js-word-count').text(numTotalWords);
    textReport.find('.js-unique-word-count').text(numDistinctWords);
    textReport.find('.js-avg-word-length').text(
        averageWordLength + " characters");
    textReport.find('.js-avg-sentence-length').text(
        averageWordsPerSentence + " words");
    textReport.removeClass('hidden');
}

/*******************************************
STEP 2 - using all the functions
********************************************/

// equivalent to `$(document).ready(function() {...})`
$(document).ready(function () {
    $('.js-text-to-analyze').submit(function (event) {
        event.preventDefault();
        // get the text the user submitted
        var userText = $(this).find('#user-text').val();
        reportOnText(removeReturns(userText));
    });
});
