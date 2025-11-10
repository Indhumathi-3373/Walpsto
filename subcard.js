const date = document.getElementById("date")
const input = document.getElementById("content")
const day = document.getElementById("day")
const save = document.getElementById("save")
const subcard=document.getElementById("subcard")
const card=document.getElementById("cards")
save.addEventListener("click", (e) => {
  if (input.value === "" || day.value === "" || date.value === "") {
    alert("please fill all the fields")
  }else{
    card.style.display="none"
    /*const subcard = document.createElement("div")
  subcard.setAttribute("class","container")*/
  subcard.innerHTML =`
  <div id="dat">${date}</div>
  <button id="edit">📝</button>
  <div id="p">${input}</div>
  <button id="del">Delete</button>`
subcard.append(subcard)
  }e.preventDefault();
})
