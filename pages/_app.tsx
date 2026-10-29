import '@/styles/globals.css';
import '@/styles/animations.css';
import type { AppProps } from 'next/app';
import { PreferencesProvider } from '@/context/PreferencesContext';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <PreferencesProvider>
      <Component {...pageProps} />
    </PreferencesProvider>
  );
}
