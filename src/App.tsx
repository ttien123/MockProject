import useRouterElements from './useRouterElements';
import { ToastContainer } from 'react-toastify';
function App() {
    const routeElements = useRouterElements();
    return (
        <div className="h-screen relative">
            {routeElements}
            <ToastContainer autoClose={1500} position="top-right" />
        </div>
    );
}

export default App;
