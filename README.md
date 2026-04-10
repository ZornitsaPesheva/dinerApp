# Diner

Малко приложение за списък с манджи.

## Стартиране

```bash
npm install
```

Задай средата за Google вход:

```powershell
$env:GOOGLE_CLIENT_ID="твоя-google-oauth-client-id"
$env:SESSION_SECRET="дълга-случайна-стойност"
node server.js
```

След това отвори `http://localhost:3001`.

## Google настройка

Създай OAuth 2.0 Web Client в Google Cloud Console и добави `http://localhost:3001` в Authorized JavaScript origins.

## Данни на потребител

След успешен вход всеки потребител получава собствен файл в `data/users/<google-sub>.json`.

Ако вече имаш стар общ `data/dishes.json`, той се използва като начален шаблон при първото влизане на нов потребител.