import { Component } from 'vidom';

export default class StatefulComponent extends Component {
    onInit() {
        this._prevState = this.getInitialState(this.getAttrs());
        this._state = this._prevState;
    }

    getInitialState() {
        return {};
    }

    setState(state) {
        this._prevState = this._state;
        this._state = { ...this._state, ...state };
        this.update();
    }

    getState() {
        return this._state;
    }

    getPrevState() {
        return this._prevState;
    }
}
