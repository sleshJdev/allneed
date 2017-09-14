import React from 'react'
import Footer from './Footer'
import AddTodo from '../../containers/AddTdo'
import VisibleTodoList from '../../containers/VisibleTodoList'

const App = () => (
    <div>
        <AddTodo />
        <VisibleTodoList />
        <Footer />
    </div>
);

export default App