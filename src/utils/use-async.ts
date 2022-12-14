import { useState } from "react";

export interface State<D> {
  error: Error | null;
  data: D | null;
  stat: 'idle' | 'loading' | 'error' | 'success'
}


const defaultInitialState: State<null> = {
  stat: 'idle',
  data: null,
  error: null
}
// const defaultConfig = {
//   throwOnError: false
// }
export const useAsync = <D>(initialState?: State<D>) => {
  // const config = {...defaultConfig, initialConfig} ,initialConfig?: typeof defaultConfig
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState
  })
  const setData = (data: D) => setState({
    data,
    stat: 'success',
    error: null
  })

    const setError = (error: Error) => setState({
    error,
    stat: 'error',
    data: null
  })
  //run用处触发异步请求
  const run = (promise: Promise<D>) => {
    if (!promise || !promise.then){
      throw new Error('请传入Promise类型')
    }
    setState({...state, stat: 'loading'})
    return promise.then(data => {
      setData(data)
      return data
    })
    .catch(error => {
      //catch 会消化异常，如果不主动抛出，外面接收不到异常
      setError(error)
      // if(config.throwOnError)return Promise.reject(error)
      return Promise.reject(error)
    })
  }
  return{
    isIdle: state.stat === 'idle',
    isLoading: state.stat === 'loading',
    isError: state.stat === 'error',
    isSuccess: state.stat === 'success',
    run,
    setData,
    setError,
    ...state
  }
}




  
