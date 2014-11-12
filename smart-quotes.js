var VOX = VOX || {};

VOX.Quotes = ( function ( $ ) {

  var headline = $( '#headline' );
  var selectedText,
      headlineStart,
      headlineLength,
      headlineEnd,
      range;

  var handleQuotes = function ( event ) {
    var headline = $( this );
    // reworked from smartquotes.js
    // https://github.com/kellym/smartquotesjs/blob/master/src/smartquotes.js
    var new_value = headline.val()
      .replace(/(\W|^)"/g, '$1\u201c')                                             // beginning "
      .replace(/(\u201c[^"]*)"([^"]*$|[^\u201c"]*\u201c)/g, '$1\u201d$2')          // ending "
      .replace(/([^0-9])"/g,'$1\u201d')                                            // remaining " at end of word
      .replace(/(\W|^)'(\S)/g, '$1\u2018')                                         // beginning '
      .replace(/(\W|^)\u2032(\S)/g,'$1\u2018$2')                                   // beginning '
      .replace(/(\W|^)\u2019(\S)/g,'$1\u2018$2')                                   // beginning '
      .replace(/([a-z])'([a-z])/ig, '$1\u2019$2')                                  // conjunction's possession
      .replace(/((\u2018[^']*)|[a-z])'([^0-9]|$)/ig, '$1\u2019$3')                 // ending '
      .replace(/(\u2018)([0-9]{2}[^\u2019]*)(\u2018([^0-9]|$)|$|\u2019[a-z])/ig, '\u2019$2$3')     // abbrev. years like '93
      .replace(/(\B|^)\u2018(?=([^\u2019]*\u2019\b)*([^\u2019\u2018]*\W[\u2019\u2018]\b|[^\u2019\u2018]*$))/ig, '$1\u2019') // backwards apostrophe
      .replace(/'''/g, '\u2034')                                                   // triple prime
      .replace(/("|'')/g, '\u2033')                                                // double prime
      .replace(/("|'')/g, '\u2033')                                                // double prime
      // .replace(/(\W|^)\u2019(\d+)/g,'$1\u2032$2')                                  // prime
      .replace(/'/g, '\u2032')                                                 // prime
      .replace(/\u2013\u2013|--/g, ' \u2014 '); // mdash
    headline.val( new_value );
  };

  var addQuoteSelector = function ( event ) {
    // Get selected text
    selectedText = window.getSelection();
    range = selectedText.getRangeAt( 0 );
    selectedTextString = selectedText.toString();
    headlineStart = headline[0].selectionStart;
    headlineEnd = headline[0].selectionEnd;
    headlineLength = headline[0].length;
    selectionLength = selectedTextString.length;
    // if selected text is just one character
    // for now
    // build in better popup reasons in the future
    if ( selectionLength == 1 ) {
      $( '#popup-quote' ).show();
    }
  };

  var removeQuoteSelector = function ( event ) {
    $( '#popup-quote' ).hide();
  };

  var addQuote = function ( event ) {
    removeQuoteSelector();
    var newQuote = $( this ).html();
    headline.val( headline.val().substring( 0, headlineStart ) + newQuote + headline.val().substring( headlineEnd, headlineLength ) );
  };

  var addEvents = function () {
    headline.bind( 'propertychange change input paste', handleQuotes );
    headline.bind( 'select', addQuoteSelector );
    $( '#popup-quote div' ).on( 'click', addQuote );
  };

  var init = function () {
    addEvents();
  }

  init();

} )( jQuery );
