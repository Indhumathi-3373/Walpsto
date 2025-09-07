var btn=document.getElementById("btn1")
var email=document.getElementById("email")
var pass=document.getElementById("password")
function login1(){
if(email.value!="" || password.value!=""){
    window.open("Walpsto/login2.html");
}else{
    alert("Invalid credential");
}
}function login2(){
    if(email.value == "" || password.value == ""){
     alert("Invalid credential");
}else{
   window.open("Walpsto/login.html");
}
}