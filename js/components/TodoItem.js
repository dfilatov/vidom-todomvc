import StatefulComponent from './Stateful';

const ENTER_KEY = 13;

export default class TodoItem extends StatefulComponent {
    getInitialState({ todo : { title } }) {
        return {
            mode : 'view',
            editTitle : title
        };
    }

    // demonstrates optimization to prevent redundant ops
    shouldUpdate({ todo : nextTodo }, { todo : prevTodo }) {
        const prevState = this.getPrevState(),
            state = this.getState();

        return nextTodo !== prevTodo || prevState.mode !== state.mode;
    }

    onRender({ todo : { title, completed }, onRemove, onEdit, onToggle }) {
        const { mode, editTitle } = this.getState();

        return (
            <li class={ [completed? 'completed' : '', mode === 'edit'? 'editing' : ''].join(' ') }>
                { mode === 'view'?
                    <div class="view">
                        <input type="checkbox" class="toggle" checked={ completed } onClick={ onToggle }/>
                        <label onDblClick={ () => this.onDblClick() }>{ title }</label>
                        <button class="destroy" onClick={ onRemove }/>
                    </div> :
                    <input
                        dom-ref="edit-input"
                        class="edit"
                        value={ editTitle }
                        onKeyUp={ e => this.onKeyUp(e) }
                        onBlur={ e => this.onBlur(e) }/>
                }
            </li>
        );
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
