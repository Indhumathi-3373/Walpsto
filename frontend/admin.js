const email = document.getElementById("email");
const password = document.getElementById("password");
const submit = document.getElementById("submit");
const loginCard = document.getElementById("admin-login");
const dashboard = document.getElementById("admin-dashboard");
const hint = document.getElementById("admin-hint");
const logout = document.getElementById("admin-logout");
const refresh = document.getElementById("refresh");
const statUsers = document.getElementById("stat-users");
const statDiaries = document.getElementById("stat-diaries");
const statDocs = document.getElementById("stat-docs");
const statActive = document.getElementById("stat-active");
const feedbackList = document.getElementById("admin-feedback");
const feedbackCount = document.getElementById("feedback-count");

const ADMIN_EMAIL = "indhumathi93428@gmail.com";
const ADMIN_PASS = "indhu123456";
const SESSION_KEY = "walpsto_admin_session";

function getApiBase() {
    const meta = document.querySelector('meta[name="api-base"]');
    return meta && meta.content ? meta.content.replace(/\/$/, "") : "";
}

function showDashboard() {
    if (loginCard) loginCard.classList.add("hidden");
    if (dashboard) dashboard.classList.remove("hidden");
    loadAdminData();
}

function showLogin() {
    if (dashboard) dashboard.classList.add("hidden");
    if (loginCard) loginCard.classList.remove("hidden");
}

if (sessionStorage.getItem(SESSION_KEY) === "true") {
    showDashboard();
} else {
    showLogin();
}

async function loadAdminData() {
    try {
        const apiBase = getApiBase();
        if (!apiBase) {
            if (feedbackList) {
                feedbackList.innerHTML = "<li><p class=\"feedback-message\">Backend not configured yet.</p></li>";
            }
            return;
        }
        const [statsRes, feedbackRes] = await Promise.all([
            fetch(`${apiBase}/frontend/admin/stats`),
            fetch(`${apiBase}/frontend/admin/feedback`)
        ]);
        if (statsRes.ok) {
            const stats = await statsRes.json();
            if (statUsers) statUsers.textContent = stats.users ?? "0";
            if (statDiaries) statDiaries.textContent = stats.diaries ?? "0";
            if (statDocs) statDocs.textContent = stats.documents ?? "0";
            if (statActive) statActive.textContent = stats.activeSessions ?? "0";
            if (feedbackCount) feedbackCount.textContent = `${stats.feedback ?? 0} items`;
        }
        if (feedbackRes.ok && feedbackList) {
            const data = await feedbackRes.json();
            const items = Array.isArray(data.feedback) ? data.feedback : [];
            feedbackList.innerHTML = "";
            if (items.length === 0) {
                const empty = document.createElement("li");
                empty.innerHTML = `<p class="feedback-message">No feedback yet.</p>`;
                feedbackList.appendChild(empty);
            } else {
                items.forEach((item) => {
                    const li = document.createElement("li");
                    const name = item.name || "Anonymous";
                    const msg = item.message || "";
                    const time = item.createdAt ? new Date(item.createdAt).toLocaleString() : "";
                    li.innerHTML = `
                        <p class="feedback-name">${name}</p>
                        <p class="feedback-message">${msg}</p>
                        <p class="feedback-time">${time}</p>
                    `;
                    feedbackList.appendChild(li);
                });
            }
        }
    } catch (err) {
        if (feedbackList && feedbackList.childElementCount === 0) {
            const li = document.createElement("li");
            li.innerHTML = `<p class="feedback-message">Unable to load feedback.</p>`;
            feedbackList.appendChild(li);
        }
    }
}

if (submit) {
    submit.addEventListener("click", () => {
        const cleanEmail = email.value.replace(/\s+/g, "");
        const cleanPassword = password.value.replace(/\s+/g, "");
        const isValid = cleanEmail === ADMIN_EMAIL && cleanPassword === ADMIN_PASS;
        if (isValid) {
            sessionStorage.setItem(SESSION_KEY, "true");
            if (hint) hint.classList.add("hidden");
            showDashboard();
        } else if (hint) {
            hint.classList.remove("hidden");
        }
        email.value = "";
        password.value = "";
    });
}

if (logout) {
    logout.addEventListener("click", () => {
        sessionStorage.removeItem(SESSION_KEY);
        showLogin();
    });
}

if (refresh) {
    refresh.addEventListener("click", () => {
        refresh.textContent = "Refreshing...";
        loadAdminData().finally(() => {
            setTimeout(() => {
                refresh.textContent = "Refresh View";
            }, 800);
        });
    });
}


