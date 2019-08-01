import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';

import App from './App';

serviceWorker.register();

ReactDOM.render(<App />, document.getElementById('root'));