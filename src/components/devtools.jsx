import React from 'react';

import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';


let DevTools;
if (process.env.NODE_ENV == 'development'){
    DevTools = createDevTools(
        <DockMonitor toggleVisibilityKey='ctrl-l'
                     changePositionKey='ctrl-q'>
            <LogMonitor theme='tomorrow' />
        </DockMonitor>
    );
} else {
    DevTools = <noscript/>;
}

export { DevTools };
