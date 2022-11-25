const addNote = document.querySelector(".displayNote-Container"),
newNote =  document.querySelector(".newNote-Container"),
headingTitle = document.querySelector("h2"),
getTitle = newNote.querySelector("input"),
getTextarea =  newNote.querySelector("textarea"),
createBtn = newNote.querySelector("button"),
notearea = addNote.querySelector(".note-details");

const months=["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
                "Aug", "Sept", "Oct","Nov", "Dec"]; // Months in below function displays in number, hence created an array to display month with Name.

const notes =JSON.parse(sessionStorage.getItem("notes") || "[]") ;//reading sessionstorage to get notes if exists.
let isUpdate=false, updateId; //declaring variables to check if to update or create new.


function showNotes() {
    document.querySelectorAll(".notes").forEach(note=> note.remove());
    notes.forEach((note, index) => {
        let listData= `<li class="notes">
                        <div class="note-details">
                            <p>${note.Title}</p>
                            <span>${note.desc}</span>
                        </div>
                        <div class="note-footer">
                            <span> ${note.date}</span>
                            <div class="note-colour">
                                <label>Choose:</label>
                                <button onClick="changeRed(this)" class=BtnRed>Red</Button>
                                <button onClick="changeGold(this)"class=BtnGold>Gold</Button>
                                <button onClick="ChangeGreen(this)"class=BtnGreen>Gren</Button>
                                <button onClick="changeBlue(this)" class=BtnBlue>Blue</Button>
                            </div>
                            <div class="note-options">
                                <i onclick="showMenu(this)" class="fa fa-ellipsis-h"></i>
                                <ul class="menu-options">
                                    <li><i onClick="editNote(${index}, '${note.Title}','${note.desc}')" class="fa fa-pencil"></i>Edit</li>
                                    <li><i onClick="delNote(${index})" class="fa fa-trash"></i>Delete</li>
                                </ul>
                            </div>
                        </div>
                    </li>`;
            addNote.insertAdjacentHTML("afterbegin",listData) //
    });
}
showNotes()



function showMenu(men){
    men.parentElement.classList.add("show");
    document.addEventListener("click", e => {
        // remove show class from note options class to hide menue. 
        if(e.target.tagName != "I" || e.target != men){
            men.parentElement.classList.remove("show");
        }
    })
}

//menu function, show, edit and delete.
function delNote(noteNo) {
    notes.splice(noteNo, 1); // removing selected note from array
    //saving updated array list to session.
    sessionStorage.setItem("notes", JSON.stringify(notes));//converting notes object to string.
    showNotes()
}

//menu function, edit.
function editNote(noteNo, title, desc) {
    isUpdate=true;
    createBtn.innerText = "Update Note";
    headingTitle.textContent="Update Note";
    getTitle.value=title;
    getTitle.focus();
    getTextarea.value=desc;
    updateId= noteNo;
    console.log(noteNo, title, desc);
}

function changeRed(clr){
    findingnote=clr.parentNode.parentNode.parentNode.querySelector(".note-details");
    findingnote.className="note-details red";
    }

function changeGold(clr){
    findingnote=clr.parentNode.parentNode.parentNode.querySelector(".note-details");
    findingnote.className="note-details gold";
}
function ChangeGreen(clr){
    findingnote=clr.parentNode.parentNode.parentNode.querySelector(".note-details");
    findingnote.className="note-details green";
}

function changeBlue(clr){
    findingnote=clr.parentNode.parentNode.parentNode.querySelector(".note-details");
    findingnote.className="note-details blue";
}
// fetching the data on click from New Note.
//CREATE
createBtn.addEventListener("click", () => {
    let title = getTitle.value,
    notedata = getTextarea.value;

    //if title or notedata is not empty. Else 
    if(title || notedata) {
        //getting current date
        let dateVar = new Date(),
        day= dateVar.getDate(),
        month = months[dateVar.getMonth()],
        year = dateVar.getFullYear();

        let newNoteData = {
            Title: title , 
            desc: notedata,
            date: `${month} ${day} ${year}` // ` is not a single inverted comma
        };
        
        //UPDATE
        // event is for update else.
        if(!isUpdate){
        notes.push(newNoteData); // adding new notes from newNoteData into notes array.
            getTitle.value= '';
            getTitle.focus();
            getTextarea.value= '';
            isUpdate=false;
        } else{
            notes[updateId] = newNoteData; //updating specific id.
            createBtn.innerText = "Add Note";
            headingTitle.textContent="Add New Note";
            getTitle.value= '';
            getTitle.focus();
            getTextarea.value= '';
            isUpdate=false;
        }
        //saving notes onto sessionstorage.
        sessionStorage.setItem("notes", JSON.stringify(notes));//converting notes object to string.
        showNotes()
        console.log(newNoteData);
    } else console.log("Can not be empty")  
});
