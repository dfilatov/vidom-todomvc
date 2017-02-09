import { Component } from 'vidom';
import TodoList from './TodoList';

export default class Main extends Component {
    onRender() {
        const { todos, filter, onRemove, onEdit, onToggle, onCompleteAll, onUncompleteAll } = this.attrs;

        return (
            <section class="main">
                <input
                    type="checkbox"
                    class="toggle-all"
                    checked={ todos.filter(todo => todo.completed).length === todos.length }
                    onClick={ e => e.target.checked? onCompleteAll() : onUncompleteAll() }/>
                <label for="toggle-all">Mark all as completed</label>
                <TodoList { ...{ todos, filter, onRemove, onEdit, onToggle } }/>
            </section>
        );
    }
}
