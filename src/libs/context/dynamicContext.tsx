import React, { ReactNode, useEffect, useState } from 'react'

export interface ContainerProviderProps<State = void> {
  initialState?: State
  children: React.ReactNode
}

function createContext<Value, State = void>(
  useHook: (initialState?: State) => Value,
) {
  const DynamicContext = React.createContext<Value | null>(null)

  const Provider = (props: ContainerProviderProps<State>) => {
    const value = useHook(props.initialState)

    return (
      <DynamicContext.Provider value={value}>
        {props.children}
      </DynamicContext.Provider>
    )
  }

  const useDynamicContext = () => {
    const context = React.useContext(DynamicContext)
    if (!context) {
      throw new Error('useDynamicContext必须在DynamicContextProvider中使用')
    }
    return context
  }

  return { useDynamicContext, Provider }
}
export default createContext
