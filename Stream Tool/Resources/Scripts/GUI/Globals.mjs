export const path = {
    char : "",
    charRandom : __dirname + '/Characters/Random',
    text : __dirname + '/Texts',
    charBase : __dirname + '/Characters',
    charWork : __dirname + '/Characters/_Workshop'
};

export const current = {
    player : "",
    focus : -1
}

export const wsCheck = document.getElementById('workshopToggle');

// these are set when their respective views are visible
export const inside = {
    settings : false,
    bracket : false,
    finder : false
};
