// 判断对象的方法
import isPlainObject from 'lodash/isPlainObject'
// 创建一个唯一symbol值，用做对象属性，这个库对Symbol的获取做了兼容
import $$observable from 'symbol-observable'

// 创建一个私有的 action,用于创建store的时候调用
export const ActionTypes = {
  INIT: '@@redux/INIT'
}
// 创建 createStore 方法，接收reducer，初始的state和中间件
export default function createStore(reducer, preloadedState, enhancer) {
  // preloadedState是可选参数，如果preloadedState是函数，并且enhancer不存在，则表示第二个参数传进来的是中间件方法
  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    // 把第二个参数赋值给 enhancer
    enhancer = preloadedState
    // preloadedState 置成undefined
    preloadedState = undefined
  }

  // 如果中间件存在
  if (typeof enhancer !== 'undefined') {
    // 如果中间件不是函数，则抛出异常
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.')
    }
    // 否则调用中间件函数，传入createStore参数，返回一个方法，需要接受reducer和preloadedState
    // applyMiddleware方法返回这样一个方法
    return enhancer(createStore)(reducer, preloadedState)
  }

  // 处理完中间件或者没有中间件，执行到这里
  // 如果reducer不是方法，就会跑出异常
  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.')
  }
  // 定义变量存储reducer
  let currentReducer = reducer
  // 定义变量存储初始preloadedState
  let currentState = preloadedState
  // 定义事件监听容器
  let currentListeners = []
  // 定义接下来要执行的事件容器，初始值和currentListeners一致[]
  let nextListeners = currentListeners
  // 定义变量标示是否正在调用dispatch
  let isDispatching = false

  // 转换listerners，如果 currentListeners 和 currentListeners 相等，则nextListeners深拷贝currentListeners的值
  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice()
    }
  }

  // 获取state
  function getState() {
    return currentState
  }

  // 做一些事件监听
  function subscribe(listener) {
    // 如果listener不是方法，则抛出异常
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function.')
    }

    // 定义正在监听的标示
    let isSubscribed = true
    // 把currentListeners获取到，并且存入新的listener
    ensureCanMutateNextListeners()
    nextListeners.push(listener)

    // subscribe 执行结果返回一个 unsubscribe 方法，用于把当前listener删除掉
    return function unsubscribe() {
      // 如果已经删除掉了，则返回
      if (!isSubscribed) {
        return
      }
      // isSubscribed置成false，表示没在坚挺状态
      isSubscribed = false

      // 从nextListeners中移除
      ensureCanMutateNextListeners()
      const index = nextListeners.indexOf(listener)
      nextListeners.splice(index, 1)
    }
  }

  // dispatch方法接收action
  function dispatch(action) {
    // 判断action是不是对象，如果不是则抛出异常
    if (!isPlainObject(action)) {
      throw new Error(
        'Actions must be plain objects. ' +
        'Use custom middleware for async actions.'
      )
    }
    // 如果action格式不符合要求，没有type属性，则抛出异常
    if (typeof action.type === 'undefined') {
      throw new Error(
        'Actions may not have an undefined "type" property. ' +
        'Have you misspelled a constant?'
      )
    }

    // 如果正在执行dispatch则抛出异常
    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.')
    }

    try {
      // 尝试执行reducer
      isDispatching = true
      // reducer执行结果返回操作后的state
      currentState = currentReducer(currentState, action)
    } finally {
      // 如果操作失败，则标示当前reducer不可以处理这个action
      isDispatching = false
    }

    // currentListeners值和nextListeners统一，并且执行所有的listener
    const listeners = currentListeners = nextListeners
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i]
      listener()
    }
    // 返回当前action
    return action
  }

  // 替换reducer方法
  function replaceReducer(nextReducer) {
    // 如果替换的reducer不是方法抛出异常
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.')
    }
    // 替换当前的reducer方法
    currentReducer = nextReducer
    // 执行一次dispatch
    dispatch({ type: ActionTypes.INIT })
  }

  // 返回一个对象，包含subscribe 和 $$observable方法 
  function observable() {
    const outerSubscribe = subscribe
    return {
      // 接收的observer必须是一个对象，必须有next方法，在subscribe的时候会先执行一次next方法
      subscribe(observer) {
        if (typeof observer !== 'object') {
          throw new TypeError('Expected the observer to be an object.')
        }

        // 查找next方法并执行
        function observeState() {
          if (observer.next) {
            observer.next(getState())
          }
        }

        // 在subscribe的时候会先执行一次next方法
        observeState()
        // 同样加入监听容器中，执行结果返回可删除当前函数的方法
        const unsubscribe = outerSubscribe(observeState)
        return { unsubscribe }
      },
      // 返回当前对象
      [$$observable]() {
        return this
      }
    }
  }

  // 创建的时候就执行一个默认的dispatch,让所有的reducer返回初始的state，生成一个初始state树
  dispatch({ type: ActionTypes.INIT })

  // 把这几个方法提供出去
  return {
    dispatch,
    subscribe,
    getState,
    replaceReducer,
    [$$observable]: observable
  }
}