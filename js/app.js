

// Shuffle function from http://stackoverflow.com/a/2450976
var modal = document.getElementsByClassName('modal');
var c=0;
var t;
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex].innerHTML;
        array[currentIndex].innerHTML = array[randomIndex].innerHTML;
        array[randomIndex].innerHTML = temporaryValue;
    }
  
    return array;
}
function showAll(array){

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
        let moves=document.querySelector('.moves')
        moves.textContent=count;
        let stars=document.querySelector('.stars')
        const fragment = document.createDocumentFragment();
        if(count>25&&count<50){
            for(let i=0;i<2;i++){
            let star=document.createElement('li')
            let fa=document.createElement('i')
            fa.className="fa fa-star"
            star.appendChild(fa);
            fragment.appendChild(star)
         }
        }
        else if(count>=50){
            for(let i=0;i<1;i++){
                let star=document.createElement('li')
                let fa=document.createElement('i')
                fa.className="fa fa-star"
                star.appendChild(fa);
                fragment.appendChild(star)
            }
            
        }
        else if(count<=25){
            for(let i=0;i<3;i++){
                let star=document.createElement('li')
                let fa=document.createElement('i')
                fa.className="fa fa-star"
                star.appendChild(fa);
                fragment.appendChild(star)
            }
        }
        stars.appendChild(fragment)
        stopTimer()
        modal[0].style.display = "block";
    }
}
function close(){
    modal[0].style.display = "none";     
}
function hideStart(){
    let startButton=document.querySelector('.startButton')
    startButton.style.display='none'
}
function clearMovesRating(){
    let stars=document.querySelector('.stars')
    let moves=document.querySelector('.moves')
    moves.textContent=""
    stars.innerHTML=""
}

function init(){
    hideStart();
    clearMovesRating();
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
      startTimer()
      let deck=document.querySelector('.deck')
      deck.addEventListener('click',function(e){
          if(e.target.attributes[0].value!='deck'){
         
            if(temp==0&&!cardSet.has(e.target.innerHTML)){ //check if the card is in the set in case of clicking same card
               
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
function startGame(){
    let start=document.querySelector('.start');
    start.addEventListener('click',function(){
        init()
    })
}
function startTimer(){
    document.querySelector('.time').textContent=c+" s"
    c+=1;
    t=setTimeout('startTimer()',1000)
}

function stopTimer(){
    setTimeout("document.querySelector('.time').textContent=c+' s'",0);
   
    clearTimeout(t)

}

var restart=document.querySelector('.restart')
restart.addEventListener('click',function(){
    c=0
    stopTimer();
    init();
})

startGame();

