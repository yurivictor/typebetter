var TypeBetter = TypeBetter || {};

TypeBetter = {
  input: "",
  init: function(input) {
    this.input = input;
    this.bindUIActions();
  },
  bindUIActions: function() {
    if (this.input.addEventListener) {
      var actions = [ "propertychange", "change", "input", "paste" ];
      for (var i = 0, j = actions.length; i < j; i++) {
        this.input.addEventListener(actions[i], this.handleQuotes, false);
      }
    }
  },
  handleQuotes: function() {
    var start = this.selectionStart, end = this.selectionEnd;
    var new_value = TypeBetter.input.value.replace(/(\W|^)"/g, "$1“").replace(/(\u201c|"[^"]*)([^"]*)(\u201c|"[^"]*)/g, "$1$2”").replace(/(\W|^)'(\S)/g, "$1‘$2").replace(/(\W|^)\u2032(\S)/g, "$1‘$2").replace(/(\W|^)\u2019(\S)/g, "$1‘$2").replace(/([a-z])'([a-z])/gi, "$1’$2").replace(/((\u2018[^']*)|[a-z])'([^0-9]|$)/gi, "$1’$3").replace(/(\B|^)\u2018(?=([^\u2019]*\u2019\b)*([^\u2019\u2018]*\W[\u2019\u2018]\b|[^\u2019\u2018]*$))/gi, "$1’").replace(/(\u2019|')([0-9]{2}[^\u2019]*)(\u2018([^0-9]|$)|$|\u2019[a-z])/gi, "’$2$3").replace(/'''/g, "‴").replace(/("|'')/g, "″").replace(/'/g, "′").replace(/(\u2032|′)("|”|“)/g, "′”").replace(/(\u2019|\u2018)("|”|“)/g, "’”").replace(/(\.\.\.)/, "…").replace(/\u2013\u2013|--/g, " — ").replace(/(\s)(\u2018|')(n)(\u2019|')(\s)/gi, " ’n’ ");
    TypeBetter.input.value = new_value;
    this.setSelectionRange(start, end);
  }
};