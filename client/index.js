
const submitForm = document.getElementById("formRegisterSubmitted");
const loginFormSumitted = document.getElementById("loginFormSumitted");
const loginPage = document.getElementById("registerPage");
const homePage = document.getElementById("homePage");

const netesAddingMainContainer = document.getElementById("noteslistContainer");

const addNoteButton = document.getElementById("addNoteButton")

let notesArray = [];

let arraylength = notesArray.length;
console.log(arraylength)

const cookie = document.cookie.split(";");



if(cookie[0] === ""){
    window.location.replace("#loginPage");
}
else{
    window.location.replace("#homePage");
}

async function usersNotesLists (){
    const userInDb =cookie[1].split("=")[1];
    const jwtToken = cookie[0].split("=")[1]
    if(userInDb){
        const options = {
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                authorization:`Bearer ${jwtToken}`
            },
            
           }
        const response = await fetch(`http://localhost:3000/getUserData/${userInDb}`,options)
        const dataNotes = await response.json();
        if(response.status === 200){
            notesArray= dataNotes.result.notesList
            
        }
        
    }
}
usersNotesLists();


async function registartion(event){
    const email = document.getElementById("name");
    const password = document.getElementById("password");
    if(email.value !== "" && password.value !== ""){
        const userDetails = {
            userName:email.value,
            password:password.value,
            notesList:[]
        }
       const options = {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(userDetails)
       }

       const response = await fetch("http://localhost:3000/register",options);
       const data = await response.json();
       if(response.status === 200){
        window.location.replace("#loginPage");
       }
       
    }
    

}

submitForm.addEventListener("submit",registartion)


async function loginSubmit(event){
    const email = document.getElementById("nameLogin")
    const password = document.getElementById("passwordLogin")
    if(email.value !== "" && password.value !== ""){
        const userDetails = {
            userName:email.value,
            password:password.value
        }
       const options = {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(userDetails)
       }

       const response = await fetch("http://localhost:3000/login",options)
       const data = await response.json();
       
       if(response.status === 200){
            
            document.cookie = `jwtToken=${data.jwtToken}; expires=30;`;
            document.cookie = `userName=${data.userName}; expires=30;`;
            window.location.replace("#homePage")
       }
       
       
    }
    

}

loginFormSumitted.addEventListener("submit",loginSubmit)

async function addingNotes(){
    
    const userInDb =cookie[1].split("=")[1];
    const jwtToken = cookie[0].split("=")[1]
    const titleNotes = document.getElementById("titleNotes");
    const notesText = document.getElementById("notesText");
    if(notesText.value !== "" && titleNotes !== ""){
        const div = document.createElement("div");
        div.classList.add("writing-notes-styles")
        const p = document.createElement("p");
        p.textContent = titleNotes.value;
        const p1 = document.createElement("p");
        p1.textContent=notesText.value;
        div.appendChild(p);
        div.appendChild(p1)
        netesAddingMainContainer.appendChild(div)
        arraylength += 1;
        const notesDetails = {id:arraylength,title:titleNotes.value,notes:notesText.value}
        
        const options = {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            authorization:`Bearer ${jwtToken}`
        },
        body:JSON.stringify(notesDetails)
       }

       const response = await fetch(`http://localhost:3000/upload-notes/${userInDb}`,options)
       const data = await response.json();
       

       

    }

}


addNoteButton.addEventListener("click",addingNotes)


