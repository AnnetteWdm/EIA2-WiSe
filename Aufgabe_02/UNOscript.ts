interface Card {
    colourCard: string;   
    numberCard: number;    
}
let playercards: Card[] = [];
let compcards: Card[] = []; 
let discardpile: Card[] = []; 
let drawpile: Card[] = [];
let anDerReihe: string = "player"; 


window.onload = function(): void {
    startGame();   
};

function startGame(): void {
    playercards = [];
    compcards = [];
    discardpile = [];
    drawpile = [];
    anDerReihe = "player";
    spielSetup();

    // Karten im Html erzeugen
    updateHtml(playercards);
    updateHtml(compcards);
    updateHtml(discardpile);
    updateHtml(drawpile);
    document.getElementById("stapel")!.addEventListener("click", karteNehmen, false);    
}

function spielSetup(): void {
    // Stapel mit allen Karten generieren
    for (let i: number = 0; i < 4; i++) {
        let color: string = "";
        if (i == 0) color = "green";
        else if (i == 1) color = "blue";
        else if (i == 2) color = "red";
        else if (i == 3) color = "yellow";
        for (let j: number = 0; j <= 9; j++) {
            let newCard: Card = {
                colourCard : color,
                numberCard : j
            };
            drawpile.push(newCard);
        }
        for (let j: number = 1; j <= 9; j++) {
            let newCard: Card = {
                colourCard : color,
                numberCard : j
            };
            drawpile.push(newCard);
        }
    }


    mischen(drawpile);

    // Spieler legt fest, mit wievielen Karten gespielt werden soll
    let n: number = Number(window.prompt("Mit wievielen Karten spielt ihr? Wähle von 3-10!", ""));

    while (Number.isNaN(n) || n < 3 || n > 10) {
        n = Number(window.prompt("Das war keine erlaubte Zahl! Try again: Wie viele Karten?", ""));
    }
    // Karten austeilen
    while (n) {
        playercards.push(drawpile[0]);
        drawpile.splice(0, 1);
        compcards.push(drawpile[0]);
        drawpile.splice(0, 1);
        n -= 1;
    }

    discardpile.push(drawpile[drawpile.length - 1]); // Startkarte zwischen den Spielern ablegen
    drawpile.splice(drawpile.length - 1, 1);
}

function karteLegen(_geklickteKarte: Card, _index: number): void {
    if (anDerReihe == "player") {

        if (_geklickteKarte.colourCard == discardpile[discardpile.length - 1].colourCard || _geklickteKarte.numberCard == discardpile[discardpile.length - 1].numberCard) {
            anDerReihe = "pc";
            discardpile.push(_geklickteKarte);
            playercards.splice(_index, 1);
            updateHtml(playercards);
            updateHtml(discardpile);

            if (playercards.length == 0) {
                setTimeout(function() {window.alert("Du hast gewonnen!"); startGame();}, 500);
            }
            else if (anDerReihe == "pc") gegnerzug();
        }
        else {
            window.alert("Die Karte passt nicht! Spiel eine andere oder nimm eine neue Karte auf.");
        } 
    }   
}

function karteNehmen(): void {
    if (anDerReihe == "player") {
        playercards.push(drawpile[drawpile.length - 1]);
        drawpile.splice(drawpile.length - 1, 1);
        updateHtml(playercards);
        updateHtml(drawpile);
        anDerReihe = "pc";
        gegnerzug();
    }
}

function gegnerzug(): void {
    let couldLay: boolean = false;
    for (let i: number = 0; i < compcards.length; i++) {
        // Fall 1: Gegner kann eine Karte legen
        if (compcards[i].colourCard == discardpile[discardpile.length - 1].colourCard || compcards[i].numberCard == discardpile[discardpile.length - 1].numberCard) {
            discardpile.push(compcards[i]);
            setTimeout(function () {document.getElementById(compcards[i].colourCard + compcards[i].numberCard)!.classList.add("cardtransition"); compcards.splice(i,1);},500);
            setTimeout(function () {updateHtml(discardpile); updateHtml(compcards);}, 1500);
            couldLay = true;
            break;
        }
    }
    if (couldLay == false) {
        compcards.push(drawpile[drawpile.length - 1]);
        drawpile.splice(drawpile.length - 1, 1);
        setTimeout(function() {updateHtml(drawpile); updateHtml(compcards);}, 1600);
    }

    if (compcards.length <= 1) {
        setTimeout(function() {window.alert("Gegner hat gewonnen"); startGame();}, 2000);
    }
    else setTimeout(function() {anDerReihe = "player";}, 2000);

}

// Mischen nach Fisher-Yates Shuffle Algorithmus
function mischen(_kartenarray: Card[]): Card[] {
    let m: number = _kartenarray.length, t: Card, i: number;
  
    // While there remain elements to shuffle…
    while (m) {
  
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
  
      // And swap it with the current element.
      t = _kartenarray[m];
      _kartenarray[m] = _kartenarray[i];
      _kartenarray[i] = t;
    }

    return _kartenarray;
}

function updateHtml(_array: Card[]): void {
    let classStr: string = "";
    if (_array == playercards) {
        classStr = "player";
    }
    else if (_array == compcards) {
        classStr = "computer";
    }
    else if (_array == drawpile) {
        classStr = "stapel";
    }
    else if (_array == discardpile) {
        classStr = "ablage";
    }

    // Bisherige Html Elemente aus der Section entfernen
    let myNode: HTMLElement = document.getElementById(classStr);
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }

    if (classStr == "player" || classStr == "ablage") {

        for (let i: number = 0; i < _array.length; i++)  {
            createOpenCardHtml(_array, i, classStr);
        }
    }
    else {
        for (let i: number = 0; i < _array.length; i++) {
            createHiddenCardHtml(_array, i, classStr);
        }
    }
    
}

function createOpenCardHtml(_array: Card[], _arrayIndex: number, _classString: string): void {

    let holdingDiv: HTMLElement = document.createElement("div");
    holdingDiv.setAttribute("class", _classString + " " + "card" + " " + _array[_arrayIndex].colourCard);
    holdingDiv.setAttribute("id", _array[_arrayIndex].colourCard + _array[_arrayIndex].numberCard);
    document.getElementById(_classString)!.appendChild(holdingDiv);

    let i: number = 5;
    while (i) {
        let numberP: HTMLElement = document.createElement("p");
        numberP.innerHTML = "" + _array[_arrayIndex].numberCard;

        if (i == 5) {
            numberP.setAttribute("class", "topleft"); }
        else if (i == 4) {
            numberP.setAttribute("class", "topright"); }
        else if (i == 3) {
            numberP.setAttribute("class", "middle"); }
        else if (i == 2) {
            numberP.setAttribute("class", "bottomleft"); }
        else if (i == 1) {
            numberP.setAttribute("class", "bottomright"); }

        holdingDiv.appendChild(numberP);

        i -= 1;
    }   
    if (_classString == "player") {
        holdingDiv.addEventListener("click", function(): void {karteLegen(_array[_arrayIndex], _arrayIndex)}, false);   
    }   
}

// Verdeckte Karte in HTML erstellen
function createHiddenCardHtml(_array: Card[], _arrayIndex: number, _classString: string): void {
    let holdingDiv: HTMLElement = document.createElement("div");
    holdingDiv.setAttribute("class", _classString + " " + "card" + " " + "backside");
    holdingDiv.setAttribute("id", _array[_arrayIndex].colourCard + _array[_arrayIndex].numberCard);
    document.getElementById(_classString)!.appendChild(holdingDiv);

    let image: HTMLElement = document.createElement("img");
    image.setAttribute("src", "parquet.png");
    holdingDiv.appendChild(image);
}
