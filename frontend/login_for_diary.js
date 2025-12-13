var emailinp=document.getElementById("email")
const form =document.getElementById("formid")
var passinp=document.getElementById("password")
const errormsg=document.getElementById("error")
const errormsg2=document.getElementById("error1")
const forgot=document.getElementById("f_btn")
const create=document.getElementsByClassName("c_btn")
const emailRegex=/^[^\\s@]+@[^\\s@]+\\. [^\\s@]+$/;
form.addEventListener("submit",async(e)=>{
    const email=emailinp.value.trim()
    const pass_diary=passinp.value.trim()
    if(emailinp.value==="" || emailRegex.test(email)){
         errormsg.style.display="block"
    }else{
        errormsg.style.display="none"
    }
    if(pass_diary.length <= 6){
        errormsg2.style.display="block" 
    }else{
        errormsg2.style.display="none"
    }
    e.preventDefault();

    //sending details to backend

    const res=await fetch("http://localhost:8000/frontend/loginfordiary",{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify({email,pass_diary})
    })
    const response=await res.json();
    if(response.message==="Login Successful"){
    alert("Login successful")}
    if(response.message==="Email not registered please create an account"){
        alert("Email not registered please create an account")
    }if(response.message==="Incorrect Password"){
        alert("Incorrect Password",window.location.href="diary.html")
    }
})
emailinp.addEventListener("focus",(e)=>{
    errormsg.style.display="none"
})
passinp.addEventListener("focus",(e)=>{
    errormsg2.style.display="none"
});