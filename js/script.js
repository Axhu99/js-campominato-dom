// I puntatori
const grill = document.getElementById('grill');
const form = document.querySelector('form');
const button = document.querySelector('button');
const score = document.querySelector('.score'); 

const select = document.getElementById('level');

const root = document.querySelector(':root');

const getCell = (num) =>{
    
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.innerText = num;
    
    return cell;
} 

const getBombs = (numCell, numberBombs) =>{
    
    const bomb = [];
    while(bomb.length < numberBombs){
        let randomNumber = Math.floor(Math.random() * numCell)+1;
        if(!bomb.includes(randomNumber)) bomb.push(randomNumber);
    }
    return bomb;
}



// funzione di di partita 'accende' tutte le caselle 
const endGame = (bombs = [], flag = true) => {
    const cells = document.querySelectorAll('.cell');

    for(let cell of cells){
        cell.classList.add('click');
        if(bombs.includes(parseInt(cell.innerText))) cell.classList.add('bomb');
    }

    if(flag){
        console.log('partita finita, Hai vinto');
    }else{
        console.log('partita finita');
    }
}

// evento che parte al click del bottone
form.addEventListener('submit', (event) =>{
    event.preventDefault();

    //pulire tutto quello che c'e' all'interno cosi' non c'e' uno spam di griglie
    grill.innerHTML = ''; 

    score.innerText = '';
    let numberScore = 0;

    //in base alla difficolta scegli il numero di colonne 
    let row = 2;
    let col = 2;
    let numberBomb = 2;


    switch (select.value){
        case '2':
            row = 9;
            col = 9;
                
            break;
            
        case '3':
            row = 7;
            col = 7;

            break;
        
    }
    
    root.style.setProperty('--number-col-row', col);

    let totalCell = row * col;

    let secureCells = totalCell - numberBomb; 

    button.innerText = ('Rigioca');

    // funzione che mi da un array di numeri COMPRESI nella griglia NON ripetuti
    const bombs = getBombs(totalCell, numberBomb);

    console.log(bombs);

    //cliclo FOR che serve a creare la griglia
    for (i = 1 ; i <= totalCell ; i++){
        //chiamo la funzione per la creazione delle celle 
        const grid = getCell(i);

        //quando click sulla cella aggiungo la classe 
        grid.addEventListener('click', () =>{
            
            if(!grid.className.includes('click')){
                grid.classList.add('click');

                //controllo se la casella e' una bomba
                if(bombs.includes(parseInt(grid.innerText))){
                    endGame(bombs, false);
                }else {
                //aumento il counter per ogni casella giusta
                ++numberScore;
                }
                //stampo il risultato
                score.innerText = ('Il tuo punteggio: ' + numberScore);
            }

            //l'uscita in caso di vittoria
            if(numberScore === secureCells){
                endGame(bombs, true);
            }
            
        })
        
        //stampiamo il risultato
        grill.appendChild(grid);
    }
    

})
