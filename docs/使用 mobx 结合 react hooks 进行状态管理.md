## 使用 mobx 结合 react hooks 进行状态管理



> react hooks 可以在不编写 class 组件的情况下使用 state 等特性，这使得我们可以使用纯函数式组件开发 react 应用。对于全局的状态管理，这里选择了使用mobx。

### 1. 创建store

```tsx
// store.ts
import React, { createContext, useContext } from 'react'
import { useLocalStore } from 'react-mobx'

// 初始状态，这里存放一些需要全局共享的 state
const initialState = {
  state1: '',
  state2: 0,
  state3: false
}
const createStore = () => initialState
type StoreState = ReturnType<typeof createStore>

export const StoreContext = createContext<StoreState | null>(null)
export const StoreProvider: React.FC = ({ children }) => {
  const store = useLocalStore(() => initialState)
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}
export const useStore = () => {
  const store = useContext(StoreContext)
  if (!store) throw new Error('You have forgot to use StoreProvider, shame on you.')
  return store
}
```

### 2. index.tsx

```tsx
// index.tsx
import React from 'react'
import { StoreProvider } from './store'

ReactDOM.render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  document.getElementById('root')
)

```

### 3 在组件中使用

```tsx
//MyComponents.tsx
import React, { FC } from 'react'
import { useObserver } from 'mobx-react'
import { useStore } from 'store'

const MyComponents: React.FC = () => {
  const store = useStore()
  
  const toggleState3 = () => {
    store.state3 = !store.state3
  }
  
  const addState2 = () => {
    store.state2 = store.state2++
  }
  
  return useObserver(() => (
    <div>
      <p>state1: { store.state1 }</p>
      <p>state2: { store.state2 }</p>
      <p>state3: { store.state3 }</p>
      <button onClick={addState2}>addState2</button>
      <button onClick={toggleState3}>toggleState3</button>
    </div>
  ))
}

export default MyComponents
```



