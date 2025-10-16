function change(e) {
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const error = document.getElementById("error");
    const error1 = document.getElementById("error1");
    // Clear previous error messages
    error.textContent = "";
    error1.textContent = "";
    let valid = true;
    // Email validation
    if (!email.value) {
        error.textContent = "*Please enter your email id";
        error.style.color = "red";
        valid = true;
    }
    // Password validation
    if (!password.value) {
        error1.textContent = "*Please enter your password";
        error1.style.color = "red";
        valid = true;
     if (password.value.length < 6) {
        error1.textContent = "*Password must be at least 6 characters";
        error1.style.color = "red";
        valid = true;
        if(password.value.length>=6){
            error1.textContent="none";
        }
    }
}
    return valid;
    e.preventDefault();
}
