import {createRoot, Root} from "react-dom/client";
import {Counter} from "./components/Counter";


const rootElement: HTMLElement = document.getElementById('root');
const root: Root = createRoot(rootElement);

root.render(
    <Counter/>
)
