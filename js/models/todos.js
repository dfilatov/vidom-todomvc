import uuid from '../utils/uuid';
import { getItem, setItem } from '../utils/storage';

const STORAGE_KEY = 'model-vidom',
    onUpdateFns = [];

let model = getItem(STORAGE_KEY) || [];

function get() {
    return model;
}

function add(title) {
    model = [...model, { id : uuid(), title, completed : false }];
    update();
}

function remove(id) {
    model = model.filter(todo => todo.id !== id);
    update();
}

function setTitle(id, title) {
    model = model.map(todo => todo.id === id? { ...todo, title } : todo);
    update();
}

function toggleCompleted(id) {
    model = model.map(todo => todo.id === id? { ...todo, completed : !todo.completed } : todo);
    update();
}

function completeAll() {
    model = model.map(todo => { return { ...todo, completed : true } });
    update();
}

function uncompleteAll() {
    model = model.map(todo => { return { ...todo, completed : false } });
    update();
}

function removeCompleted() {
    model = model.filter(todo => !todo.completed);
    update();
}

function onUpdate(fn) {
    onUpdateFns.push(fn);
}

function update() {
    setItem(STORAGE_KEY, model);
    onUpdateFns.forEach(fn => fn(model));
}

export default {
    get,
    add,
    remove,
    setTitle,
    toggleCompleted,
    completeAll,
    uncompleteAll,
    removeCompleted,
    onUpdate
}
