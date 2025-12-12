const date = document.getElementById("date");
const input = document.getElementById("content");
const day = document.getElementById("day");
const save = document.getElementById("save");
const subcard = document.getElementById("subcard");
const card = document.getElementById("cards");
const btn2=document.querySelector(".add-btn");
const btn = document.getElementById("close");

btn2.addEventListener("click",()=>{
  card.style.display="block"
})
btn.addEventListener("click",()=>{
    card.style.display = "none"
})

save.addEventListener("click", (e) => {
  if (input.value.trim() !== "" || date.value.trim() !== "") {
    
    // Creating wrapper div
    const wrapper = document.createElement("div");
    wrapper.classList.add("wrapper"); 

    // Edit button
    const edit = document.createElement("button");
    edit.classList.add("edit");
    edit.textContent = "📝";

    // Date
    const dat = document.createElement("span");
    dat.classList.add("entry-date");
    dat.innerHTML = `📅 : ${date.value} &nbsp;`;

    // Input content
    const inp = document.createElement("p");
    inp.classList.add("entry-content");
    inp.innerHTML = `${input.value} <br>`;

    // Delete button
    const del = document.createElement("button");
    del.classList.add("del");
    del.textContent = "Delete";
    
    
    // Append elements
    wrapper.appendChild(dat);
    wrapper.appendChild(edit);
    wrapper.appendChild(inp);
    wrapper.appendChild(del);
    subcard.appendChild(wrapper);

    // Clear input fields
    date.value = "";
    input.value = "";
    day.value = "";

    // Delete functionality
    del.addEventListener("click", () => {
      subcard.removeChild(wrapper);
      
    });

    // Edit functionality
    edit.addEventListener("click", () => {
      input.value = inp.textContent; // load current content
      date.value = date.value; // you can add day if needed
      subcard.removeChild(wrapper); // remove current entry to edit
      card.style.display = "block";
    });

    // hide form after saving
    card.style.display = "none";
  } else {
    alert("Please fill all the fields");
  }
});