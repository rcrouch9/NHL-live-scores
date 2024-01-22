let date = new Date()
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

let currentDate = `${year}/${month}/${day}`;

let games = document.querySelector('.games')
const APIkey = "yebhzyu3kacthksu887kykkj"

fetch(`https://cors-anywhere.herokuapp.com/http://api.sportradar.us/nhl/trial/v7/en/games/${currentDate}/schedule.json?api_key=${APIkey}`)
    .then(resp => resp.json())
    .then(data => {

        totalGames = data.games.length
        for (let i = 0; i < totalGames; i++){
            let newDiv = document.createElement('button');
            newDiv.classList.add("game");
            let gameID = data.games[i].id;
            newDiv.setAttribute("id", gameID);
            newDiv.textContent = data.games[i].away.name + " @ " + data.games[i].home.name;
            newDiv.addEventListener('click', function(){boxScore(gameID)});
            games.appendChild(newDiv);    
            

        }
    })

function boxScore(id) {

    let game = document.getElementById(id);

    if (game.childElementCount == 0) {

        fetch(`https://cors-anywhere.herokuapp.com/http://api.sportradar.us/nhl/trial/v7/en/games/${id}/boxscore.json?api_key=${APIkey}`)
    .then(resp => resp.json())
    .then(data => {

        let homeScore = data.home.points;
        let awayScore = data.away.points;
        let period = data.period;
        let time = data.clock;

        let gameScore = awayScore + " - " + homeScore;
        let gameClock = time + " Period " + period;

        let score = document.createElement('div');
        let clock = document.createElement('div');

        score.classList.add("scoreboard");
        clock.classList.add("scoreboard");

        score.textContent = gameScore;
        clock.textContent = gameClock;

        let game = document.getElementById(id);
        game.appendChild(clock)
        game.appendChild(score);

        })
    }
    
    else {

        game.removeChild(game.firstElementChild)
        game.removeChild(game.lastElementChild)

    }
}