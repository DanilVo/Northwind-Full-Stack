import ReactDOM from 'react-dom/client';

import Layout from './Components/LayoutArea/Layout/Layout';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import interceptors from './Utils/Interceptors';

interceptors.create();

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
        <Layout />
    </BrowserRouter>
);
