const plus = document.getElementById('plus');
const files = document.getElementById('files');
const dropdown = document.getElementById('dropdown');
const menuButton = document.getElementById('menu-button');

function getApiBase() {
  const meta = document.querySelector('meta[name="api-base"]');
  return meta && meta.content ? meta.content.replace(/\/$/, "") : "";
}

const apiBase = getApiBase();
const hasApi = Boolean(apiBase);

if (menuButton && dropdown) {
  menuButton.addEventListener('click', () => {
    dropdown.classList.toggle('hidden');
  });

  window.addEventListener('click', (e) => {
    if (!menuButton.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.add('hidden');
    }
  });
}

const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.className = 'file-input';
document.body.appendChild(fileInput);

function renderDoc(doc) {
  const tile = document.createElement('div');
  tile.className = 'file-tile';
  tile.dataset.id = doc._id;

  const icon = document.createElement('div');
  icon.className = 'file-icon';
  icon.textContent = 'DOC';

  const label = document.createElement('div');
  label.className = 'file-label';
  label.textContent = doc.originalName;

  const actions = document.createElement('div');
  actions.className = 'file-actions';

  const openBtn = document.createElement('button');
  openBtn.className = 'file-action';
  openBtn.textContent = 'Open';

  const delBtn = document.createElement('button');
  delBtn.className = 'file-action danger';
  delBtn.textContent = 'Delete';

  actions.appendChild(openBtn);
  actions.appendChild(delBtn);

  tile.appendChild(icon);
  tile.appendChild(label);
  tile.appendChild(actions);
  files.appendChild(tile);

  openBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!hasApi) {
      alert('Backend is not configured yet.');
      return;
    }
    window.open(`${apiBase}${doc.fileUrl}`, '_blank');
  });

  delBtn.addEventListener('click', async (e) => {
    e.stopPropagation();
    if (!hasApi) {
      alert('Backend is not configured yet.');
      return;
    }
    await fetch(`${apiBase}/frontend/documents/${doc._id}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    await loadDocs();
  });
}

async function loadDocs() {
  files.innerHTML = '';
  if (!hasApi) {
    if (files) {
      files.innerHTML = '<p class="empty-state">Backend not configured yet.</p>';
    }
    return;
  }
  try {
    const res = await fetch(`${apiBase}/frontend/documents`, { credentials: 'include' });
    const data = await res.json();
    if (data && Array.isArray(data.documents)) {
      data.documents.forEach(renderDoc);
    }
  } catch (err) {
    console.error(err);
  }
}

plus.addEventListener('click', () => {
  if (!hasApi) {
    alert('Backend is not configured yet.');
    return;
  }
  fileInput.value = '';
  fileInput.click();
});

fileInput.addEventListener('change', async () => {
  if (!fileInput.files.length) return;
  if (!hasApi) {
    alert('Backend is not configured yet.');
    return;
  }
  const formData = new FormData();
  formData.append('file', fileInput.files[0]);

  try {
    const res = await fetch(`${apiBase}/frontend/documents`, {
      method: 'POST',
      body: formData,
      credentials: 'include'
    });
    if (!res.ok) {
      const err = await res.json();
      alert(err.message || 'Upload failed');
      return;
    }
    await loadDocs();
  } catch (err) {
    alert('Upload failed');
  }
});

loadDocs();


