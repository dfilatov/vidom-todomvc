import { Component } from 'vidom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Info from './Info';
import todosModel from '../models/todos';
import { Router } from 'Director';

export default class extends Component {
    onInitialStateRequest() {
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

        return (
            <div>
                <section class="todoapp">
                    <Header onAdd={ title => todosModel.add(title) }/>
                    { todos.length?
                        <Main
                            todos={ todos }
                            filter={ filter }
                            onRemove={ id => todosModel.remove(id) }
                            onEdit={ (id, title) => todosModel.setTitle(id, title) }
                            onToggle={ id => todosModel.toggleCompleted(id) }
                            onCompleteAll={ () => todosModel.completeAll() }
                            onUncompleteAll={ () => todosModel.uncompleteAll() }/> :
                        ''
                    }
                    { todos.length?
                        <Footer
                            todos={ todos }
                            filter={ filter }
                            onRemoveCompleted={ () => todosModel.removeCompleted() }/>
                        :
                        ''
                    }
                </section>
                <Info/>
            </div>
        );
    }

    onMount() {
        const router = new Router({
            '!/(active|completed)' : filter => {
                this.setState({ filter });
            }
        }).configure({
            notfound : () => {
                this.setState({ filter : 'all' });
            }
        });

        router.init('/');

        todosModel.onUpdate(todos => {
            this.setState({ todos });
        });
    }
}
