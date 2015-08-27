import { node } from 'vidom';
import StatefulComponent from './Stateful';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Info from './Info';
import todosModel from '../models/todos';
import { Router } from 'Director';

export default class extends StatefulComponent {
    getInitialState() {
        return {
            todos : todosModel.get(),
            filter : undefined
        };
    }

    onRender() {
        const { todos, filter } = this.getState();

        if(!filter) {
            return null;
        }

        const children = [node(Header)
            .key('header')
            .attrs({ onAdd : title => todosModel.add(title) })
        ];

        if(todos.length) {
            children.push(
                node(Main).key('main').attrs({
                    todos,
                    filter,
                    onRemove : id => todosModel.remove(id),
                    onEdit : (id, title) => todosModel.setTitle(id, title),
                    onToggle : id => todosModel.toggleCompleted(id),
                    onCompleteAll : () => todosModel.completeAll(),
                    onUncompleteAll : () => todosModel.uncompleteAll()
                }),
                node(Footer).key('footer').attrs({
                    todos,
                    filter,
                    onRemoveCompleted : () => todosModel.removeCompleted()
                }));
        }

        return node('div').children([
            node('section')
                .key('todoapp')
                .attrs({ className : 'todoapp' })
                .children(children),
            node(Info).key('info')
        ]);
    }

    onMount() {
        this.router = new Router({
            '!/(active|completed)' : filter => {
                this.setState({ filter });
            }
        }).configure({
            notfound : () => {
                this.setState({ filter : 'all' });
            }
        });

        this.router.init('/');

        todosModel.onUpdate(todos => {
            this.setState({ todos });
        });
    }
}
