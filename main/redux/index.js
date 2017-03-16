// index.js

// 引用各种资源
import createStore from './createStore'
import combineReducers from './combineReducers'
import bindActionCreators from './bindActionCreators'
import applyMiddleware from './applyMiddleware'
import compose from './compose'
import warning from './utils/warning'

// 环境检测
function isCrushed() {}

// 如果不是在生产环境，并且isCrushed函数的名字不是isCrushed，就会发出警告，代码压缩后isCrushed名字会被压缩
// 建议开发环境下使用未压缩代码
if (
  process.env.NODE_ENV !== 'production' &&
  typeof isCrushed.name === 'string' &&
  isCrushed.name !== 'isCrushed'
) {
  warning(
    'You are currently using minified code outside of NODE_ENV === \'production\'. ' +
    'This means that you are running a slower development build of Redux. ' +
    'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' +
    'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' +
    'to ensure you have the correct code for your production build.'
  )
}

// 对外提供方法
export {
  createStore,
  combineReducers,
  bindActionCreators,
  applyMiddleware,
  compose
}