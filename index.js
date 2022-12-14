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
    //document.querySelectorAll(".notes").forEach(note=> note.remove());
    notes.forEach((note, index) => {
        //let notesContainer = document.getElementById("displayNote-Container");
        let thisnote = document.createElement('li');
        thisnote.setAttribute("class", "notes");
        //notesContainer.appendChild(thisnote)
        addNote.appendChild(thisnote)
        const notedetails = document.createElement('div');
        notedetails.setAttribute("class", "note-details");
        thisnote.appendChild(notedetails)

        const title = document.createElement('p');
        title.innerHTML=note.Title;
        notedetails.appendChild(title)

        const desc = document.createElement('span');
        desc.innerHTML=note.Title;
        notedetails.appendChild(desc)

        const notefooter = document.createElement('div');
        notedetails.setAttribute("class", "note-footer");
        thisnote.appendChild(notefooter)
        const date = document.createElement('span');
        notefooter.appendChild(date)

        const notecolor = document.createElement('div');
        notedetails.setAttribute("class", "note-colour");
        notefooter.appendChild(notecolor)

        const red = document.createElement('button');
        red.innerHTML = "Red";
        red.setAttribute("class", "BtnRed");
        red.setAttribute("id", "red" + index);
        notecolor.appendChild(red)

        const blue = document.createElement('button');
        blue.innerHTML = "Blue";
        blue.setAttribute("class", "BtnBlue");
        blue.setAttribute("id", "blue" + index);
        notecolor.appendChild(blue)

        const green = document.createElement('button');
        green.innerHTML = "Green";
        green.setAttribute("class", "BtnGreen");
        green.setAttribute("id", "green" + index);
        notecolor.appendChild(green)

        const noteoptions = document.createElement('div');
        noteoptions.setAttribute("class", "note-options");
        notefooter.appendChild(noteoptions)

        const menu = document.createElement('i');
        menu.setAttribute("id", "menu" + index);
        menu.setAttribute("class", "fa fa-ellipsis-h");
        noteoptions.appendChild(menu)

        const menuoptions = document.createElement('ul');
        menuoptions.setAttribute("class", "menu-options");
        noteoptions.appendChild(menuoptions)

        const editbtn = document.createElement('button');
        editbtn.innerHTML = "Edit";
        editbtn.setAttribute("id", "editbtn" + index);
        editbtn.setAttribute("class", "fa fa-pencil");
        menuoptions.appendChild(editbtn)

        const deletebtn = document.createElement('button');
        deletebtn.innerHTML = "Delete";
        deletebtn.setAttribute("id", "deletebtn" + index);
        deletebtn.setAttribute("class", "fa fa-trash");
        menuoptions.appendChild(deletebtn)

        rxjs.fromEvent(menu, 'click').subscribe(() => showMenu(menu));
        rxjs.fromEvent(deletebtn, 'click').subscribe(() => delNote(index));
        rxjs.fromEvent(editbtn, 'click').subscribe(() => editNote(index, note.Title,note.desc));
        rxjs.fromEvent(red, 'click').subscribe(() => changeRed(notedetails));
        rxjs.fromEvent(blue, 'click').subscribe(() => changeBlue(notedetails));
        rxjs.fromEvent(green, 'click').subscribe(() => changeGreen(notedetails));
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
