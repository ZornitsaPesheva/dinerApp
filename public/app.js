const form = document.querySelector('#dish-form');
const nameInput = document.querySelector('#dish-name');
const notesInput = document.querySelector('#dish-notes');
const messageElement = document.querySelector('#form-message');
const dishesContainer = document.querySelector('#dishes');
const suggestionsContainer = document.querySelector('#suggestions');
const refreshButton = document.querySelector('#refresh-button');
const dishTemplate = document.querySelector('#dish-template');
const suggestionTemplate = document.querySelector('#suggestion-template');
const appShell = document.querySelector('#app-shell');
const authMessageElement = document.querySelector('#auth-message');
const googleSigninContainer = document.querySelector('#google-signin');
const authUserElement = document.querySelector('#auth-user');
const userAvatarElement = document.querySelector('#user-avatar');
const userNameElement = document.querySelector('#user-name');
const userEmailElement = document.querySelector('#user-email');
const logoutButton = document.querySelector('#logout-button');

const state = {
  googleClientId: '',
  user: null
};

let googleButtonInitialized = false;

async function requestJson(url, options = {}) {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json'
    },
    ...options
  });

  const payload = await response.json();

  if (!response.ok) {
    const error = new Error(payload.error || 'Заявката не успя.');
    error.status = response.status;
    throw error;
  }

  return payload;
}

function formatDate(dateString) {
  if (!dateString) {
    return 'Още не е готвена';
  }

  return new Intl.DateTimeFormat('bg-BG', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(new Date(dateString));
}

function setMessage(text, type = '') {
  messageElement.textContent = text;
  messageElement.className = `message ${type}`.trim();
}

function setAuthMessage(text, type = '') {
  authMessageElement.textContent = text;
  authMessageElement.className = `message ${type}`.trim();
}

function setAppVisibility(isVisible) {
  appShell.hidden = !isVisible;
}

function clearDishUi() {
  suggestionsContainer.innerHTML = '';
  dishesContainer.innerHTML = '';
  setMessage('');
}

function renderGoogleButton() {
  if (!state.googleClientId) {
    googleSigninContainer.innerHTML = '<p class="message error">Липсва GOOGLE_CLIENT_ID на сървъра.</p>';
    return;
  }

  if (!window.google || !window.google.accounts?.id) {
    googleSigninContainer.innerHTML = '<p class="message">Зареждане на Google вход...</p>';
    window.setTimeout(() => {
      if (!state.user) {
        renderAuthState();
      }
    }, 300);
    return;
  }

  if (!googleButtonInitialized) {
    window.google.accounts.id.initialize({
      client_id: state.googleClientId,
      callback: handleGoogleCredentialResponse
    });
    googleButtonInitialized = true;
  }

  googleSigninContainer.innerHTML = '';
  window.google.accounts.id.renderButton(googleSigninContainer, {
    theme: 'outline',
    size: 'large',
    shape: 'pill',
    text: 'signin_with',
    locale: 'bg'
  });
}

function renderAuthState() {
  const isAuthenticated = Boolean(state.user);

  logoutButton.hidden = !isAuthenticated;
  authUserElement.hidden = !isAuthenticated;
  googleSigninContainer.hidden = isAuthenticated;

  if (isAuthenticated) {
    userNameElement.textContent = state.user.name || 'Google потребител';
    userEmailElement.textContent = state.user.email || '';

    if (state.user.picture) {
      userAvatarElement.src = state.user.picture;
      userAvatarElement.hidden = false;
    } else {
      userAvatarElement.hidden = true;
      userAvatarElement.removeAttribute('src');
    }

    setAuthMessage('');
    return;
  }

  userNameElement.textContent = '';
  userEmailElement.textContent = '';
  userAvatarElement.hidden = true;
  userAvatarElement.removeAttribute('src');
  renderGoogleButton();
}

async function resetSession(message = '', type = '') {
  state.user = null;
  setAppVisibility(false);
  clearDishUi();
  renderAuthState();
  setAuthMessage(message, type);
}

function renderSuggestions(suggestions) {
  suggestionsContainer.innerHTML = '';

  if (suggestions.length === 0) {
    suggestionsContainer.innerHTML = '<div class="empty-state">Добави рецепти, за да видиш предложения.</div>';
    return;
  }

  const labels = ['1. Най-отдавна готвена', '2. Най-рядко готвена'];

  suggestions.forEach((dish, index) => {
    const fragment = suggestionTemplate.content.cloneNode(true);
    fragment.querySelector('.suggestion-label').textContent = labels[index] || 'Предложение';
    fragment.querySelector('.suggestion-name').textContent = dish.name;
    fragment.querySelector('.suggestion-meta').textContent =
      `${dish.cookCount} готвения • Последно: ${formatDate(dish.lastCookedAt)}`;
    suggestionsContainer.appendChild(fragment);
  });
}

function renderDishes(dishes) {
  dishesContainer.innerHTML = '';

  if (dishes.length === 0) {
    dishesContainer.innerHTML = '<div class="empty-state">Списъкът е празен. Добави първата манджа.</div>';
    return;
  }

  dishes
    .slice()
    .sort((left, right) => left.name.localeCompare(right.name, 'bg'))
    .forEach(dish => {
      const fragment = dishTemplate.content.cloneNode(true);
      fragment.querySelector('.dish-name').textContent = dish.name;
      fragment.querySelector('.dish-notes').textContent = dish.notes || 'Няма бележки.';
      fragment.querySelector('.count-pill').textContent = `Готвена ${dish.cookCount} пъти`;
      fragment.querySelector('.last-pill').textContent = `Последно: ${formatDate(dish.lastCookedAt)}`;
      fragment.querySelector('.cook-button').addEventListener('click', async () => {
        try {
          const data = await requestJson(`/api/dishes/${dish.id}/cook`, { method: 'POST' });
          renderSuggestions(data.suggestions);
          renderDishes(data.dishes);
        } catch (error) {
          if (error.status === 401) {
            await resetSession('Сесията изтече. Влез отново с Google.', 'error');
            return;
          }

          setMessage(error.message, 'error');
        }
      });
      dishesContainer.appendChild(fragment);
    });
}

async function loadData() {
  try {
    const data = await requestJson('/api/dishes');
    renderSuggestions(data.suggestions);
    renderDishes(data.dishes);
  } catch (error) {
    if (error.status === 401) {
      await resetSession('Сесията изтече. Влез отново с Google.', 'error');
      return;
    }

    throw error;
  }
}

async function handleGoogleCredentialResponse(response) {
  try {
    const session = await requestJson('/api/auth/google', {
      method: 'POST',
      body: JSON.stringify({ credential: response.credential })
    });
    state.googleClientId = session.googleClientId || state.googleClientId;
    state.user = session.user;
    renderAuthState();
    setAppVisibility(true);
    await loadData();
    setMessage('');
  } catch (error) {
    setAuthMessage(error.message, 'error');
  }
}

form.addEventListener('submit', async event => {
  event.preventDefault();
  setMessage('');

  const payload = {
    name: nameInput.value,
    notes: notesInput.value
  };

  try {
    const data = await requestJson('/api/dishes', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    form.reset();
    renderSuggestions(data.suggestions);
    renderDishes(data.dishes);
    setMessage('Манджата е добавена.', 'success');
    nameInput.focus();
  } catch (error) {
    if (error.status === 401) {
      await resetSession('Сесията изтече. Влез отново с Google.', 'error');
      return;
    }

    setMessage(error.message, 'error');
  }
});

refreshButton.addEventListener('click', async () => {
  try {
    await loadData();
    setMessage('Данните са обновени.', 'success');
  } catch (error) {
    if (error.status === 401) {
      await resetSession('Сесията изтече. Влез отново с Google.', 'error');
      return;
    }

    setMessage(error.message, 'error');
  }
});

logoutButton.addEventListener('click', async () => {
  try {
    await requestJson('/api/auth/logout', { method: 'POST' });
    if (window.google?.accounts?.id) {
      window.google.accounts.id.disableAutoSelect();
    }
    await resetSession('Излезе успешно.', 'success');
  } catch (error) {
    setAuthMessage(error.message, 'error');
  }
});

async function initializeApp() {
  try {
    const session = await requestJson('/api/session');
    state.googleClientId = session.googleClientId || '';
    state.user = session.user;
    renderAuthState();

    if (state.user) {
      setAppVisibility(true);
      await loadData();
      return;
    }

    setAppVisibility(false);
  } catch (error) {
    setAppVisibility(false);
    clearDishUi();
    setAuthMessage(error.message, 'error');
  }
}

initializeApp();