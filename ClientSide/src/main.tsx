import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux';
import store from './redux/store.ts';
import { io } from "socket.io-client";
import { BrowserRouter } from 'react-router-dom';

export const socket = io("https://testlastweek.onrender.com/");

createRoot(document.getElementById('root')!).render(
 
    <Provider store={store}>
        <BrowserRouter>
    <App />
    </BrowserRouter>
    </Provider>
 
)
