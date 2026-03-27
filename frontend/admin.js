const email = document.getElementById('email');
const password = document.getElementById('password');
const submit = document.getElementById('submit');
const loginCard = document.getElementById('admin-login');
const dashboard = document.getElementById('admin-dashboard');
const hint = document.getElementById('admin-hint');
const logout = document.getElementById('admin-logout');
const refresh = document.getElementById('refresh');
const statUsers = document.getElementById('stat-users');
const statDiaries = document.getElementById('stat-diaries');
const statDocs = document.getElementById('stat-docs');
const statActive = document.getElementById('stat-active');
const feedbackList = document.getElementById('admin-feedback');
const feedbackCount = document.getElementById('feedback-count');

const SESSION_KEY = 'walpsto_admin_session';

function getApiBase() {
  const meta = document.querySelector('meta[name="api-base"]');
  const raw = meta && meta.content ? meta.content.trim() : '';
  const cleaned = raw ? raw.replace(/\/$/, '') : '';
  if (cleaned) return cleaned;
  if (window.location.protocol === 'http:' || window.location.protocol === 'https:') {
    return window.location.origin;
  }
  return '';
}

function showDashboard() {
  if (loginCard) loginCard.classList.add('hidden');
  if (dashboard) dashboard.classList.remove('hidden');
  loadAdminData();
}

function showLogin() {
  if (dashboard) dashboard.classList.add('hidden');
  if (loginCard) loginCard.classList.remove('hidden');
}

function hideHint() {
  if (hint) {
    hint.classList.add('hidden');
    hint.textContent = '';
  }
}

function showHint(message) {
  if (hint) {
    hint.textContent = message || 'Invalid credentials';
    hint.classList.remove('hidden');
  }
}

function handleUnauthorized() {
  sessionStorage.removeItem(SESSION_KEY);
  showLogin();
}

if (sessionStorage.getItem(SESSION_KEY) === 'true') {
  showDashboard();
} else {
  showLogin();
}

async function loadAdminData() {
  const apiBase = getApiBase();
  if (!apiBase) {
    if (feedbackList) {
      feedbackList.innerHTML = '<li><p class="feedback-message">Backend not configured yet.</p></li>';
    }
    return;
  }

  try {
    const statsPromise = fetch(`${apiBase}/frontend/admin/stats`, {
      credentials: 'include'
    });
    const feedbackPromise = fetch(`${apiBase}/frontend/admin/feedback`, {
      credentials: 'include'
    });
    const [statsRes, feedbackRes] = await Promise.all([statsPromise, feedbackPromise]);

    if (!statsRes.ok) {
      if (statsRes.status === 401 || statsRes.status === 403) {
        handleUnauthorized();
        return;
      }
    } else {
      const stats = await statsRes.json();
      if (statUsers) statUsers.textContent = stats.users ?? '0';
      if (statDiaries) statDiaries.textContent = stats.diaries ?? '0';
      if (statDocs) statDocs.textContent = stats.documents ?? '0';
      if (statActive) statActive.textContent = stats.activeSessions ?? '0';
      if (feedbackCount) feedbackCount.textContent = `${stats.feedback ?? 0} items`;
    }

    if (!feedbackRes.ok) {
      if (feedbackRes.status === 401 || feedbackRes.status === 403) {
        handleUnauthorized();
        return;
      }
    } else if (feedbackList) {
      const data = await feedbackRes.json();
      const items = Array.isArray(data.feedback) ? data.feedback : [];
      feedbackList.innerHTML = '';
      if (items.length === 0) {
        const empty = document.createElement('li');
        empty.innerHTML = '<p class="feedback-message">No feedback yet.</p>';
        feedbackList.appendChild(empty);
      } else {
        items.forEach((item) => {
          const li = document.createElement('li');
          const name = item.name || 'Anonymous';
          const msg = item.message || '';
          const time = item.createdAt ? new Date(item.createdAt).toLocaleString() : '';
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
      const li = document.createElement('li');
      li.innerHTML = '<p class="feedback-message">Unable to load feedback.</p>';
      feedbackList.appendChild(li);
    }
  }
}

if (submit) {
  submit.addEventListener('click', async (event) => {
    event.preventDefault();
    hideHint();

    const cleanEmail = email?.value.trim() || '';
    const cleanPassword = password?.value.trim() || '';
    if (!cleanEmail || !cleanPassword) {
      showHint('Email and password are required');
      return;
    }

    const apiBase = getApiBase();
    if (!apiBase) {
      showHint('Backend not configured');
      return;
    }

    try {
      const response = await fetch(`${apiBase}/frontend/loginforadmin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          email: cleanEmail,
          password: cleanPassword
        })
      });

      if (response.ok) {
        sessionStorage.setItem(SESSION_KEY, 'true');
        hideHint();
        showDashboard();
      } else {
        const data = await response.json().catch(() => null);
        showHint(data?.message || 'Invalid credentials');
      }
    } catch (err) {
      showHint('Unable to reach server');
    } finally {
      if (email) email.value = '';
      if (password) password.value = '';
    }
  });
}

if (logout) {
  logout.addEventListener('click', () => {
    const apiBase = getApiBase();
    if (apiBase) {
      fetch(`${apiBase}/frontend/logout`, {
        method: 'POST',
        credentials: 'include'
      }).catch(() => {});
    }
    sessionStorage.removeItem(SESSION_KEY);
    showLogin();
  });
}

if (refresh) {
  refresh.addEventListener('click', () => {
    refresh.textContent = 'Refreshing...';
    loadAdminData().finally(() => {
      setTimeout(() => {
        refresh.textContent = 'Refresh View';
      }, 800);
    });
  });
}
