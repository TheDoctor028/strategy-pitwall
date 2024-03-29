import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './pages/Layout.tsx';
import Home from './pages/Home.tsx';

export function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
