let addTicket=document.querySelector(".fa-plus");
let modalConatiner=document.querySelector(".modalContainer");
let mainTicketContainer=document.querySelector(".ticketContainer");
let textArea=document.querySelector("#textArea");
let removeBtn=document.querySelector(".fa-trash-can");

// Get access of all priority colors
let priorityColor=document.querySelectorAll(".priorityColor")

let filterColor=document.querySelectorAll(".color");


let allColors=["pink","green","yellow","black"];
let setColor =allColors[allColors.length - 1];


let removeFlag = false;
let ticketArr=[];

for(let i=0;i<filterColor.length;i++){

    filterColor[i].addEventListener("click",(e)=>{
        
        let currFilterColor=filterColor[i].classList[1];
        
        let filterTicket=ticketArr.filter((ticketObj,idx) => {
            return currFilterColor === ticketObj.ticketColor;
        })

        // Removal of previous ticket
        let allTicket=document.querySelectorAll(".ticket");
        for(let i=0; i<allTicket.length; i++){
            allTicket[i].remove();
        }

        // Display new filtered tickets
        filterTicket.forEach((ticketObj,idx)=>{
            createTicket(ticketObj.ticketColor,ticketObj.taskValue,ticketObj.ticketID);
        })
    })

    filterColor[i].addEventListener("dblclick", (e)=>{
        let allTicket=document.querySelectorAll(".ticket");
        for(let i=0; i<allTicket.length; i++){
            allTicket[i].remove();
        }
        ticketArr.forEach((ticketObj,idx) => {
        createTicket(ticketObj.ticketColor,ticketObj.taskValue,ticketObj.ticketID);

        })
    })
    
    


}
// Event Listener for modal priority coloring
priorityColor.forEach((colorElem, idx) => {
    colorElem.addEventListener("click", (e) => {
        priorityColor.forEach((priorityColorElem, idx) => {

            priorityColorElem.classList.remove("defaultBorder");
        })
        colorElem.classList.add("defaultBorder");

        setColor = colorElem.classList[1];

    })
})



// Event Listener for modal display to add content
addTicket.addEventListener("click",(e) => {
    // Toggle Display of modal
    modalConatiner.classList.toggle("modalDisplay");
    
});


removeBtn.addEventListener("click", (e) => {
    removeFlag = !removeFlag;
    
})

modalConatiner.addEventListener("keydown", (e) => {
    let key=e.key;
    if(key === "Enter"){
        createTicket(setColor, textArea.value);
        
        setToDefault();
    }
})



// Creating a ticket and adding it in the main view.
function createTicket(ticketColor,taskValue,ticketID){
    let id=ticketID || shortid();
    let ticket=document.createElement("div");
    ticket.setAttribute("class","ticket");
    ticket.innerHTML=`
                <div class="ticketColor ${ticketColor}"></div>
                <div class="ticketId">#${id}</div>
                <div class="taskArea">${taskValue}</div>
                <div class="lock">
                    <i class="fa-solid fa-lock"></i>
                </div>
    `;
    mainTicketContainer.appendChild(ticket);
    // Pushing new ticket object in array
    if(!ticketID){
        ticketArr.push({ticketColor,taskValue,ticketID:id});
    } 
    
    deleteTicket(ticket);
    handleLock(ticket);
    handleColor(ticket);
}

// Deleting/ removing the tickets
function deleteTicket(ticket){

    ticket.addEventListener("click" ,(e) => {
        if(removeFlag){
            ticket.remove();
        }
    })
    

}


// When clicked on ticket color the color should be changed randomly : Use Math.random value
// Math.random did not worked out

// So moving forward with for loop method
function handleColor(ticket){
    let colorDiv=ticket.querySelector(".ticketColor");
    colorDiv.addEventListener("click", (e) => {
        let currentTicketColor=colorDiv.classList[1];
        // Getting color index
        
        let currentTicketColorIdx = allColors.findIndex((color) => {
            return currentTicketColor === color;
        })
        currentTicketColorIdx++;
        let newTicketColorIdx = currentTicketColorIdx % allColors.length;
        let newTicketColor = allColors[newTicketColorIdx];
        colorDiv.classList.remove(currentTicketColor);
        colorDiv.classList.add(newTicketColor);
    })
    
    
    
}
// Locking the ticket area so that editing will be custom.
function handleLock(ticket){
    let lockElem=ticket.querySelector(".lock");
    let lockSwitch=lockElem.children[0];
    let ticketTaskArea=ticket.querySelector(".taskArea");
    lockSwitch.addEventListener("click" , (e) => {
        if(lockSwitch.classList.contains("fa-lock")){
            lockSwitch.classList.remove("fa-lock");
            lockSwitch.classList.add("fa-lock-open");
            ticketTaskArea.setAttribute("contenteditable", "true");
        }
        else{
            lockSwitch.classList.add("fa-lock");
            lockSwitch.classList.remove("fa-lock-open");
            ticketTaskArea.setAttribute("contenteditable", "false");
        }

    })
    
    
}

function setToDefault(){
    setColor =allColors[allColors.length - 1];
    modalConatiner.classList.toggle("modalDisplay");
    textArea.value="";
    priorityColor.forEach((priorityColorElem, idx) => {

            priorityColorElem.classList.remove("defaultBorder");
    })
    priorityColor[priorityColor.length - 1].classList.add("defaultBorder");
}


