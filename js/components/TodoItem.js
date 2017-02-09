import { Component } from 'vidom';

const ENTER_KEY = 13;

export default class TodoItem extends Component {
    onInit() {
        this._inputRef = null;

        this.setState({
            mode : 'view',
            editTitle : this.attrs.todo.title
        });
    }

    // demonstrates optimization to prevent redundant ops
    shouldUpdate(prevAttrs, _, prevState) {
        const { state } = this;

        return prevAttrs.todo !== state.todo ||
            prevState.mode !== state.mode ||
            prevState.editTitle !== state.editTitle;
    }

    onRender() {
        const { todo : { title, completed }, onRemove, onToggle } = this.attrs,
            { mode, editTitle } = this.state;

        return (
            <li class={ [completed? 'completed' : '', mode === 'edit'? 'editing' : ''].join(' ') }>
                { mode === 'view'?
                    <div class="view">
                        <input type="checkbox" class="toggle" checked={ completed } onChange={ onToggle }/>
                        <label onDblClick={ () => this.onDblClick() }>{ title }</label>
                        <button class="destroy" onClick={ onRemove }/>
                    </div> :
                    <input
                        ref={ ref => { this._inputRef = ref } }
                        class="edit"
                        value={ editTitle }
                        onChange={ e => this.onChange(e) }
                        onKeyUp={ e => this.onKeyUp(e) }
                        onBlur={ e => this.onBlur(e) }/>
                }
            </li>
        );
    }

    onUpdate() {
        if(this.state.mode === 'edit') {
            this._inputRef.focus();
        }
    }

    onDblClick() {
        this.setState({ mode : 'edit' });
    }

    onChange(e) {
        this.setState({ editTitle : e.target.value });
    }

    onKeyUp(e) {
        if(e.nativeEvent.keyCode === ENTER_KEY) {
            e.target.blur();
        }
    }

    onBlur(e) {
        const value = e.target.value.trim();

        if(value) {
            this.attrs.onEdit(value);
        }
        else {
            this.attrs.onRemove();
        }

        this.setState({ mode : 'view', editTitle : value });
    }
}
