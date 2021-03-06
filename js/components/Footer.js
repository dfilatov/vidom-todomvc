import { Component } from 'vidom';

export default class Footer extends Component {
    onRender() {
        const { todos, filter, onRemoveCompleted } = this.attrs,
            uncompletedTodos = todos.filter(item => !item.completed);

        return (
            <footer class="footer">
                <span class="todo-count">
                    <strong>{ uncompletedTodos.length }</strong> items left
                </span>
                <ul class="filters">
                    {
                        ['all', 'active', 'completed'].map(item => {
                            return (
                                <li>
                                    <a
                                        class={ item === filter? 'selected' : null }
                                        href={ '#!/' + (item !== 'all'? item : '') }
                                    >
                                        { item }
                                    </a>
                                </li>
                            );
                        })
                    }
                </ul>
                { uncompletedTodos.length < todos.length?
                    <button class="clear-completed" onClick={ onRemoveCompleted }>Clear completed</button> :
                    ''
                }
            </footer>
        );
    }
}
