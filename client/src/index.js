import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import TicketsSection from './pages/user_page/ticketsPage';
// import FanTokenHistoryMap from './pages/user_page/map';
// import SocialFeed from './pages/feed_page/feed';
// import UserProfile from './pages/user_page/homePage';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>      
         <App />
    {/* <TicketsSection /> */}
    {/* <FanTokenHistoryMap /> */}
    {/* <UserProfile /> */}
    {/* <SocialFeed /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
