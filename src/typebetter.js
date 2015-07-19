var TypeBetter = TypeBetter || {};

TypeBetter = {

  input: '',
  newValue: '',
  characters: [],
  deletions: [],
  deletedChars: {},
  betterType: ['\u201c', '\u201d', '\u2018', '\u2019', '\u2032', '\u2033', '\u2034'],
  dumbType: ['\"', "\'", '-', '.'],


  init: function(input) {
    // Set input field
    this.input = input;
    // Add events
    this.bindUIActions();
  },

  settings: {
    on: true || localStorage.getItem('typebetter-on')
  },

  bindUIActions: function() {
    // Check for on off
    this.input.onkeyup = function(e) { TypeBetter.toggleType(e) };
    // Check every input
    if (this.input.addEventListener) {
      var actions = ['propertychange', 'change', 'input', 'paste'];

      for (var i = 0, j = actions.length; i < j; i++) {
        this.input.addEventListener(actions[i], this.handleType, false);
      }
    }
  },

  toggleType: function(e) {
    // If control and single quote are pressed together
    // toggle typebetter on and off
    if (e.which == '222' && e.ctrlKey == true) {
      TypeBetter.settings.on = ! TypeBetter.settings.on;
      // Save this update to localStorage
      localStorage.setItem("typebetter-on", TypeBetter.settings.on);
    }
  },

  handleType: function() {
    // Don't do anything if typebetter is turned off
    if ( ! TypeBetter.settings.on ) {
      return false;
    }
    // get current cursor position
    var start     = this.selectionStart,
        end       = this.selectionEnd,
        tempValue = TypeBetter.input.value;

    TypeBetter.newValue = tempValue
      // beginning "
      .replace(/(\W|^)"/g, '$1\u201c')
      // ending "
      .replace(/(\u201c|"[^"]*)([^"]*)(\u201c|"[^"]*)/g, '$1$2\u201d')
      // beginning '
      .replace(/(\W|^)'(\S)/g, '$1\u2018$2')
      .replace(/(\W|^)\u2032(\S)/g,'$1\u2018$2')
      .replace(/(\W|^)\u2019(\S)/g,'$1\u2018$2')
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
      .replace(/("|'')/g, '\u2033')
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
      .replace(/(\s)(\u2018|')(n)(\u2019|')(\s)/gi, ' ’n’ ');

    // Replace headline
    TypeBetter.input.value = TypeBetter.newValue;
    // Restore cursor position
    this.setSelectionRange(start, end);
  }

};
