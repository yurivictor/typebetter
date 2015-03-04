var TypeBetter = TypeBetter || {};

TypeBetter = {

  input: '',

  init: function( input ) {
    // Set input field
    this.input = input;
    // Add events
    this.bindUIActions();
  },

  bindUIActions: function() {
    if (this.input.addEventListener) {
      this.input.addEventListener('propertychange', this.handleQuotes, false);
      this.input.addEventListener('change', this.handleQuotes, false);
      this.input.addEventListener('input', this.handleQuotes, false);
      this.input.addEventListener('paste', this.handleQuotes, false);
    }
  },

  handleQuotes: function() {
    // get current cursor position
    var start = this.selectionStart,
        end   = this.selectionEnd;
    // Replaces input field type with better type
    var new_value = TypeBetter.input.value
      // beginning "
      .replace(/(\W|^)"/g, '$1\u201c')
      // ending "
      .replace(/(\u201c|"[^"]*)([^"]*)(\u201c|"[^"]*)/g, '$1$2\u201d')
      // beginning '
      .replace(/(\W|^)'|\u2019(?!\u201d|")(\S)/g, '$1\u2018$2')
      // conjunction's possession
      .replace(/([a-z])'([a-z])/ig, '$1\u2019$2')
      // ending '
      .replace(/((\u2018[^']*)|[a-z])'([^0-9]|$)/ig, '$1\u2019$3')
      // backwards apostrophe
      .replace(/(\B|^)\u2018(?=([^\u2019]*\u2019\b)*([^\u2019\u2018]*\W[\u2019\u2018]\b|[^\u2019\u2018]*$))/ig, '$1\u2019')
      // abbreviated years like '82
      .replace(/(\u2019|')([0-9]{2}[^\u2019]*)(\u2018([^0-9]|$)|$|\u2019[a-z])/ig, '\u2019$2$3')
      // triple prime
      .replace(/'''/g, '\u2034')
      // double prime
      // .replace(/("|'')/g, '\u2033')
      // prime
      .replace(/'/g, '\u2032')
      // hack for prime end quote
      .replace(/(\u2032|′)("|”|“)/g, '′”')
      // hack for apostrophe end quote
      .replace(/(\u2019|\u2018)("|”|“)/g, '’”')
      // ellipses
      .replace(/(\.\.\.)/, '\u2026')
      // mdash
      .replace(/\u2013\u2013|--/g, ' \u2014 ')
      // rock 'n' roll
      .replace(/(\u2018|')(n)(\u2019|')/gi, '’n’');
    // Replace headline
    TypeBetter.input.value = new_value;
    // Restore cursor position
    this.setSelectionRange(start, end);
  }

};
