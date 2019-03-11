/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
var modal = document.getElementsByClassName('modal');
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex].innerHTML;
        array[currentIndex].innerHTML = array[randomIndex].innerHTML;
        array[randomIndex].innerHTML = temporaryValue;
    }
    //console.log(array)
    return array;
}
function showAll(array){
    // console.log(array[0].attributes[0].value)
    // array[0].attributes[0].value='card open show'
    for (let i=0;i<array.length;i++){
        array[i].attributes[0].value='card open show'
    }

}

function hideAll(array){
    for(let i=0;i<array.length;i++){
        array[i].attributes[0].value='card'
    }
  
}
function checkWin(set,count){
   
    if(set.size==8){
        // let contianer=document.querySelector('.container')
        // let winning=document.createElement('p')
        // winning.textContent='Finish! Your final moves are '+count
        // contianer.appendChild(winning)
        // console.log(count)
       
        let moves=document.querySelector('.moves')
        moves.textContent=count;
        let stars=document.querySelector('.stars')
        let star=document.createElement('li')
        let fa=document.createElement('i')
        fa.className="fa fa-star"
        star.appendChild(fa);
        if(count>25&&count<50){
            stars.appendChild(star)
            stars.appendChild(star)
        }
        else if(count>=50){
            stars.appendChild(star)
            
        }
        else{
            stars.appendChild(star)
            stars.appendChild(star)
            stars.appendChild(star)
        }
        modal[0].style.display = "block";
    }
}
function close(){
    modal[0].style.display = "none";     
}


function init(){
    let cards=document.querySelectorAll('.card');
    let closeButton=document.querySelector('.close');
    closeButton.addEventListener('click',function(){
        close();
    })
    cards=shuffle(cards)
    showAll(cards);
    let temp=0;
    let cardSet=new Set(); //make a set to record match card
    let prev;              //make a prev to record previous event 
    let count=0;
   setTimeout(function(){
      hideAll(cards);
      let deck=document.querySelector('.deck')
      deck.addEventListener('click',function(e){
          if(e.target.attributes[0].value!='deck'){
         
            if(temp==0&&!cardSet.has(e.target.innerHTML)){ //check if the card in the set in case of clicking same card
               
                temp=e.target;
                temp.attributes[0].value='card open show';
                prev=e;
                count++
            }
            else{
                if(temp.innerHTML==e.target.innerHTML&&prev.target!=e.target&&!cardSet.has(e.target.innerHTML)){ 
                    cardSet.add(e.target.innerHTML)
                    temp.attributes[0].value='card match';
                    e.target.attributes[0].value='card match';
                    temp=0
                    count++
                    checkWin(cardSet,count);
                   
                }
                else if(temp.innerHTML!=e.target.innerHTML&&!cardSet.has(e.target.innerHTML)&&prev.target!=e.target){
                    temp.attributes[0].value='card open show';
                    e.target.attributes[0].value='card open show';
                    setTimeout(function(){
                        temp.attributes[0].value='card';
                        e.target.attributes[0].value='card';
                        temp=0
                        count++
                    },500)
                    
                }
            }   

           
      }})  
   },8000)
}


init();

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
