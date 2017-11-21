export const SERVICE_WORKER_UPDATE_READY = 'SERVICE_WORKER_UPDATE_READY';
import applyUpdate from 'serviceworker-webpack-plugin/lib/browser/applyUpdate';

export function onServiceWorkerUpdateReady() {

	return {
		type: SERVICE_WORKER_UPDATE_READY,
		payload: {onConfirm: applyUpdate}
	};

}
