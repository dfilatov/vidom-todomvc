import { node } from 'vidom';
import StatefulComponent from './Stateful';

const ENTER_KEY = 13;

export default class Header extends StatefulComponent {
    getInitialState() {
        return { title : '' };
    }

    onRender() {
        return node('header')
            .attrs({ className : 'header' })
            .children([
                node('h1')
                    .key('header')
                    .children('todos'),
                node('input')
                    .key('input')
                    .attrs({
                        className : 'new-todo',
                        placeholder : 'What needs to be done?',
                        autofocus : true,
                        value : this.getState().title,
                        onKeyUp : e => this.onKeyUp(e)
                    })
            ]);
    }

    onKeyUp(e) {
        let value = e.target.value;

        if(e.nativeEvent.keyCode === ENTER_KEY) {
            value = value.trim();
            if(value) {
                this.setState({ title : '' });
                this.getAttrs().onAdd(value);
            }
        }
        else {
            this.setState({ title : value });
        }
    }
}
