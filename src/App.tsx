import useRouterElements from './useRouterElements';

function App() {
    const routeElements = useRouterElements();
    return <div className="h-screen relative">{routeElements}</div>;
}

export default App;
