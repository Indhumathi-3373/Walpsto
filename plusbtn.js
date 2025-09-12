const btn = document.getElementById("close");
const div  = document.getElementById("cards");
const btn2=document.querySelector(".add-btn");
btn2.addEventListener("click",()=>{
  div.style.display="block"
})
btn.addEventListener("click",()=>{
    div.style.display = "none"
})