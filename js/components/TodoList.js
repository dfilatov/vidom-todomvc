import { Component } from 'vidom';
import TodoItem from './TodoItem';

export default class TodoList extends Component {
    onRender({ todos, filter, onRemove, onEdit, onToggle }) {
        return (
            <ul class="todo-list">
                { (filter === 'all'?
                    todos :
                    todos.filter(todo => todo.completed === (filter === 'completed')))
                        .map(todo =>
                            <TodoItem
                                key={todo.id}
                                todo={todo}
                                onRemove={ () => onRemove(todo.id) }
                                onEdit={ title => onEdit(todo.id, title) }
                                onToggle={ () => onToggle(todo.id) }/>)
                }
            </ul>
        );
    }
}
