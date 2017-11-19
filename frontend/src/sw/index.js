import runtime from 'serviceworker-webpack-plugin/lib/runtime';

export const registerServiceWorker = function() {
  if (!navigator.serviceWorker) return;

  const registration = runtime.register().then((reg) => {
    console.log(reg);
    if (reg.waiting) {
      console.log('SERVICE_WORKER_UPDATE_READY')
      return;
    }
    if (reg.installing) {
      _trackInstalling(reg.installing);
      return;
    }
    reg.addEventListener('updatefound', function() {
      _trackInstalling(reg.installing);
    });

  });
};

/** track intalling process of service worker */
function _trackInstalling(worker) {
  worker.addEventListener('statechange', function() {
    if (worker.state == 'installed') {
      AppStatusReduser(null, serviceWorkerUpdateReady(worker));
    }
  });
}
