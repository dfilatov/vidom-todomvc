import { Component } from 'vidom';

export default class Info extends Component {
    shouldUpdate() {
        return false;
    }

    onRender() {
        return (
            <footer class="info">
                <p>Double-click to edit a todo</p>
                <p>Created by <a href="https://github.com/dfilatov/">Dmitry Filatov</a></p>
                <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
            </footer>
        );
    }
}
