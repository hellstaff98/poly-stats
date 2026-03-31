import {createRoot, Root} from "react-dom/client";
import {Counter} from "../components/Counter";
import App from "./App";
import {BrowserRouter} from "react-router-dom";


const rootElement: HTMLElement = document.getElementById('root');
const root: Root = createRoot(rootElement);

root.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
)
