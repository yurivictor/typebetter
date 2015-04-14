var TypeBetter = TypeBetter || {};

TypeBetter = {

  input: '',
  newValue: '',
  deletions: [],
  deletedChars: {},

  init: function(input) {
    // Set input field
    this.input = input;
    // Add events
    this.bindUIActions();
  },

  bindUIActions: function() {
    // Check every input
    if (this.input.addEventListener) {
      var actions = ['propertychange', 'change', 'input', 'paste'];

      for (var i = 0, j = actions.length; i < j; i++) {
        this.input.addEventListener(actions[i], this.handleQuotes, false);
      }
    }
    // Check for deletions
    this.input.onkeydown = function(event) {
      var key = event.keyCode || event.charCode;
      if ( key == 8 || key == 46 ) {
        TypeBetter.handleDeletions();
      }
    };
  },

  handleDeletions: function() {
    var deletedSpot = TypeBetter.input.selectionStart - 1,
        deletedChar = TypeBetter.newValue[deletedSpot];
    switch (deletedChar) {
      case '\u201c':
      case '\u201d':
      case '\u2018':
      case '\u2019':
      case '\u2032':
      case '\u2033':
      case '\u2034':
        if (TypeBetter.deletions.indexOf(deletedSpot) <= -1) {
          TypeBetter.deletions.push(deletedSpot);
        }
        return true;
        break;
      default:
        return false;
    }
  },

  handleQuotes: function() {
    // get current cursor position
    var start     = this.selectionStart,
        end       = this.selectionEnd,
        tempValue = TypeBetter.input.value;
    // // Bail if this is a deleted spot
    // if (TypeBetter.deletions.indexOf(start - 1) > -1) {
    //   return false;
    // }
    // Create array of deleted characters
    if (TypeBetter.deletions.length > 0) {
      // Loop through position of deleted characters
      for (i = 0; i < TypeBetter.deletions.length; i++) {
        var tempPosition = TypeBetter.deletions[i];
        // Add chars to array
        TypeBetter.deletedChars[i] = {"tempPosition": tempPosition, "tempChar": tempValue[tempPosition]};
        // Remove characters from input string
        tempValue = tempValue.substring(0, tempPosition) + tempValue.substring(tempPosition + 1, tempValue.length);
      }
    }
    // Replaces input field type with better type
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
    // Readd deleted characters
    if (TypeBetter.deletions.length > 0) {
      // Update deleted character positions

      // Loop through deleted characters
      for (var key in TypeBetter.deletedChars) {
        var deletions = TypeBetter.deletedChars[key]
        TypeBetter.newValue = [TypeBetter.newValue.slice(0, deletions.tempPosition), deletions.tempChar, TypeBetter.newValue.slice(deletions.tempPosition)].join('');
      }
    }
    // Replace headline
    TypeBetter.input.value = TypeBetter.newValue;
    // Restore cursor position
    this.setSelectionRange(start, end);
  }

};
