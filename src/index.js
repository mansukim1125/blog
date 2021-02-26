'use strict';

// Refer to: https://github.com/facebook/regenerator/tree/master/packages/regenerator-runtime
import "regenerator-runtime/runtime";

import { router } from './routes/index';

import './css/Body.css';

document.addEventListener('DOMContentLoaded', () => {    
    window.addEventListener("popstate", () => {
        router.push(location.pathname);
    });
    
    document.body.addEventListener('click', (e) => {
        console.log(e);
        if (e.target.matches('[data-link]')) {
            e.preventDefault();
            if (location.pathname === e.target.getAttribute('href')) return;
            router.push(e.target.getAttribute('href'));
            history.pushState(null, null, e.target.href);
        }
    });

    router.push(location.pathname);
});
