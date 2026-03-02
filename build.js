const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

const VIEWS = path.join(__dirname, 'views');
const PUBLIC = path.join(__dirname, 'public');
const OUT = path.join(__dirname, 'docs');

// Pages to render: { tpl, out, title, game, gameName }
const gameNames = [
    '2048', 'Bird', 'BlackJack', 'BlockStack', 'CubeDash', 'HangMan', 'IdleMining',
    'Minesweeper', 'Memory', 'MeteorShower', 'MiniGolf', 'MuffinMaker', 'MuffinMaker2',
    'OppositesAttract', 'Pong', 'Rocket', 'Serpent', 'Slots', 'SpaceBattle',
    'SuperJumpMan', 'TargetPractice', 'TowerBuilder', 'ZombieSurvival'
];

const pages = [
    { tpl: 'index.ejs',      out: 'index.html',        title: 'Castle Games',             game: false, gameName: '' },
    { tpl: 'contact.ejs',    out: 'contact_.html',      title: 'contact|Castle Games',     game: true,  gameName: '' },
    { tpl: 'patchNotes.ejs', out: 'patchNotes_.html',   title: 'patchNotes|Castle Games',  game: true,  gameName: '' },
    { tpl: 'downloads.ejs',  out: 'downloads_.html',    title: 'downloads|Castle Games',   game: true,  gameName: '' },
    { tpl: 'categories.ejs', out: 'categories_.html',   title: 'categories|Castle Games',  game: true,  gameName: '' },
    { tpl: 'error.ejs',      out: '404.html',           title: 'error|Castle Games',       game: true,  gameName: '' },
    ...gameNames.map(name => ({
        tpl: `${name}.ejs`,
        out: `${name}-.html`,
        title: `${name}|Castle Games`,
        game: true,
        gameName: name
    }))
];

// Ensure output directory exists and is empty
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

// Render each page
let built = 0;
let skipped = 0;
for (const p of pages) {
    const tplPath = path.join(VIEWS, p.tpl);
    if (!fs.existsSync(tplPath)) {
        console.log(`skip (not found): ${p.tpl}`);
        skipped++;
        continue;
    }
    try {
        const html = ejs.render(
            fs.readFileSync(tplPath, 'utf8'),
            {
                loggedIn: false,
                username: '',
                title: p.title,
                game: p.game,
                gameName: p.gameName,
                initialLogin: false
            },
            { filename: tplPath, views: [VIEWS] }
        );
        // Ensure every page is in Standards Mode
        const withDoctype = html.trimStart().toLowerCase().startsWith('<!doctype')
            ? html
            : '<!DOCTYPE html>\n' + html;
        // Fix common template error: stray <html> at end should be </html>
        const out = withDoctype.replace(/<html>\s*$/i, '</html>\n');
        fs.writeFileSync(path.join(OUT, p.out), out);
        console.log(`built: ${p.out}`);
        built++;
    } catch (err) {
        console.error(`ERROR rendering ${p.tpl}: ${err.message}`);
        skipped++;
    }
}

// Copy all public/ assets into docs/, skipping .git entries from submodules
fs.cpSync(PUBLIC, OUT, {
    recursive: true,
    filter: (src) => !src.split(path.sep).includes('.git')
});
console.log(`\nDone. Built ${built} pages, skipped ${skipped}. Assets copied from public/.`);
