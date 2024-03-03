import './App.css';
import Providers from './providers/Providers.tsx';
import Router from './Router.tsx';

function App() {
    return (
        <>
            <Providers>
                <Router />
            </Providers>
        </>
    );
}

export default App;
