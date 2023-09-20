let addTicket=document.querySelector(".fa-plus");
let modalConatiner=document.querySelector(".modalContainer");
let lock=document.querySelector(".fa-lock");
let mainTicketContainer=document.querySelector(".ticketContainer");
let textArea=document.querySelector("#textArea");

// Event Listener for modal display to add content
addTicket.addEventListener("click",(e) => {
    // Toggle Display of modal
    modalConatiner.classList.toggle("modalDisplay");
    
});

modalConatiner.addEventListener("keydown", (e) => {
    let key=e.key;
    if(key === "Enter"){
        createTicket();
        modalConatiner.classList.toggle("modalDisplay");
        textArea.value="";
    }
})

// Creating a ticket and adding it in the main view.
function createTicket(){
    let ticket=document.createElement("div");
    ticket.setAttribute("class","ticket");
    ticket.innerHTML=`
                <div class="ticketColor"></div>
                <div class="ticketId">#id</div>
                <div class="taskArea">Lorem ipsum dolor sit amet consectetur aptio officiis eos voluptatum nobis tenetur doloribus hic atque expedita ullam ab eligendi aliquid dolore veritatis</div>
                <div class="lock">
                    <i class="fa-solid fa-lock"></i>
                </div>
    `;
    mainTicketContainer.appendChild(ticket);
}

// Locking the ticket area so that editing will be custom.
lock.addEventListener("click",(e) => {
    // toggle lock state: open/closed
    lock.classList.toggle("fa-lock-open");
});

