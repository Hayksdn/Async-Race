import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './global.css';
import App from './app/app.tsx';
import { Provider as ChakraProvider } from './components/ui/provider.tsx';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './shared/store/store.ts';
import { AnimationProvider } from './shared/context/animation.tsx';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider>
      <ReduxProvider store={store}>
        <AnimationProvider>
          <App />
        </AnimationProvider>
      </ReduxProvider>
    </ChakraProvider>
  </StrictMode>
);
