import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import store from './redux/redux-store'
import App from './App'
import { withLoader } from './hoc/withLoader'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const AppWithLoader = withLoader(App)

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <AppWithLoader />
        </Provider>
    </React.StrictMode>
)
