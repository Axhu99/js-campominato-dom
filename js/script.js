// I puntatori
const grill = document.getElementById('grill');
const form = document.querySelector('form'); 

const select = document.getElementById('level');

//! TODO cercare come si puo' modificare il foglio CSS
const numberCol = document.querySelector('root');

const getNumberCell = () =>{
    let row = 10;
    let col = 10;

    switch (select.value){
        case '2':
            row = 9;
            col = 9;
            break;
        case '3':
            row = 7;
            col = 7;
            break
    
    }
    let numberCell = row * col;
    return numberCell;
}

const getCell = (num) =>{
    
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.innerText = num;
    
    return cell;
} 

// evento che parte al click del bottone
form.addEventListener('submit', (event) =>{
    event.preventDefault();

    //pulire tutto quello che c'e' all'interno cosi' non c'e' uno spam di griglie
    grill.innerHTML = ''; 

    // funzione per calcolare il numero di celle in base al livello di difficolta'
    const numberCell = getNumberCell();

    //cliclo FOR che serve a creare la griglia
    for (i = 1 ; i <= numberCell ; i++){
        //chiamo la funzione per la creazione delle celle 
        const grid = getCell(i);
       
        //quando click sulla cella aggiungo la classe 
        grid.addEventListener('click', () =>{
            grid.classList.add('click')
        }) 
        
        //stampiamo il risultato
        grill.appendChild(grid);
    }


})
