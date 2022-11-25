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
                                <button id=red${index} class=BtnRed>Red</Button>
                                <button id=gold${index} class=BtnGold>Gold</Button>
                                <button id=green${index} class=BtnGreen>Gren</Button>
                                <button id=blue${index} class=BtnBlue>Blue</Button>
                            </div>
                            <div class="note-options">
                                <i id=menu${index} class="fa fa-ellipsis-h"></i>
                                <ul class="menu-options">
                                    <li><i id=editbtn${index} class="fa fa-pencil"></i>Edit</li>
                                    <li><i id=delbtn${index} class="fa fa-trash"></i>Delete</li>
                                </ul>
                            </div>
                        </div>
                    </li>`;
                    addNote.insertAdjacentHTML("afterbegin",listData) //by using rxjs making button event.
                    if(index ==0){//Hardcoding button names for each index because passing the button itself and not button string.
            rxjs.fromEvent(menu0, 'click').subscribe(() => showMenu(menu0));
            rxjs.fromEvent(delbtn0, 'click').subscribe(() => delNote(index));
            rxjs.fromEvent(editbtn0, 'click').subscribe(() => editNote(index, note.Title,note.desc));
            rxjs.fromEvent(red0, 'click').subscribe(() => changeRed(red0.parentNode.parentNode.parentNode.querySelector(".note-details")));
            rxjs.fromEvent(gold0, 'click').subscribe(() => changeGold(gold0.parentNode.parentNode.parentNode.querySelector(".note-details")));
            rxjs.fromEvent(blue0, 'click').subscribe(() => changeBlue(blue0.parentNode.parentNode.parentNode.querySelector(".note-details")));
            rxjs.fromEvent(green0, 'click').subscribe(() => changeGreen(green0.parentNode.parentNode.parentNode.querySelector(".note-details")));
            }
            if(index ==1){
            rxjs.fromEvent(menu1, 'click').subscribe(() => showMenu(menu1));
            rxjs.fromEvent(delbtn1, 'click').subscribe(() => delNote(index));
            rxjs.fromEvent(editbtn1, 'click').subscribe(() => editNote(index, note.Title,note.desc));
            rxjs.fromEvent(red1, 'click').subscribe(() => changeRed(red1.parentNode.parentNode.parentNode.querySelector(".note-details")));
            rxjs.fromEvent(gold1, 'click').subscribe(() => changeGold(gold1.parentNode.parentNode.parentNode.querySelector(".note-details")));
            rxjs.fromEvent(blue1, 'click').subscribe(() => changeBlue(blue1.parentNode.parentNode.parentNode.querySelector(".note-details")));
            rxjs.fromEvent(green1, 'click').subscribe(() => changeGreen(green1.parentNode.parentNode.parentNode.querySelector(".note-details")));
            }
            if(index ==2){
            rxjs.fromEvent(menu2, 'click').subscribe(() => showMenu(menu2));
            rxjs.fromEvent(delbtn2, 'click').subscribe(() => delNote(index));
            rxjs.fromEvent(editbtn2, 'click').subscribe(() => editNote(index, note.Title,note.desc));
            rxjs.fromEvent(red2, 'click').subscribe(() => changeRed(red2.parentNode.parentNode.parentNode.querySelector(".note-details")));
            rxjs.fromEvent(gold2, 'click').subscribe(() => changeGold(gold2.parentNode.parentNode.parentNode.querySelector(".note-details")));
            rxjs.fromEvent(blue2, 'click').subscribe(() => changeBlue(blue2.parentNode.parentNode.parentNode.querySelector(".note-details")));
            rxjs.fromEvent(green2, 'click').subscribe(() => changeGreen(green2.parentNode.parentNode.parentNode.querySelector(".note-details")));
            }
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

function changeRed(findingnote){
    findingnote.className="note-details red";
    }

function changeGold(findingnote){
    findingnote.className="note-details gold";
}
function changeGreen(findingnote){
    findingnote.className="note-details green";
}

function changeBlue(findingnote){
    findingnote.className="note-details blue";
}
rxjs.fromEvent(createBtn, 'click')
        .subscribe(() => add()
        );
function add(){
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
};
