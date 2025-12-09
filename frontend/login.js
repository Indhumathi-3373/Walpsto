var emailinp=document.getElementById("email")
const form =document.getElementById("formid")
var passinp=document.getElementById("password")
const errormsg=document.getElementById("error")
const errormsg2=document.getElementById("error1")
const forgot=document.getElementById("f_btn")
const create=document.getElementsByClassName("c_btn")
const emailRegex=/^[^\\s@]+@[^\\s@]+\\. [^\\s@]+$/;
form.addEventListener("submit",(e)=>{
    var email=emailinp.value.trim()
    var password=passinp.value.trim()
    if(emailinp.value==="" || emailRegex.test(email)){
         errormsg.style.display="block"
    }else{
        errormsg.style.display="none"
    }
    if(password.length <= 6){
        errormsg2.style.display="block" 
    }else{
        errormsg2.style.display="none"
    }
    if(password.length > 6 && emailinp.value !="" ){
        window.open("diary.html")
    }
    e.preventDefault();
})
emailinp.addEventListener("focus",(e)=>{
    errormsg.style.display="none"
})
passinp.addEventListener("focus",(e)=>{
    errormsg2.style.display="none"
})

