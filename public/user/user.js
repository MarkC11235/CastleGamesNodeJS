const r = document.querySelector(':root');

const themes = {
    main: {
        backgroundMain: '#192E4B',
        backgroundSecondary: '#3d6c8a',
        backgroundGame: '#7badad',
        borderColor: '#000000',
        textColor: '#000000'
    },
    dark: {
        backgroundMain: '#0d1b2a',
        backgroundSecondary: '#1b263b',
        backgroundGame: '#26405e',
        borderColor: '#495666',
        textColor: '#bcbdbb'
    },
    blue: {
        backgroundMain: 'rgb(32, 95, 178)',
        backgroundSecondary: 'rgb(21, 21, 201)',
        backgroundGame: ' rgb(44, 135, 143)',
        borderColor: 'rgb(13, 14, 94)',
        textColor: 'rgb(0, 0, 0)'
    },
    red: {
        backgroundMain: '#9E2A2B',
        backgroundSecondary: '#540B0E',
        backgroundGame: '#945757',
        borderColor: '#3f2a10',
        textColor: '#aaaaaa'
    },
    violet: {
        backgroundMain: '#820fcf',
        backgroundSecondary: '#b81e63',
        backgroundGame: '#3a0ca3',
        borderColor: '#4361ee',
        textColor: '#4cc9f0'
    },
    green: {
        backgroundMain: '#131515',
        backgroundSecondary: '#131515',
        backgroundGame: '#2b3b3b',
        borderColor: '#57f179',
        textColor: '#57f179'
    },
    purple: {
        backgroundMain: '#2E0219',
        backgroundSecondary: '#4A001F',
        backgroundGame: '#6A0F49',
        borderColor: '#A7C4C2',
        textColor: '#97EFE9'
    },
    orange: {
        backgroundMain: '#a13007',
        backgroundSecondary: '#831102',
        backgroundGame: '#e47900',
        borderColor: '#61190b',
        textColor: '#220901'
    },
    darkblue: {
        backgroundMain: '#07046b',
        backgroundSecondary: '#1f0f53',
        backgroundGame: '#3c3c8a',
        borderColor: '#60a6f1',
        textColor: '#a3b6a7'
    },
}

class user{
    constructor(){
        this.themeName = 'main';
        this.profilePicture = 'default';
    }

    setTheme(){
        r.style.setProperty('--background-main', themes[this.themeName].backgroundMain);
        r.style.setProperty('--background-secondary', themes[this.themeName].backgroundSecondary);
        r.style.setProperty('--background-game', themes[this.themeName].backgroundGame);
        r.style.setProperty('--border-color', themes[this.themeName].borderColor);
        r.style.setProperty('--text-color', themes[this.themeName].textColor);
    }

    setProfilePicture(){
        r.style.setProperty('--profile-picture', `url(../images/${this.profilePicture}.png)`);
        //console.log(this.profilePicture);
    }

    async get(){
        const info = await getUserInfo();
        //console.log(info);
        if(info == null){
            return;
        }
        this.themeName = info.theme;
        this.profilePicture = info.profilePicture;
    }

    set(){
        postUserInfo({
            theme: this.themeName,
            profilePicture: this.profilePicture
        });
        //console.log("set" + this.themeName + this.profilePicture);
        document.cookie = `themeName=${this.themeName}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
        document.cookie = `profilePicture=${this.profilePicture}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
    }
}

const user1 = new user();
async function LoadData(){
    await user1.get();
    if(user1.themeName != themeName){
        updateTheme(user1.themeName, true);
    }
    if(user1.profilePicture != profilePicture){
        updateProfilePicture(user1.profilePicture, true);
    }
}

//added cookies to this so that the colors will be loaded before the page renders
let themeName = document.cookie.split('; ').find(row => row.startsWith('themeName='));
let profilePicture = document.cookie.split('; ').find(row => row.startsWith('profilePicture='));

if(themeName != null){
    themeName = themeName.split('=')[1];
    updateTheme(themeName, false);
}
if(profilePicture != null){
    profilePicture = profilePicture.split('=')[1];
    updateProfilePicture(profilePicture, false);
}

LoadData();

// updateTheme(themeName, false);
// updateProfilePicture(profilePicture, false);

function updateTheme(themeName, set = true){
    if(themeName == null){
        return;
    }
    user1.themeName = themeName;
    if(set){
        user1.set();
    }
    user1.setTheme(); 
}

function updateProfilePicture(profilePicture, set = true){
    if(profilePicture == null){
        return;
    }
    user1.profilePicture = profilePicture;
    if(set){
        user1.set();
    }
    user1.setProfilePicture();
}