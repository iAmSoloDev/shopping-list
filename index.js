import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://realtime-database-e2804-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const itemsInDB = ref(database, "items");

const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-btn");
const itemsEl = document.getElementById("items");

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value;
    
    push (itemsInDB, inputValue)
    
    clearInputFieldEl()  
})



onValue(itemsInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())

        clearitemsEl()

        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValues = currentItem[1]

            addItemsEl(currentItem);
        }
    } else {
        itemsEl.innerHTML = "Your cart is empty"
    }
    
})

function clearitemsEl() {
    itemsEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function addItemsEl(item) {
    // itemsEl.innerHTML += `<li>${itemValue}</li>`
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")

    newEl.textContent = itemValue
    
    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `items/${itemID}`)
        remove(exactLocationOfItemInDB)
    })

    itemsEl.append(newEl)
}