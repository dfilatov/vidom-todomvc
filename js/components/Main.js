import { Component, node } from 'vidom';
import TodoList from './TodoList';

export default class Main extends Component {
    onRender({ todos, filter, onRemove, onEdit, onToggle, onCompleteAll, onUncompleteAll }) {
        return node('section')
            .attrs({ className : 'main' })
            .children([
                node('input')
                    .key('input-toggle-all')
                    .attrs({
                        type : 'checkbox',
                        checked : todos.filter(todo => todo.completed).length === todos.length,
                        className : 'toggle-all',
                        onClick : e => e.target.checked? onCompleteAll() : onUncompleteAll()
                    }),
                node('label')
                    .key('label-toggle-all')
                    .attrs({
                        type : 'checkbox',
                        htmlFor : 'toggle-all'
                    })
                    .children('Mark all as completed'),
                node(TodoList)
                    .key('list')
                    .attrs({ todos, filter, onRemove, onEdit, onToggle })
            ]);
    }
}
