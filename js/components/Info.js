import { Component, node } from 'vidom';

export default class Info extends Component {
    shouldUpdate() {
        return false;
    }

    onRender() {
        return node('footer')
            .attrs({ className : 'info' })
            .children([
                node('p').key(1).children('Double-click to edit a todo'),
                node('p').key(2).children([
                    node('span').key(1).children('Created by '),
                    node('a').key(2).attrs({ href : 'https://github.com/dfilatov/' }).children('Dmitry Filatov')
                ]),
                node('p').key(3).children([
                    node('span').key(1).children('Part of '),
                    node('a').key(2).attrs({ href : 'http://todomvc.com' }).children('TodoMVC')
                ])
            ]);
    }
}
