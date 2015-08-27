import '../node_modules/todomvc-common/base.css';
import '../node_modules/todomvc-app-css/index.css';
import '../node_modules/todomvc-common/base';

import { node, mountToDom } from 'vidom';
import TodoApp from './components/TodoApp';

mountToDom(document.getElementById('root'), node(TodoApp));
