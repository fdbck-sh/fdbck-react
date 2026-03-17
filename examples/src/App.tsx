import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './layout';
import { Home } from './pages/Home';
import { InlinePage } from './pages/InlinePage';
import { ModalPage } from './pages/ModalPage';
import { PopoverPage } from './pages/PopoverPage';
import { ImperativePage } from './pages/ImperativePage';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="inline" element={<InlinePage />} />
          <Route path="modal" element={<ModalPage />} />
          <Route path="popover" element={<PopoverPage />} />
          <Route path="imperative" element={<ImperativePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
