const form=document.getElementById('form')

form.addEventListener("submit", async(e) => {
e.preventDefault();
const email=document.getElementById('email').value;
const pass_diary=document.getElementById('password_diary').value
const pass_doc=document.getElementById('password_doc').value

if(pass_diary.length <=6 ){
    alert("password must be more then 6 characters")
}if(pass_doc.length <=6 ){
    alert("password must be more then 6 characters")
}

const res=await fetch("http://localhost:8000/frontend/create_account",{
    method:"POST",
    headers:{"content-type":"application/json"},
    body:JSON.stringify({email,pass_diary,pass_doc})//converts js object into json string
});
 const data=await res.json();

//for alert


 if(data.message==="email already registered"){
     alert("user already exists! please login ")
     return;
 }
 if(data.message==="account created successfully"){
    alert("account created successfully")
     window.location.href="home.html";
}
});