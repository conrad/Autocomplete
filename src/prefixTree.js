var PrefixTree = function(){
  this.children = {};
}

PrefixTree.prototype.addWord = function(word){
  if (word) {
    var firstLetter = word[0];
    var remainder = word.slice(1);

    // create new node, ONLY if it doesn't already exist
    if (!this.children[firstLetter]) {
      this.children[firstLetter] = new PrefixTree();
    }
    this.children[firstLetter].addWord(remainder);

  // create some marker on the node IF it's the end of the word
  } else {
    this.children['end'] = true;    
  }

  return word;    // not necessary, but maybe good to chain off of
}

PrefixTree.prototype.getWords = function(prefix){
  var words = [];

  if (prefix) {
    var letter = prefix[0];
    if(this.children[letter]) {
      var suffixes = this.children[letter].getWords(prefix.slice(1));
      suffixes.forEach(function(suffix){
        words.push(letter + suffix);
      });
    }
  // add everything if no prefix exists
  } else {
    for (var letter in this.children) {
      if (letter === 'end') {
        words.push('');
      } else {
        var suffixes = this.children[letter].getWords();
        suffixes.forEach(function(suffix) {
          words.push(letter + suffix);
        });
      }
    }
  }
  return words;
}

PrefixTree.prototype.removeWord = function(word){
  if (word) {
    if (word[0] in this.children) {
      this.children[word[0]].removeWord(word.slice(1));
    }
  }

  // if there is only 1 child, it is the end of a word with only 'end'
  if (!word || Object.keys(this.children).length === 1) {
    // remove the property 'end'
    delete this.children['end'];
  }

  return word;
}
