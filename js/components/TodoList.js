import { Component, node } from 'vidom';
import TodoItem from './TodoItem';

export default class TodoList extends Component {
    onRender({ todos, filter, onRemove, onEdit, onToggle }) {
        return node('ul')
            .attrs({ className : 'todo-list' })
            .children((filter === 'all'?
                todos :
                todos.filter(todo => todo.completed === (filter === 'completed')))
                    .map(todo => node(TodoItem)
                        .key(todo.id)
                        .attrs({
                            todo,
                            onRemove : () => onRemove(todo.id),
                            onEdit : (title) => onEdit(todo.id, title),
                            onToggle : () => onToggle(todo.id)
                    })));
    }
}
