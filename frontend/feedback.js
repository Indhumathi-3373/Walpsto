const fName = document.getElementById("f_name");
const feedback = document.getElementById("f_feed");
const submit = document.getElementById("f_sub");

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

if (submit) {
    submit.addEventListener("click", async () => {
        if (!fName.value || !feedback.value) {
            alert("Please fill all fields before submitting.");
            return;
        }
        try {
            const apiBase = getApiBase();
            if (!apiBase) {
                alert("Backend is not configured yet.");
                return;
            }
            const res = await fetch(`${apiBase}/frontend/feedback`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: fName.value, message: feedback.value })
            });
            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                const message = data.message || "Unable to send feedback right now.";
                throw new Error(message);
            }
            alert("Thanks for your feedback!");
            fName.value = "";
            feedback.value = "";
        } catch (err) {
            alert(err.message || "Unable to send feedback right now.");
        }
    });
}


