import { Component } from 'vidom';

export default class StatefulComponent extends Component {
    onInit() {
        this._state = this.getInitialState(this.getAttrs());
    }

    getInitialState() {
        return {};
    }

    setState(state) {
        this._state = { ...this._state, ...state };
        this.update();
    }

    getState() {
        return this._state;
    }
}
