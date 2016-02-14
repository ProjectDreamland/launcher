import React from 'react'
import ReactDOM from 'react-dom'
import Framework from './js/components/Framework.react'
import webUtil from './js/utils/webUtil'

webUtil.disableGlobalBackspace()
ReactDOM.render(<Framework />, document.getElementById('app'))