import { node } from 'vidom';
import StatefulComponent from './Stateful';

const ENTER_KEY = 13;

export default class TodoItem extends StatefulComponent {
    getInitialState({ todo : { title } }) {
        return {
            mode : 'view',
            editTitle : title
        };
    }

    onRender({ todo : { title, completed }, onRemove, onEdit, onToggle }) {
        const { mode, editTitle } = this.getState();

        return node('li')
            .attrs({
                className : [
                    completed? 'completed' : '',
                    mode === 'edit'? 'editing' : ''
                ].join(' ')
            })
            .children(
                mode === 'view'?
                    node('div')
                        .attrs({ className : 'view' })
                        .children([
                            node('input')
                                .key('input')
                                .attrs({
                                    type : 'checkbox',
                                    className : 'toggle',
                                    checked : completed,
                                    onClick : onToggle
                                }),
                            node('label')
                                .key('label')
                                .attrs({ onDblClick : () => this.onDblClick() })
                                .children(title),
                            node('button')
                                .key('button')
                                .attrs({
                                    className : 'destroy',
                                    onClick : onRemove
                                })
                        ]) :
                    this.setDomRef('edit-input', node('input').attrs({
                        className : 'edit',
                        value : editTitle,
                        onKeyUp : e => this.onKeyUp(e),
                        onBlur : e => this.onBlur(e)
                    })));
    }

    onUpdate() {
        if(this.getState().mode === 'edit') {
            this.getDomRef('edit-input').focus();
        }
    }

    onDblClick() {
        this.setState({ mode : 'edit' });
    }

    onKeyUp(e) {
        let value = e.target.value;

        if(e.nativeEvent.keyCode === ENTER_KEY) {
            e.target.blur();
        }
        else {
            this.setState({ editTitle : value });
        }
    }

    onBlur(e) {
        const value = e.target.value.trim();

        if(value) {
            this.getAttrs().onEdit(value);
        }
        else {
            this.getAttrs().onRemove();
        }

        this.setState({ mode : 'view', editTitle : value });
    }
}
