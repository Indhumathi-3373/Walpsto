const date = document.getElementById("date");
const input = document.getElementById("content");
const day = document.getElementById("day");
const save = document.getElementById("save");
const subcard = document.getElementById("subcard");
const card = document.getElementById("cards");
const btn2 = document.querySelector(".add-btn");
const btn = document.getElementById("close");

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

const apiBase = getApiBase();
const hasApi = Boolean(apiBase);
let editingId = null;

function renderEntry(entry) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("wrapper");
  wrapper.dataset.id = entry._id;

  const edit = document.createElement("button");
  edit.classList.add("edit");
  edit.textContent = "Edit";

  const dat = document.createElement("span");
  dat.classList.add("entry-date");
  dat.textContent = `Date: ${entry.date} | Day: ${entry.day}`;

  const inp = document.createElement("p");
  inp.classList.add("entry-content");
  inp.textContent = entry.content;

  const del = document.createElement("button");
  del.classList.add("del");
  del.textContent = "Delete";

  const actions = document.createElement("div");
  actions.classList.add("entry-actions");
  actions.appendChild(edit);
  actions.appendChild(del);

  wrapper.appendChild(dat);
  wrapper.appendChild(inp);
  wrapper.appendChild(actions);
  subcard.appendChild(wrapper);

  del.addEventListener("click", async () => {
    try {
      if (!hasApi) {
        alert("Backend is not configured yet.");
        return;
      }
      await fetch(`${apiBase}/frontend/diary/${entry._id}`, {
        method: "DELETE",
        credentials: "include"
      });
      await loadEntries();
    } catch (err) {
      alert("Failed to delete entry");
    }
  });

  edit.addEventListener("click", () => {
    editingId = entry._id;
    date.value = entry.date;
    day.value = entry.day;
    input.value = entry.content;
    card.style.display = "block";
  });
}

async function loadEntries() {
  subcard.innerHTML = "";
  if (!hasApi) {
    if (subcard) {
      subcard.innerHTML = '<p class="empty-state">Backend not configured yet.</p>';
    }
    return;
  }
  try {
    const res = await fetch(`${apiBase}/frontend/diary`, { credentials: "include" });
    const data = await res.json();
    if (data && Array.isArray(data.entries)) {
      data.entries.forEach(renderEntry);
    }
  } catch (err) {
    console.error(err);
  }
}

btn2.addEventListener("click", () => {
  if (!hasApi) {
    alert("Backend is not configured yet.");
    return;
  }
  editingId = null;
  date.value = "";
  day.value = "";
  input.value = "";
  card.style.display = "block";
});

btn.addEventListener("click", () => {
  card.style.display = "none";
});

save.addEventListener("click", async () => {
  if (!hasApi) {
    alert("Backend is not configured yet.");
    return;
  }
  if (input.value.trim() === "" || date.value.trim() === "" || day.value.trim() === "") {
    alert("Please fill all the fields");
    return;
  }

  const payload = {
    date: date.value.trim(),
    day: day.value.trim(),
    content: input.value.trim()
  };

  try {
    const url = editingId
      ? `${apiBase}/frontend/diary/${editingId}`
      : `${apiBase}/frontend/diary`;
    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const err = await res.json();
      alert(err.message || "Failed to save entry");
      return;
    }

    editingId = null;
    card.style.display = "none";
    date.value = "";
    day.value = "";
    input.value = "";
    await loadEntries();
  } catch (err) {
    alert("Failed to save entry");
  }
});

loadEntries();


