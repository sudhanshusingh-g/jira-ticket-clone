let addTicket=document.querySelector(".fa-plus");
let modalConatiner=document.querySelector(".modalContainer");
let mainTicketContainer=document.querySelector(".ticketContainer");
let textArea=document.querySelector("#textArea");

// Get access of all priority colors
let priorityColor=document.querySelectorAll(".priorityColor")

let allColors=["pink","green","yellow","black"];
let setColor =allColors[allColors.length - 1];

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

modalConatiner.addEventListener("keydown", (e) => {
    let key=e.key;
    if(key === "Enter"){
        createTicket(setColor, textArea.value, shortid());
        modalConatiner.classList.toggle("modalDisplay");
        textArea.value="";
    }
})

// Creating a ticket and adding it in the main view.
function createTicket(ticketColor,taskValue,ticketID){
    let ticket=document.createElement("div");
    ticket.setAttribute("class","ticket");
    ticket.innerHTML=`
                <div class="ticketColor ${ticketColor}"></div>
                <div class="ticketId">#${ticketID}</div>
                <div class="taskArea">${taskValue}</div>
                <div class="lock">
                    <i class="fa-solid fa-lock"></i>
                </div>
    `;
    mainTicketContainer.appendChild(ticket);
    
    deleteTicket(ticket);
    handleLock(ticket);
    handleColor(ticket);
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

// Deleting/ removing the tickets
function deleteTicket(ticket){
    let actionBtn=document.querySelector(".actionIcons");
    let deleteBtn=actionBtn.children[1];
    deleteBtn.addEventListener("click", (e) =>{
        let deleteTarget=ticket.querySelector(".lock");
        let deleteIcon=deleteTarget.children[0];
        if(deleteIcon.classList.contains("fa-lock")){
            deleteIcon.classList.remove("fa-lock");
            deleteIcon.classList.add("fa-trash");
            let remove=ticket.querySelector(".fa-trash");
            remove.addEventListener("click", (e) => {
                ticket.remove();
            })

        }
        else{
            deleteIcon.classList.remove("fa-trash");
            deleteIcon.classList.add("fa-lock");
        }
    })
    

}


