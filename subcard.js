const date = document.getElementById("date")
const input = document.getElementById("content")
const day = document.getElementById("day")
const save = document.getElementById("save")
const cards=document.getElementById("cards")
const subcard=document.getElementsByClassName("subcard")
save.addEventListener("click", () => {
  if (input.value === "" || day.value === "" || date.value === "") {
    alert("please fill all the fields")
  }else{
    cards.style.display="none"
  const subcard = document.createElement("div")
  subcard.className = "subcard";
  subcard.innerHTML =`
  <div id="card-content">${input}</div>
  <div id="date-day">${date}|${day}</div>
  <div id="btn-card">
  <button id="edit">📝</button>
  <button id="delete">🗑️</button>
  </div>
`
  }

})
