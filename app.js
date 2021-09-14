let bluePlayerName
let redPlayerName
const rowsCount = 10
const columnsCount = 12
const $bluePlayerNameInput = document.getElementById('blue-player')
const $redPlayerNameInput = document.getElementById('red-player')
const $playersSelection = document.getElementById('players-selection')
const $playButton = document.getElementById('play')
const $playAgainButton = document.getElementById('play-again')
const $page = document.querySelector('body')
const $game = document.getElementById('game')
const $bluePlayerScore = document.getElementById('blue-player-score')
const $redPlayerScore = document.getElementById('red-player-score')
const $bluePlayerName = document.getElementById('blue-player-name')
const $redPlayerName = document.getElementById('red-player-name')
const $currentPlayerName = document.getElementById('current-player-name')
const $bluePlayerScoreValue = document.getElementById('blue-player-score-value')
const $redPlayerScoreValue = document.getElementById('red-player-score-value')
const $result = document.getElementById('result')
const $playerTurn = document.getElementById('player-turn')
let $map

// Lorsqu'on clique sur le bouton JOUER.
$playButton.onclick = () => {
    bluePlayerName = $bluePlayerNameInput.value
    redPlayerName = $redPlayerNameInput.value

    if (bluePlayerName.length < 3 || redPlayerName.length < 3) {
        alert('Les noms sont invalides')

        bluePlayerName = null
        redPlayerName = null
    } else {
        startGame()
    }
}

// Lorsqu'on clique sur le bouton RECOMMENCER.
$playAgainButton.onclick = () => {
    startGame()
}

function startGame () {
    if ($map) {
        $map.remove()
    }
    $map = createMap()
    let finished = false
    $playAgainButton.hidden = true
    $playersSelection.hidden = true
    $playerTurn.hidden = false
    $result.hidden = true
    $result.innerHTML = ''
    $result.after($map)
    $game.hidden = false
    $page.className = 'blue'
    $currentPlayerName.innerHTML = bluePlayerName
    $currentPlayerName.className = 'blue'
    $bluePlayerName.innerHTML = bluePlayerName
    $redPlayerName.innerHTML = redPlayerName
    $bluePlayerScore.className = ''
    $redPlayerScore.className = ''

    const $cases = document.querySelectorAll('td')
    const $selectedCases = []
    const $bombs = []
    const $checkedCases = []
    
    let scoreBlue = 0
    let scoreRed = 0
    let toTheBluePlayer = true

    $bluePlayerScoreValue.innerHTML = scoreBlue
    $redPlayerScoreValue.innerHTML = scoreRed

    // Lorsqu'on clique sur une case.
    $cases.forEach($case => {
        const isBomb = getRandomInt(4) == 0
        if (isBomb) {
            $bombs.push($case)
        }
        
        $case.onclick = () => {
            if (!finished && !$selectedCases.includes($case)) {
                $selectedCases.push($case)

                if (isBomb) {
                    const $flag = document.createElement('img')
                    $flag.src = 'images/' + (toTheBluePlayer ? 'blue' : 'red') + '-flag.png'
                    $case.innerHTML = $flag.outerHTML

                    if (toTheBluePlayer) {
                        scoreBlue++
                        $bluePlayerScoreValue.innerHTML = scoreBlue
                    } else {
                        scoreRed++
                        $redPlayerScoreValue.innerHTML = scoreRed
                    }
                    $case.className = 'selected'

                    if (scoreBlue + scoreRed == $bombs.length) {
                        let winnerColor
                        let winnerName
                        if (toTheBluePlayer) {
                            winnerColor = 'blue'
                            winnerName = bluePlayerName
                        } else {
                            winnerColor = 'red'
                            winnerName = redPlayerName
                        }

                        $result.innerHTML = 'Victoire de <span class="' + winnerColor + '">' + winnerName + '</span> !'
                        $result.hidden = false
                        $page.className = winnerColor
                        $playerTurn.hidden = true
                        finished = true
                        $playAgainButton.hidden = false
                    }
                } else {
                    controlCase($case, $bombs, $checkedCases)
                    
                    toTheBluePlayer = !toTheBluePlayer

                    if (toTheBluePlayer) {
                        $page.className = 'blue'
                        $currentPlayerName.innerHTML = bluePlayerName
                    } else {
                        $page.className = 'red'
                        $currentPlayerName.innerHTML = redPlayerName
                    }
                    
                    $currentPlayerName.className = $page.className
                }
            }
        }
    })
    
    // Vérification des bombes sur la case.
    function controlCase($case, $bombs, $checkedCases) {
        if (!$checkedCases.includes($case)) {
            $checkedCases.push($case)

            const x = Array.from($case.parentElement.children).indexOf($case)
            let bombsAroundCount = 0
            
            const $topRow = $case.parentElement.previousElementSibling
            const $bottomRow = $case.parentElement.nextElementSibling
            const $leftCase = $case.previousElementSibling
            const $rightCase = $case.nextElementSibling
            let $topCase
            let $topLeftCase
            let $topRightCase
            let $bottomCase
            let $bottomLeftCase
            let $bottomRightCase

            if ($topRow) {
                $topCase = Array.from($topRow.children)[x]
                $topLeftCase = $topCase.previousElementSibling
                $topRightCase = $topCase.nextElementSibling
            }

            if ($bottomRow) {
                $bottomCase = Array.from($bottomRow.children)[x]
                $bottomLeftCase = $bottomCase.previousElementSibling
                $bottomRightCase = $bottomCase.nextElementSibling
            }

            if ($bombs.includes($topCase)) {
                bombsAroundCount++
            }

            if ($bombs.includes($topLeftCase)) {
                bombsAroundCount++
            }

            if ($bombs.includes($topRightCase)) {
                bombsAroundCount++
            }

            if ($bombs.includes($bottomCase)) {
                bombsAroundCount++
            }

            if ($bombs.includes($bottomLeftCase)) {
                bombsAroundCount++
            }

            if ($bombs.includes($bottomRightCase)) {
                bombsAroundCount++
            }

            if ($bombs.includes($leftCase)) {
                bombsAroundCount++
            }

            if ($bombs.includes($rightCase)) {
                bombsAroundCount++
            }

            switch (bombsAroundCount) {
                case 1:
                    $case.style = 'color: #3232F7'
                    break;
                case 2:
                    $case.style = 'color: #008000'
                    break;
                case 3:
                    $case.style = 'color: #FF0000'
                    break;
                case 4:
                    $case.style = 'color: #000080'
                    break;
                case 5:
                    $case.style = 'color: #802f00'
                    break;
                case 6:
                case 7:
                case 8:
                    $case.style = 'color: #000'
                    break;
            }
            
            $case.className = 'selected'

            if (bombsAroundCount) {
                $case.innerHTML = bombsAroundCount
            } else {
                const $casesAround = [
                    $leftCase,
                    $rightCase,
                    $topCase,
                    $topLeftCase,
                    $topRightCase,
                    $bottomCase,
                    $bottomLeftCase,
                    $bottomRightCase
                ]

                $casesAround.filter($c => $c && !$checkedCases.includes($c)).forEach($c => controlCase($c, $bombs, $checkedCases))
            }
        }
    }
}

// Création de la carte.
function createMap () {
    let content = ''
    for (let i = 0; i < rowsCount; i++) {
        const $tr = document.createElement('tr')
        $tr.innerHTML = ''

        for (let i = 0; i < columnsCount; i++) {
            const $td = document.createElement('td')
            $tr.innerHTML += $td.outerHTML
        }

        content += $tr.outerHTML
    }

    const $map = document.createElement('table')
    $map.id = 'map'
    $map.innerHTML = content

    return $map
}

// Génération d'un nombre aléatoire.
function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}