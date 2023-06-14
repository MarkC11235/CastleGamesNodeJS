const r = document.querySelector(':root');

const themes = {
    main: {
        backgroundMain: '#192E4B',
        backgroundSecondary: '#3d6c8a',
        backgroundGame: '#7badad',
        borderColor: '#000000',
        textColor: '#000000'
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
        backgroundGame: '#d8bc9c',
        borderColor: '#422f18',
        textColor: '#9c9391'
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
        backgroundMain: '#ff8000',
        backgroundSecondary: '#5A0002',
        backgroundGame: '#6d3d06',
        borderColor: '#000F08',
        textColor: '#F8F2DC'
    },
    yellow: {
        backgroundMain: '#E0BE36',
        backgroundSecondary: '#F1D302',
        backgroundGame: '#ad6c51',
        borderColor: '#ad300a',
        textColor: '#362a12'
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
    user1.setTheme();
    user1.setProfilePicture();
}

//added cookies to this so that the colors will be loaded before the page renders
let themeName = document.cookie.split('; ').find(row => row.startsWith('themeName=')).split('=')[1] || 'main';
let profilePicture = document.cookie.split('; ').find(row => row.startsWith('profilePicture=')).split('=')[1] || 'default';
updateTheme(themeName, false);
updateProfilePicture(profilePicture, false);

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