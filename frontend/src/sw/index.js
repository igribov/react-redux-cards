import runtime from 'serviceworker-webpack-plugin/lib/runtime';

export const registerServiceWorker = function() {
  if (!navigator.serviceWorker) return;

  const registration = runtime.register();
};

self.addEventListener('fetch', (e) => {
  console.log('fetch --> ', e);
})
