import '../node_modules/todomvc-common/base.css';
import '../node_modules/todomvc-app-css/index.css';
import '../node_modules/todomvc-common/base';

import { mount } from 'vidom';
import TodoApp from './components/TodoApp';

mount(document.body, <TodoApp/>);
