document.addEventListener("DOMContentLoaded", function(){

let swipeList = document.querySelector(".swipe-list");

let initialX, currentX, movedX;
let winWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

let icon = document.createElement("span");
icon.textContent ="🗑️";
icon.style.fontSize = "2rem";
icon.style.position = "absolute";
icon.style.top = "1rem";

function startTouch(event){
    initialX = event.touches[0].clientX;
}


function moveTouch(event){
    if (event.target !== event.currentTarget){
        currentX = event.touches[0].clientX;
        movedX = currentX - initialX;
        console.log(movedX);
        event.target.style.left = movedX + 'px';
        if(currentX > winWidth * 0.5){
            console.log("get ready to move out!!!");
            icon.style.left = "-" + movedX + "px";
            event.target.appendChild(icon);
        }else{
            if (event.target.children.length) {
                event.target.removeChild(icon);
            }
        }
    }
}

function endTouch(event){
    if(currentX > winWidth * 0.5){
        console.log("out!!!");
        event.target.removeChild(icon);
        event.target.classList.add("animate");
        event.target.style.left = "110%";
        setTimeout(function(){
            event.target.style.height = "0px";
        }, 200)
        setTimeout(function(){
            swipeList.removeChild(event.target);
        }, 400)  
    } else{
        event.target.style.left = 0;
        event.target.classList.add("animate");
    }
    
}


swipeList.addEventListener("touchstart", startTouch, false);
swipeList.addEventListener("touchmove", moveTouch, false);
swipeList.addEventListener("touchend", endTouch, false);

})