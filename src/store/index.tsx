import { observable, action } from 'mobx'
import { useLocalStore } from 'mobx-react'
import React, { createContext, useContext } from 'react'

export const createStore = () => {
  return {
    playlist: [],
    albumList: [],
    isPlaying: false,
  }
}

type StoreState = ReturnType<typeof createStore>

export const StoreContext = createContext<StoreState | null>(null)

export const StoreProvider: React.FC = ({ children }) => {
  const store = useLocalStore(createStore)
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

export const useStore = () => {
  const store = useContext(StoreContext)
  console.log({ store })
  if (!store) throw new Error('You have forgot to use StoreProvider, shame on you.')
  return store
}

// export class StateStore {
//   @observable.shallow playlist: string[] = []
//   @observable.shallow albumList: string[] = []
//   @observable isPlaying: boolean = false

//   @action.bound
//   togglePlay = () => {
//     console.log('切换播放状态')
//     this.isPlaying = !this.isPlaying
//     console.log(this.isPlaying)
//   }
// }

// export const intialStore = new StateStore()

// export const StoreContext = createContext<StateStore>(intialStore)
// export const StoreProvider = StoreContext.Provider
// export const useStore = (): StateStore => useContext(StoreContext)
