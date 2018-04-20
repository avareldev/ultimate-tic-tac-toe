// Import React and ReactDOM for the browser
import React from 'react';
import ReactDOM from 'react-dom';

// Import Redux
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reducers from '../reducers';
import thunk from 'redux-thunk';

// Import Router and history
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';

export default function createEntry(App, dev = false){
    // create a browser history
    const history = createHistory();
    const middleware = routerMiddleware(history);
    // setup redux dev tools
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    // get predefined state from server
    const preloadedState = window.__PRELOADED_STATE__;
    delete window.__PRELOADED_STATE__;

    // create redux store with router, preloaded state and dev tools
    const store = createStore(
        combineReducers({
            ...reducers,
            router: routerReducer
        }),
        preloadedState,
        composeEnhancers(
            applyMiddleware(
                middleware,
                thunk
            )
        ),
    )

    // hydrate (render) the already rendered app from the server
    let render = ReactDOM.hydrate;
    if(dev) render = ReactDOM.render;
    render(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <App />
            </ConnectedRouter>
        </Provider>,
        document.getElementById('root')
    );
}