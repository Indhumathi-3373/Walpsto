const f_name=document.getElementById("f_name")
const feedback=document.getElementById("f_feed")
const submit=document.getElementById("f_sub")
submit.addEventListener("click",(e)=>{
    if(f_name.value ==="" || feedback.value===""){
        alert("please fill all fields before submit 📌")
    }else{
        alert("Thanks for your feedback! 🥰")
    }
})