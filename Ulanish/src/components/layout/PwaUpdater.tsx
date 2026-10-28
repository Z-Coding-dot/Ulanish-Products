import { useEffect } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { useAppDispatch } from '@/redux/store';
import { addToast } from '@/redux/uiSlice';
export function PwaUpdater() {
  const dispatch = useAppDispatch();
  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onOfflineReady() {
      dispatch(addToast({ id: 'offline-ready', key: 'pwa.ready' }));
    },
    onRegisteredSW(_url, registration) {
      if (registration) {
        window.addEventListener('online', () => {
          void registration.update();
        });
      }
    },
  });
  useEffect(() => {
    if (needRefresh)
      dispatch(addToast({ id: 'update', key: 'pwa.update', action: 'update', persistent: true }));
  }, [needRefresh, dispatch]);
  useEffect(() => {
    const update = () => {
      void updateServiceWorker(true);
    };
    window.addEventListener('ulanish-update', update);
    return () => window.removeEventListener('ulanish-update', update);
  }, [updateServiceWorker]);
  return null;
}
