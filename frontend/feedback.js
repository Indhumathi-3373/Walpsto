const fName = document.getElementById("f_name");
const feedback = document.getElementById("f_feed");
const submit = document.getElementById("f_sub");

if (submit) {
    submit.addEventListener("click", async () => {
        if (!fName.value || !feedback.value) {
            alert("Please fill all fields before submitting.");
            return;
        }
        try {
            const apiBase = `${location.protocol}//${location.hostname}:8000`;
            const res = await fetch(`${apiBase}/frontend/feedback`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: fName.value, message: feedback.value })
            });
            if (!res.ok) {
                throw new Error("Request failed");
            }
            alert("Thanks for your feedback!");
            fName.value = "";
            feedback.value = "";
        } catch (err) {
            alert("Unable to send feedback right now.");
        }
    });
}
