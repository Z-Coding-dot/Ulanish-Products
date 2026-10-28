import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { setInstallOpen } from '@/redux/uiSlice';
interface InstallEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}
export function useInstallPrompt() {
  const event = useRef<InstallEvent | null>(null);
  const [available, setAvailable] = useState(false);
  const [installed, setInstalled] = useState(
    () =>
      window.matchMedia('(display-mode: standalone)').matches ||
      Boolean((navigator as Navigator & { standalone?: boolean }).standalone),
  );
  const ios =
    /iphone|ipad|ipod/i.test(navigator.userAgent) ||
    (/Macintosh/.test(navigator.userAgent) && navigator.maxTouchPoints > 1);
  const dispatch = useAppDispatch();
  const sheet = useAppSelector((s) => s.ui.installOpen);
  useEffect(() => {
    const ready = (e: Event) => {
      e.preventDefault();
      event.current = e as InstallEvent;
      setAvailable(true);
    };
    const done = () => {
      setInstalled(true);
      setAvailable(false);
    };
    window.addEventListener('beforeinstallprompt', ready);
    window.addEventListener('appinstalled', done);
    return () => {
      window.removeEventListener('beforeinstallprompt', ready);
      window.removeEventListener('appinstalled', done);
    };
  }, []);
  return {
    visible: !installed && (available || ios),
    sheet,
    close: () => dispatch(setInstallOpen(false)),
    install: async () => {
      if (ios) {
        dispatch(setInstallOpen(true));
        return;
      }
      if (event.current) {
        await event.current.prompt();
        await event.current.userChoice;
        event.current = null;
        setAvailable(false);
      }
    },
  };
}
