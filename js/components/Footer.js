import { Component, node } from 'vidom';

export default class Footer extends Component {
    onRender({ todos, filter, onRemoveCompleted }) {
        const uncompletedTodos = todos.filter(item => !item.completed),
            children = [
                node('span')
                    .key('count')
                    .attrs({ className : 'todo-count' })
                    .children([
                        node('strong')
                            .key('num')
                            .children(uncompletedTodos.length),
                        node('span')
                            .key('desc')
                            .children(' item left')
                    ]),
                node('ul')
                    .key('filters')
                    .attrs({ className : 'filters' })
                    .children(['all', 'active', 'completed'].map(function(item) {
                        return node('li')
                            .key(item)
                            .children(
                                node('a')
                                    .attrs({
                                        href : '#!/' + (item !== 'all'? item : ''),
                                        className : item === filter? 'selected' : null
                                    })
                                    .children(item));
                    }))
            ];

        if(uncompletedTodos.length < todos.length) {
            children.push(node('button')
                .key('clear')
                .attrs({
                    className : 'clear-completed',
                    onClick : onRemoveCompleted
                })
                .children('Clear completed'));
        }

        return node('footer')
            .attrs({ className : 'footer' })
            .children(children);
    }
}
