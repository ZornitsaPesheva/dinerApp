const form = document.querySelector('#dish-form');
const nameInput = document.querySelector('#dish-name');
const notesInput = document.querySelector('#dish-notes');
const messageElement = document.querySelector('#form-message');
const editCancelButton = document.querySelector('#edit-cancel-button');
const dishesContainer = document.querySelector('#dishes');
const suggestionsContainer = document.querySelector('#suggestions');
const refreshButton = document.querySelector('#refresh-button');
const dishTemplate = document.querySelector('#dish-template');
const suggestionTemplate = document.querySelector('#suggestion-template');
const appShell = document.querySelector('#app-shell');
const authMessageElement = document.querySelector('#auth-message');
const googleSigninContainer = document.querySelector('#google-signin');
const authUserElement = document.querySelector('#auth-user');
const mobileAuthSlot = document.querySelector('#mobile-auth-slot');
const userAvatarElement = document.querySelector('#user-avatar');
const userNameElement = document.querySelector('#user-name');
const userEmailElement = document.querySelector('#user-email');
const logoutButton = document.querySelector('#logout-button');
const authIntroElement = document.querySelector('#auth-intro');
const authPanelElement = document.querySelector('.auth-panel');
const demoBannerElement = document.querySelector('#demo-banner');
const tryDemoButton = document.querySelector('#try-demo-button');
const exitDemoButton = document.querySelector('#exit-demo-button');
const deleteConfirmModalElement = document.querySelector('#delete-confirm-modal');
const deleteConfirmNameElement = document.querySelector('#delete-confirm-name');
const deleteCancelButton = document.querySelector('#delete-cancel-button');
const deleteConfirmButton = document.querySelector('#delete-confirm-button');
const hasDeleteModal = Boolean(
  deleteConfirmModalElement &&
  deleteConfirmNameElement &&
  deleteCancelButton &&
  deleteConfirmButton
);

function detectLanguage() {
  const preferredLanguages = Array.isArray(navigator.languages) && navigator.languages.length > 0
    ? navigator.languages
    : [navigator.language];
  const preferredLanguage = (preferredLanguages.find(Boolean) || 'en').toLowerCase();
  return preferredLanguage.startsWith('bg') ? 'bg' : 'en';
}

const language = detectLanguage();
const locale = language === 'bg' ? 'bg-BG' : 'en-US';

const texts = {
  en: {
    pageTitle: 'Cook Planner',
    pageDescription: 'Keep a list of recipes, track how often each has been cooked, and get suggestions for what to cook today.',
    eyebrow: 'Cooking Plan',
    heroTitle: 'What should we cook today?',
    authTitle: 'Google Sign-in',
    authCopy: 'Sign in with Google to create your personal list of favorite recipes.',
    logOut: 'Log out',
    tryDemo: 'Try Now',
    demoBanner: 'Demo mode - recipes are saved in your browser and will be merged when you sign in.',
    exitDemo: 'Exit demo',
    addRecipeTitle: 'Add a New Recipe',
    editRecipeTitle: 'Edit Recipe',
    nameLabel: 'Name',
    descriptionLabel: 'Description',
    save: 'Save',
    edit: 'Edit',
    update: 'Update',
    cancelEdit: 'Cancel edit',
    suggestionsTitle: 'Cooking Suggestions',
    refresh: 'Refresh',
    allRecipesTitle: 'All Recipes',
    sectionNote: 'Click "Cooked it" to mark the recipe as cooked.',
    cookedIt: 'Cooked it',
    delete: 'Delete',
    deleteTitle: 'Delete Confirmation',
    deleteMessage: 'Are you sure you want to delete it?',
    cancel: 'Cancel',
    confirm: 'Confirm',
    footer: 'Created by pesheva@gmail.com',
    loadingGoogleSignIn: 'Loading Google sign-in...',
    googleMissing: 'GOOGLE_CLIENT_ID is missing on the server.',
    googleUserFallback: 'Google user',
    suggestionLongest: '1. Longest since last cooked',
    suggestionLeast: '2. Least frequently cooked',
    suggestionFallback: 'Suggestion',
    skipSuggestion: 'Skip',
    noMoreSuggestions: 'No more suggestions right now. Press Refresh to start over.',
    addRecipesToSeeSuggestions: 'Add recipes to see suggestions.',
    emptyList: 'The list is empty. Add your first recipe.',
    noNotes: 'No notes.',
    notCookedYet: 'Not cooked yet',
    cookedTimes: ({ count }) => `${count} times cooked`,
    lastCooked: ({ date }) => `Last: ${date}`,
    recipeDeleted: 'Recipe deleted.',
    recipeAdded: 'Recipe added.',
    recipeUpdated: 'Recipe updated.',
    dataRefreshed: 'Data refreshed.',
    dishAlreadyExists: 'Recipe already exists.',
    dishNotFound: 'Recipe not found.',
    sessionExpired: 'Your session expired. Please sign in with Google again.',
    loggedOutSuccessfully: 'Logged out successfully.',
    demoRecipesMerged: ({ count }) => `${count} demo recipe(s) merged successfully.`
  },
  bg: {
    pageTitle: 'План за готвене',
    pageDescription: 'Поддържайте списък с рецепти, следете колко често са готвени и получавайте предложения какво да сготвите днес.',
    eyebrow: 'План за готвене',
    heroTitle: 'Какво да сготвим днес?',
    authTitle: 'Вход с Google',
    authCopy: 'Влезте с Google, за да създадете личен списък с любими рецепти.',
    logOut: 'Изход',
    tryDemo: 'Изпробвай',
    demoBanner: 'Демо режим - рецептите се запазват в браузъра и ще бъдат обединени, когато влезете.',
    exitDemo: 'Изход от демо',
    addRecipeTitle: 'Добави нова рецепта',
    editRecipeTitle: 'Редактирай рецепта',
    nameLabel: 'Име',
    descriptionLabel: 'Описание',
    save: 'Запази',
    edit: 'Редактирай',
    update: 'Обнови',
    cancelEdit: 'Отказ от редакция',
    suggestionsTitle: 'Предложения за готвене',
    refresh: 'Обнови',
    allRecipesTitle: 'Всички рецепти',
    sectionNote: 'Натиснете "Сготвих го", за да отбележите рецептата като приготвена.',
    cookedIt: 'Сготвих го',
    delete: 'Изтрий',
    deleteTitle: 'Потвърждение за изтриване',
    deleteMessage: 'Сигурни ли сте, че искате да изтриете това?',
    cancel: 'Отказ',
    confirm: 'Потвърди',
    footer: 'Създадено от pesheva@gmail.com',
    loadingGoogleSignIn: 'Зареждане на входа с Google...',
    googleMissing: 'GOOGLE_CLIENT_ID липсва на сървъра.',
    googleUserFallback: 'Потребител от Google',
    suggestionLongest: '1. Най-дълго от последно готвене',
    suggestionLeast: '2. Най-рядко готвена',
    suggestionFallback: 'Предложение',
    skipSuggestion: 'Пропусни',
    noMoreSuggestions: 'Няма повече предложения в момента. Натиснете „Обнови", за да започнете отначало.',
    addRecipesToSeeSuggestions: 'Добавете рецепти, за да видите предложения.',
    emptyList: 'Списъкът е празен. Добавете първата си рецепта.',
    noNotes: 'Няма описание.',
    notCookedYet: 'Все още не е готвено',
    cookedTimes: ({ count }) => `Готвено ${count} пъти`,
    lastCooked: ({ date }) => `Последно: ${date}`,
    recipeDeleted: 'Рецептата е изтрита.',
    recipeAdded: 'Рецептата е добавена.',
    recipeUpdated: 'Рецептата е обновена.',
    dataRefreshed: 'Данните са обновени.',
    dishAlreadyExists: 'Рецептата вече съществува.',
    dishNotFound: 'Рецептата не е намерена.',
    sessionExpired: 'Сесията ви изтече. Влезте отново с Google.',
    loggedOutSuccessfully: 'Излязохте успешно.',
    demoRecipesMerged: ({ count }) => `Успешно бяха обединени ${count} демо рецепти.`
  }
};

function translate(key, params = {}) {
  const value = texts[language]?.[key] ?? texts.en[key] ?? key;
  if (typeof value === 'function') {
    return value(params);
  }

  return value.replace(/\{(\w+)\}/g, (_, paramKey) => String(params[paramKey] ?? ''));
}

function applyLanguage() {
  document.documentElement.lang = language;
  document.title = translate('pageTitle');

  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDescription = document.querySelector('meta[property="og:description"]');

  if (ogTitle) {
    ogTitle.content = translate('pageTitle');
  }

  if (ogDescription) {
    ogDescription.content = translate('pageDescription');
  }

  document.querySelector('.eyebrow').textContent = translate('eyebrow');
  document.querySelector('.hero h1').textContent = translate('heroTitle');
  authIntroElement.querySelector('h2').textContent = translate('authTitle');
  authIntroElement.querySelector('.auth-copy').textContent = translate('authCopy');
  logoutButton.textContent = translate('logOut');
  tryDemoButton.textContent = translate('tryDemo');
  exitDemoButton.textContent = translate('exitDemo');
  demoBannerElement.querySelector('span').textContent = translate('demoBanner');
  document.querySelector('.add-card h2').textContent = translate('addRecipeTitle');
  const fieldLabels = document.querySelectorAll('#dish-form .field span');
  fieldLabels[0].textContent = translate('nameLabel');
  fieldLabels[1].textContent = translate('descriptionLabel');
  document.querySelector('.add-card .primary-btn').textContent = translate('save');
  editCancelButton.textContent = translate('cancelEdit');
  document.querySelector('.suggestions-card h2').textContent = translate('suggestionsTitle');
  refreshButton.textContent = translate('refresh');
  document.querySelector('.panel > .card-header h2').textContent = translate('allRecipesTitle');
  document.querySelector('.section-note').textContent = translate('sectionNote');
  if (hasDeleteModal) {
    deleteConfirmModalElement.querySelector('#delete-confirm-title').textContent = translate('deleteTitle');
    deleteConfirmModalElement.querySelector('#delete-confirm-message').textContent = translate('deleteMessage');
    deleteCancelButton.textContent = translate('cancel');
    deleteConfirmButton.textContent = translate('confirm');
  }
  document.querySelector('.site-footer').textContent = translate('footer');
}

const DEMO_STORAGE_KEY = 'diner_demo_dishes';

applyLanguage();

function getDemoDishes() {
  try {
    const raw = localStorage.getItem(DEMO_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveDemoDishes(dishes) {
  localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(dishes));
}

function clearDemoData() {
  localStorage.removeItem(DEMO_STORAGE_KEY);
}

function localBuildApiResponse(dishes) {
  const normalized = dishes.map(d => ({
    id: d.id,
    name: d.name,
    notes: d.notes || '',
    cookCount: d.cookCount || 0,
    lastCookedAt: d.lastCookedAt || null,
    cookHistory: Array.isArray(d.cookHistory) ? d.cookHistory : []
  }));

  const byOldest = [...normalized].sort((a, b) => {
    const aNever = a.cookCount === 0 ? 0 : 1;
    const bNever = b.cookCount === 0 ? 0 : 1;
    if (aNever !== bNever) return aNever - bNever;
    const aLast = a.lastCookedAt || '0000-00-00';
    const bLast = b.lastCookedAt || '0000-00-00';
    if (aLast !== bLast) return aLast.localeCompare(bLast);
    if (a.cookCount !== b.cookCount) return a.cookCount - b.cookCount;
    return a.name.toLowerCase().localeCompare(b.name.toLowerCase(), locale);
  });

  const byRarest = [...normalized].sort((a, b) => {
    if (a.cookCount !== b.cookCount) return a.cookCount - b.cookCount;
    const aLast = a.lastCookedAt || '0000-00-00';
    const bLast = b.lastCookedAt || '0000-00-00';
    if (aLast !== bLast) return aLast.localeCompare(bLast);
    return a.name.localeCompare(b.name, locale);
  });

  const oldest = byOldest[0];
  const rarest = byRarest.find(d => !oldest || d.id !== oldest.id);
  return { dishes: normalized, suggestions: [oldest, rarest].filter(Boolean) };
}

const state = {
  googleClientId: '',
  user: null,
  demoMode: false,
  editingDishId: null,
  focusDishId: null,
  pendingDeleteDish: null,
  pendingDeleteTrigger: null,
  dishes: [],
  skippedSuggestionIds: new Set()
};

let googleButtonInitialized = false;
const mobileMediaQuery = window.matchMedia('(max-width: 800px)');

function syncAuthPlacement() {
  const isAuthenticated = Boolean(state.user);
  const isMobile = mobileMediaQuery.matches;

  if (isAuthenticated && isMobile) {
    mobileAuthSlot.hidden = false;
    mobileAuthSlot.appendChild(authUserElement);
    authPanelElement.hidden = true;
    return;
  }

  mobileAuthSlot.hidden = true;
  googleSigninContainer.before(authUserElement);
  authPanelElement.hidden = false;
}

function getFallbackAvatarDataUri(name = '') {
  const firstLetter = (name || 'U').trim().charAt(0).toUpperCase() || 'U';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><rect width="64" height="64" rx="32" fill="#d9b79f"/><text x="50%" y="52%" text-anchor="middle" dominant-baseline="middle" font-family="Georgia, serif" font-size="30" fill="#5b3a24">${firstLetter}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

async function requestJson(url, options = {}) {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json'
    },
    ...options
  });

  const payload = await response.json();

  if (!response.ok) {
    const error = new Error(payload.error || 'Request failed.');
    error.status = response.status;
    throw error;
  }

  return payload;
}

function formatDate(dateString) {
  if (!dateString) {
    return translate('notCookedYet');
  }

  return new Intl.DateTimeFormat(locale, {
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

function setFormToCreateMode() {
  document.querySelector('.add-card h2').textContent = translate('addRecipeTitle');
  form.querySelector('.primary-btn').textContent = translate('save');
  editCancelButton.hidden = true;
  form.dataset.mode = 'create';
}

function clearEditMode() {
  state.editingDishId = null;
  setFormToCreateMode();
}

function enterEditMode(dish) {
  state.editingDishId = dish.id;
  document.querySelector('.add-card h2').textContent = translate('editRecipeTitle');
  form.querySelector('.primary-btn').textContent = translate('update');
  editCancelButton.hidden = false;
  form.dataset.mode = 'edit';
  nameInput.value = dish.name;
  notesInput.value = dish.notes || '';
  setMessage('');
  nameInput.focus();
  nameInput.select();
}

function syncFormMode() {
  if (state.editingDishId) {
    document.querySelector('.add-card h2').textContent = translate('editRecipeTitle');
    form.querySelector('.primary-btn').textContent = translate('update');
    editCancelButton.hidden = false;
    form.dataset.mode = 'edit';
    return;
  }

  setFormToCreateMode();
}

function clearDishUi() {
  state.dishes = [];
  state.skippedSuggestionIds.clear();
  suggestionsContainer.innerHTML = '';
  dishesContainer.innerHTML = '';
  setMessage('');
}

function buildSuggestionsFromDishes(dishes, skippedIds = new Set()) {
  const normalized = dishes.map(d => ({
    id: d.id,
    name: d.name,
    notes: d.notes || '',
    cookCount: d.cookCount || 0,
    lastCookedAt: d.lastCookedAt || null,
    cookHistory: Array.isArray(d.cookHistory) ? d.cookHistory : []
  }));

  const byOldest = [...normalized].sort((a, b) => {
    const aNever = a.cookCount === 0 ? 0 : 1;
    const bNever = b.cookCount === 0 ? 0 : 1;
    if (aNever !== bNever) return aNever - bNever;
    const aLast = a.lastCookedAt || '0000-00-00';
    const bLast = b.lastCookedAt || '0000-00-00';
    if (aLast !== bLast) return aLast.localeCompare(bLast);
    if (a.cookCount !== b.cookCount) return a.cookCount - b.cookCount;
    return a.name.toLowerCase().localeCompare(b.name.toLowerCase(), locale);
  });

  const byRarest = [...normalized].sort((a, b) => {
    if (a.cookCount !== b.cookCount) return a.cookCount - b.cookCount;
    const aLast = a.lastCookedAt || '0000-00-00';
    const bLast = b.lastCookedAt || '0000-00-00';
    if (aLast !== bLast) return aLast.localeCompare(bLast);
    return a.name.localeCompare(b.name, locale);
  });

  const oldest = byOldest.find(d => !skippedIds.has(d.id));
  const rarest = byRarest.find(d => d.id !== oldest?.id && !skippedIds.has(d.id));
  return [oldest, rarest].filter(Boolean);
}

function updateDashboard(dishes, { resetSkipped = false } = {}) {
  state.dishes = Array.isArray(dishes) ? dishes : [];

  if (resetSkipped) {
    state.skippedSuggestionIds.clear();
  } else {
    const dishIds = new Set(state.dishes.map(d => d.id));
    for (const skippedId of state.skippedSuggestionIds) {
      if (!dishIds.has(skippedId)) {
        state.skippedSuggestionIds.delete(skippedId);
      }
    }
  }

  renderSuggestions();
  renderDishes(state.dishes);
}

function openDeleteConfirmModal(dish, triggerButton) {
  if (!hasDeleteModal) {
    const shouldDelete = window.confirm(`${translate('deleteMessage')}\n${dish.name}`);
    if (shouldDelete) {
      deleteDish(dish.id);
    }
    return;
  }

  state.pendingDeleteDish = dish;
  state.pendingDeleteTrigger = triggerButton;
  deleteConfirmNameElement.textContent = dish.name;
  deleteConfirmModalElement.hidden = false;
  document.body.classList.add('modal-open');
  deleteConfirmButton.focus();
}

function closeDeleteConfirmModal() {
  if (!hasDeleteModal) {
    return;
  }

  deleteConfirmModalElement.hidden = true;
  document.body.classList.remove('modal-open');

  if (state.pendingDeleteTrigger instanceof HTMLElement) {
    state.pendingDeleteTrigger.focus();
  }

  state.pendingDeleteDish = null;
  state.pendingDeleteTrigger = null;
}

function renderGoogleButton() {
  if (!state.googleClientId) {
    googleSigninContainer.innerHTML = `<p class="message error">${translate('googleMissing')}</p>`;
    return;
  }

  if (!window.google || !window.google.accounts?.id) {
    googleSigninContainer.innerHTML = `<p class="message">${translate('loadingGoogleSignIn')}</p>`;
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
    locale
  });
}

function renderAuthState() {
  const isAuthenticated = Boolean(state.user);

  authIntroElement.hidden = isAuthenticated;
  authMessageElement.hidden = isAuthenticated;
  logoutButton.hidden = !isAuthenticated;
  authUserElement.hidden = !isAuthenticated;
  googleSigninContainer.hidden = isAuthenticated;

  syncAuthPlacement();

  if (isAuthenticated) {
    userNameElement.textContent = state.user.name || translate('googleUserFallback');
    userEmailElement.textContent = state.user.email || '';

    const fallbackAvatar = getFallbackAvatarDataUri(state.user.name || state.user.email || 'Google');
    userAvatarElement.src = state.user.picture || fallbackAvatar;
    userAvatarElement.hidden = false;
    userAvatarElement.onerror = () => {
      userAvatarElement.onerror = null;
      userAvatarElement.src = fallbackAvatar;
    };

    setAuthMessage('');
    return;
  }

  userNameElement.textContent = '';
  userEmailElement.textContent = '';
  userAvatarElement.hidden = true;
  userAvatarElement.removeAttribute('src');
  renderGoogleButton();
}

function bindViewportListener() {
  const handleViewportChange = () => {
    syncAuthPlacement();
  };

  if (mobileMediaQuery.addEventListener) {
    mobileMediaQuery.addEventListener('change', handleViewportChange);
    return;
  }

  mobileMediaQuery.addListener(handleViewportChange);
}

async function resetSession(message = '', type = '') {
  state.user = null;
  clearEditMode();
  form.reset();
  setAppVisibility(false);
  clearDishUi();
  renderAuthState();
  setAuthMessage(message, type);
}

function renderSuggestions() {
  const suggestions = buildSuggestionsFromDishes(state.dishes, state.skippedSuggestionIds);
  suggestionsContainer.innerHTML = '';

  if (suggestions.length === 0) {
    const emptyText = state.dishes.length === 0
      ? translate('addRecipesToSeeSuggestions')
      : translate('noMoreSuggestions');
    suggestionsContainer.innerHTML = `<div class="empty-state">${emptyText}</div>`;
    return;
  }

  const labels = [translate('suggestionLongest'), translate('suggestionLeast')];

  suggestions.forEach((dish, index) => {
    const fragment = suggestionTemplate.content.cloneNode(true);
    fragment.querySelector('.suggestion-label').textContent = labels[index] || translate('suggestionFallback');
    fragment.querySelector('.suggestion-name').textContent = dish.name;
    fragment.querySelector('.suggestion-meta').textContent =
      `${translate('cookedTimes', { count: dish.cookCount })} • ${translate('lastCooked', { date: formatDate(dish.lastCookedAt) })}`;
    fragment.querySelector('.skip-button').textContent = translate('skipSuggestion');
    fragment.querySelector('.skip-button').addEventListener('click', () => {
      state.skippedSuggestionIds.add(dish.id);
      renderSuggestions();
    });
    fragment.querySelector('.cook-button').textContent = translate('cookedIt');
    fragment.querySelector('.cook-button').addEventListener('click', async () => {
      await cookDish(dish.id);
    });
    suggestionsContainer.appendChild(fragment);
  });
}

async function cookDish(dishId) {
  if (state.demoMode) {
    const dishes = getDemoDishes();
    const dish = dishes.find(d => d.id === dishId);
    if (!dish) return;
    const cookedAt = new Date().toISOString();
    if (!Array.isArray(dish.cookHistory)) dish.cookHistory = [];
    dish.cookHistory.push(cookedAt);
    dish.cookCount = dish.cookHistory.length;
    dish.lastCookedAt = cookedAt;
    saveDemoDishes(dishes);
    const result = localBuildApiResponse(dishes);
    updateDashboard(result.dishes);
    return;
  }

  try {
    const data = await requestJson(`/api/dishes/${dishId}/cook`, { method: 'POST' });
    updateDashboard(data.dishes);
  } catch (error) {
    if (error.status === 401) {
      await resetSession(translate('sessionExpired'), 'error');
      return;
    }

    setMessage(error.message, 'error');
  }
}

async function deleteDish(dishId) {
  if (state.demoMode) {
    const dishes = getDemoDishes();
    const remainingDishes = dishes.filter(dish => dish.id !== dishId);

    if (remainingDishes.length === dishes.length) {
      setMessage(translate('dishNotFound'), 'error');
      return;
    }

    saveDemoDishes(remainingDishes);
    const result = localBuildApiResponse(remainingDishes);
    updateDashboard(result.dishes);
    setMessage(translate('recipeDeleted'), 'success');
    return;
  }

  try {
    const data = await requestJson(`/api/dishes/${dishId}`, { method: 'DELETE' });
    if (state.editingDishId === dishId) {
      form.reset();
      clearEditMode();
    }
    updateDashboard(data.dishes);
    setMessage(translate('recipeDeleted'), 'success');
  } catch (error) {
    if (error.status === 401) {
      await resetSession(translate('sessionExpired'), 'error');
      return;
    }

    setMessage(error.message, 'error');
  }
}

function renderDishes(dishes) {
  const focusDishId = state.focusDishId;
  state.focusDishId = null;

  if (state.editingDishId && !dishes.some(dish => dish.id === state.editingDishId)) {
    clearEditMode();
    form.reset();
  } else {
    syncFormMode();
  }

  dishesContainer.innerHTML = '';

  if (dishes.length === 0) {
    dishesContainer.innerHTML = `<div class="empty-state">${translate('emptyList')}</div>`;
    return;
  }

  dishes
    .slice()
    .sort((left, right) => left.name.localeCompare(right.name, locale))
    .forEach(dish => {
      const fragment = dishTemplate.content.cloneNode(true);
      const dishCard = fragment.querySelector('.dish-item');
      dishCard.tabIndex = -1;
      fragment.querySelector('.dish-name').textContent = dish.name;
      fragment.querySelector('.dish-notes').textContent = dish.notes || translate('noNotes');
      fragment.querySelector('.count-pill').textContent = translate('cookedTimes', { count: dish.cookCount });
      fragment.querySelector('.last-pill').textContent = translate('lastCooked', { date: formatDate(dish.lastCookedAt) });
      fragment.querySelector('.edit-button').textContent = translate('edit');
      fragment.querySelector('.cook-button').textContent = translate('cookedIt');
      fragment.querySelector('.delete-button').textContent = translate('delete');
      fragment.querySelector('.edit-button').addEventListener('click', () => {
        enterEditMode(dish);
      });
      fragment.querySelector('.cook-button').addEventListener('click', async () => {
        await cookDish(dish.id);
      });
      fragment.querySelector('.delete-button').addEventListener('click', event => {
        openDeleteConfirmModal(dish, event.currentTarget);
      });
      dishesContainer.appendChild(fragment);

      if (dish.id === focusDishId) {
        dishCard.classList.add('update-ripple');
        dishCard.focus();
      }
    });
}

async function loadData() {
  if (state.demoMode) {
    const result = localBuildApiResponse(getDemoDishes());
    updateDashboard(result.dishes, { resetSkipped: true });
    return;
  }

  try {
    const data = await requestJson('/api/dishes');
    updateDashboard(data.dishes, { resetSkipped: true });
  } catch (error) {
    if (error.status === 401) {
      await resetSession(translate('sessionExpired'), 'error');
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
    state.demoMode = false;
    demoBannerElement.hidden = true;
    renderAuthState();
    setAppVisibility(true);

    const demoDishes = getDemoDishes();
    if (demoDishes.length > 0) {
      const data = await requestJson('/api/dishes/merge', {
        method: 'POST',
        body: JSON.stringify({ dishes: demoDishes })
      });
      clearDemoData();
      updateDashboard(data.dishes, { resetSkipped: true });
      setMessage(translate('demoRecipesMerged', { count: demoDishes.length }), 'success');
    } else {
      await loadData();
      setMessage('');
    }
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
  const name = payload.name.trim();
  const notes = payload.notes.trim();

  if (state.demoMode) {
    if (!name) return;
    const dishes = getDemoDishes();
    if (dishes.some(d => d.id !== state.editingDishId && d.name.toLowerCase() === name.toLowerCase())) {
      setMessage(translate('dishAlreadyExists'), 'error');
      return;
    }

    if (state.editingDishId) {
      const dish = dishes.find(item => item.id === state.editingDishId);

      if (!dish) {
        setMessage(translate('dishNotFound'), 'error');
        return;
      }

      dish.name = name;
      dish.notes = notes;
      saveDemoDishes(dishes);
      state.focusDishId = dish.id;
      const updatedResult = localBuildApiResponse(dishes);
      form.reset();
      clearEditMode();
      updateDashboard(updatedResult.dishes);
      setMessage(translate('recipeUpdated'), 'success');
      return;
    }

    dishes.push({
      id: crypto.randomUUID(),
      name,
      notes,
      cookCount: 0,
      cookHistory: [],
      lastCookedAt: null
    });
    saveDemoDishes(dishes);
    form.reset();
    const result = localBuildApiResponse(dishes);
    updateDashboard(result.dishes);
    setMessage(translate('recipeAdded'), 'success');
    nameInput.focus();
    return;
  }

  try {
    const isEditing = Boolean(state.editingDishId);
    if (isEditing) {
      state.focusDishId = state.editingDishId;
    }

    const data = await requestJson(isEditing ? `/api/dishes/${state.editingDishId}` : '/api/dishes', {
      method: isEditing ? 'PUT' : 'POST',
      body: JSON.stringify({ name, notes })
    });
    form.reset();
    clearEditMode();
    updateDashboard(data.dishes);
    setMessage(translate(isEditing ? 'recipeUpdated' : 'recipeAdded'), 'success');
    if (!isEditing) {
      nameInput.focus();
    }
  } catch (error) {
    if (error.status === 401) {
      await resetSession(translate('sessionExpired'), 'error');
      return;
    }

    setMessage(error.message, 'error');
  }
});

refreshButton.addEventListener('click', async () => {
  try {
    await loadData();
    setMessage(translate('dataRefreshed'), 'success');
  } catch (error) {
    if (error.status === 401) {
      await resetSession(translate('sessionExpired'), 'error');
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
    await resetSession(translate('loggedOutSuccessfully'), 'success');
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

    // Restore demo mode automatically if there are saved demo dishes
    if (getDemoDishes().length > 0) {
      state.demoMode = true;
      demoBannerElement.hidden = false;
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

tryDemoButton.addEventListener('click', async () => {
  state.demoMode = true;
  demoBannerElement.hidden = false;
  setAppVisibility(true);
  await loadData();
});

editCancelButton.addEventListener('click', () => {
  form.reset();
  clearEditMode();
  setMessage('');
  nameInput.focus();
});

exitDemoButton.addEventListener('click', () => {
  clearDemoData();
  state.demoMode = false;
  demoBannerElement.hidden = true;
  setAppVisibility(false);
  clearDishUi();
  clearEditMode();
  form.reset();
});

if (hasDeleteModal) {
  deleteCancelButton.addEventListener('click', () => {
    closeDeleteConfirmModal();
  });

  deleteConfirmButton.addEventListener('click', async () => {
    const dish = state.pendingDeleteDish;

    if (!dish) {
      closeDeleteConfirmModal();
      return;
    }

    closeDeleteConfirmModal();
    await deleteDish(dish.id);
  });

  deleteConfirmModalElement.addEventListener('click', event => {
    if (event.target === deleteConfirmModalElement) {
      closeDeleteConfirmModal();
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !deleteConfirmModalElement.hidden) {
      closeDeleteConfirmModal();
    }
  });
}

function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) {
    return;
  }

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(error => {
      console.error('Service worker registration failed:', error);
    });
  });
}

initializeApp();
bindViewportListener();
registerServiceWorker();