class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let current = this.root;
    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      if (!current.children[char]) {
        current.children[char] = new TrieNode();
      }
      current = current.children[char];
    }
    current.isEndOfWord = true;
  }

  search(word) {
    let current = this.root;
    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      if (!current.children[char]) {
        return false;
      }
      current = current.children[char];
    }
    return current.isEndOfWord;
  }

  autoComplete(prefix) {
    let current = this.root;
    for (let i = 0; i < prefix.length; i++) {
      const char = prefix[i];
      if (!current.children[char]) {
        return [];
      }
      current = current.children[char];
    }
    return this._getAllWords(current, prefix);
  }

  _getAllWords(node, prefix) {
    let words = [];
    if (node.isEndOfWord) {
      words.push(prefix);
    }
    for (let char in node.children) {
      const childNode = node.children[char];
      const childWords = this._getAllWords(childNode, prefix + char);
      words = words.concat(childWords);
    }
    return words;
  }
}

const trie = new Trie();

const GAMESLIST = ['2048', 'Bird', 'BlackJack', 'BlockStack', 'CubeDash', 'HangMan', 'Minesweeper',
                 'Memory', 'MeteorShower', 'MiniGolf', 'MuffinMaker', 'OpenBattle', 'OppositesAttract',
                  'Pong', 'Rocket', 'Serpent', 'SpaceBattle', 'SuperJumpMan', 'TargetPractice', 'TowerBuilder',
                   'ZombieSurvival'];

for (let i = 0; i < GAMESLIST.length; i++) {
  trie.insert(GAMESLIST[i].toLocaleLowerCase());
}

const searchBar = document.getElementById('searchBar');
const searchResults = document.getElementById('search-results');

searchBar.addEventListener('keyup', (e) => {
  const input = e.target.value;
  if (input) {
    const results = trie.autoComplete(input.toLocaleLowerCase());
    for (let i = 0; i < results.length; i++) {
      searchResults.appendChild(document.createElement('li')).innerHTML = `<a href="/${results[i]}-">${results[i]}</a>`;
    }
  }
});
