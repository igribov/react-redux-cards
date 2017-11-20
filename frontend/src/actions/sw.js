export const SERVICE_WORKER_UPDATE_READY = 'SERVICE_WORKER_UPDATE_READY';
export const SERVICE_WORKER_UPDATED = 'SERVICE_WORKER_UPDATED';

export function onServiceWorkerUpdateReady(worker) {

  const confirm = () => worker.postMessage({action: 'skipWaiting'});

	return {
		type: SERVICE_WORKER_UPDATE_READY,
		payload: {onConfirm: confirm}
	};

}

export function onServiceWorkerUpdated() {
  
	return {
		type: SERVICE_WORKER_UPDATED,
	};
}
