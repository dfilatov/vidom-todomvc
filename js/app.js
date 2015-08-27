import { node, mountToDom } from 'vidom';
import TodoApp from './components/TodoApp';

mountToDom(document.getElementById('root'), node(TodoApp));
