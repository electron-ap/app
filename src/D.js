import React, { useReducer, useState } from 'react'
import { createSelector } from 'reselect'

const initialState = { num: 0 }

const reducer = (state, action) => {
  console.log(7)
  switch (action.type) {
    case 'increment':
      return { ...state, num: state.num + 1 }
    case 'decrement':
      return { ...state, num: state.num - 1 }
    default:
      return state
  }
}

const todosReducer = (state, action) => {
  switch (action.type) {
    case 'add':
      state.push(new Date().valueOf())
      return [...state]
    case 'delete':
      state.pop()
      return [...state]
    default:
      return state
  }
}
const ComponentUseReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [todos, dispatchTodo] = useReducer(todosReducer, [])
  const [value, setValue] = useState(0)
  const { num } = state
  console.log(state, todos)
  return (
    <div>
      <h2 onClick={() => setValue((prev) => prev + 1)}>
        Using useReducer{value}
      </h2>
      Number: {num}
      <button onClick={() => dispatchTodo({ type: 'add' })}>数组增加</button>
      <button onClick={() => dispatchTodo({ type: 'delete' })}>数组减少</button>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </div>
  )
}

export default ComponentUseReducer
