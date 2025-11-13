var email=document.getElementById("email")
const password=document.getElementById("password")
const submit=document.getElementById("submit")
submit.addEventListener("click",()=>{
    if(email.value==="indhumathi93428@gmail.com" && password.value==="indhu123456"){
        alert("verified you are admin ✅")
    }else{
        alert("oops, you dont have access!")
    }
})