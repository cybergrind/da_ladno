import React from 'react';

import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';


class Empty extends React.Component {
    render(){
        return <noscript/>;
    }
}
let DevTools = Empty;

if (process.env.NODE_ENV == 'development'){
    DevTools = createDevTools(
        <DockMonitor toggleVisibilityKey='ctrl-l'
                     defaultIsVisible={false}
                     changePositionKey='ctrl-q'>
            <LogMonitor theme='tomorrow' />
        </DockMonitor>
    );
}
export { DevTools };
