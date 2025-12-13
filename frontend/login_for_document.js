const emailinp = document.getElementById("email2")
const form = document.getElementById("formid")
const passinp = document.getElementById("input1")
const errormsg = document.getElementById("error")
const errormsg2 = document.getElementById("error1")

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = emailinp.value.trim()
    const pass_doc = passinp.value.trim()

    if (emailinp.value === "") {
        errormsg.style.display = "block"  
    } else {
        errormsg.style.display = "none"
    }
    if (pass_doc.length <= 6) {
        errormsg2.style.display = "block" 
    } else {
        errormsg2.style.display = "none"
    }
        const res = await fetch("http://localhost:8000/frontend/loginfordocument",{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, pass_doc })
        })
        const backend_res = await res.json()
        if (backend_res.message === "Login successful") {
            alert("Login successful")
            window.location.href = "documentation.html"
        }else{
        alert(backend_res.message)}
})

emailinp.addEventListener("focus", () => {
    errormsg.style.display = "none"
})

passinp.addEventListener("focus", () => {
    errormsg2.style.display = "none"
})


