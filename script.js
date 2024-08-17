import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-database.js"

const firebaseConfig = {
    databaseURL:"https://track-birthdays-default-rtdb.asia-southeast1.firebasedatabase.app/"
}
const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const referenceInDB = ref(database, "all birthdays")


const inputEl = document.getElementById("input-el")
const submitBtn = document.getElementById("submitBtn")
const ulEl = document.getElementById("ul-el")

submitBtn.addEventListener("click",()=>{
    push(referenceInDB, inputEl.value)
    inputEl.value=""

})

function renderBirthdays(bdays){
    let birthdaysList=""
    for(let i=0; i<bdays.length; i++){
        birthdaysList+=`
        <li>
            <a target="_blank" href="${bdays[i]}">
                ${bdays[i]}
            </a>
        </li>`
    }
    ulEl.innerHTML=birthdaysList
}

onValue(referenceInDB, (snapshot)=>{
    const isSnapshot = snapshot.exists()
    if(isSnapshot){
        const getSnapshot = snapshot.val()
        const allbdays = Object.values(getSnapshot)
        renderBirthdays(allbdays)
    }
})

