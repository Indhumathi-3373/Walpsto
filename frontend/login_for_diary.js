var emailinp=document.getElementById("email")
const form =document.getElementById("formid")
var passinp=document.getElementById("password")
const errormsg=document.getElementById("error")
const errormsg2=document.getElementById("error1")

function getApiBase() {
    const meta = document.querySelector('meta[name="api-base"]');
    const raw = meta && meta.content ? meta.content.trim() : "";
    const cleaned = raw ? raw.replace(/\/$/, "") : "";
    if (cleaned) return cleaned;
    if (window.location.protocol === "http:" || window.location.protocol === "https:") {
        return window.location.origin;
    }
    return "";
}

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

    const apiBase = getApiBase();
    if (!apiBase) {
        alert("Backend is not configured yet.");
        return;
    }
    const res=await fetch(`${apiBase}/frontend/loginfordiary`,{
        method:"POST",
        headers:{"content-type":"application/json"},
        credentials: "include",
        body:JSON.stringify({email,pass_diary})
    })
    let response = {};
    const contentType = res.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
        response = await res.json();
    } else {
        alert("Login failed. Please try again.");
        return;
    }
    if(response.message==="Login Successful"){
        
    alert("Login successful",window.location.href="diary.html");
    emailinp.value="";
        passinp.value="";
}

    if(response.message==="Email not registered please create an account"){
        alert("Email not registered please create an account")
        emailinp.value=""
        passinp.value=""
    }if(response.message==="Incorrect Password"){
        alert("Incorrect Password")
        emailinp.value=""
        passinp.value=""
    }
})
emailinp.addEventListener("focus",(e)=>{
    errormsg.style.display="none"
})
passinp.addEventListener("focus",(e)=>{
    errormsg2.style.display="none"
});


