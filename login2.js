const emailinp = document.getElementById("email2")
const form = document.getElementById("formid")
const passinp = document.getElementById("input1")
const errormsg = document.getElementById("error")
const errormsg2 = document.getElementById("error1")
const emailRegex = /^[^\\s@]+@[^\\s@]+\\. [^\\s@]+$/;
form.addEventListener("submit", (e) => {
    const email = emailinp.value.trim()
    const pass = passinp.value.trim()
    if(emailinp.value===""){
        errormsg.style.display="block"
    }else{
        errormsg.style.display="none"
    }if(pass.length<=6){
        errormsg2.style.display="block"
    }if(pass.length>6 && emailinp.value != ""){
       window.open("Documentation.html") 
    }e.preventDefault();
    } 
    )
emailinp.addEventListener("focus",(e)=>{
    errormsg.style.display="none"
})
passinp.addEventListener("focus",(e)=>{
    errormsg2.style.display="none"
})


