import { Component } from 'vidom';

const ENTER_KEY = 13;

export default class Header extends Component {
    onInit() {
        this.setState({ title : '' });
    }

    onRender() {
        return (
            <header class="header">
                <h1>todos</h1>
                <input
                    class="new-todo"
                    placeholder="What needs to be done?"
                    autofocus="true"
                    value={ this.state.title }
                    onChange={ e => this.onInputChange(e) }
                    onKeyUp={ e => this.onInputKeyUp(e) }
                />
            </header>
        );
    }

    onInputChange(e) {
        this.setState({ title : e.target.value });
    }

    onInputKeyUp(e) {
        if(e.nativeEvent.keyCode === ENTER_KEY) {
            const value = e.target.value.trim();

            if(value) {
                this.setState({ title : '' });
                this.attrs.onAdd(value);
            }
        }
    }
}
