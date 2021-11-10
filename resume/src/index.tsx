import React from 'react';
import { render } from 'react-dom';
import App from './app/App';
import './i18n';
import './helpers/extensionHelper';
import './index.scss';

render(<App />, document.getElementById('root'));
