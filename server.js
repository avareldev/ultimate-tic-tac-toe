// import filesystem and express server
const fs = require('fs');
const express = require('express');

// import react and react-dom for server
const React = require('react');
const ReactDOMServer = require('react-dom/server');

// import redux
const {createStore, combineReducers, applyMiddleware} = require('redux');
const Provider = require('react-redux').Provider;
const thunk = require('redux-thunk').default;

// import react-router and history creator
const createHistory = require('history').createMemoryHistory;
const StaticRouter = require('react-router').StaticRouter;
const matchPath = require('react-router-dom').matchPath;
const { routerReducer, routerActions } = require('react-router-redux');

// import other utils
const Helmet = require('react-helmet').Helmet;
const minify = require('html-minifier').minify;

// import config
const {
    port,
    servePublic,
    caching,
    cachingHours
} = require('./config');

// initiate the cache
let cache = {};

// require your app
const { App, routes } = require('./dist/app.js');

// require your reducers
const reducers = require('./dist/reducers.js').default;

// create express server
const server = express();
// include generated index.html file to serve
const template = fs.readFileSync(__dirname + '/dist/index.html', 'utf-8');

// defined public route for react bundle
if(servePublic){
    server.use('/public', express.static(__dirname + '/dist/public'));
}

// serve all other routes other than /public
server.get('*', function (req, res) {
    if(req.url === "/favicon.ico") return;

    // check if we can get the response from cache
    const today = new Date();
    if(caching && cache[req.path] && (today.getTime() - cache[req.path].time) < (1000*60*60*cachingHours)){
        res.send(cache[req.path].response);
        return;
    }

    // get action we need to prefetch data before rendering
    let loadDataAction = undefined;
    routes.some(route => {
        const match = matchPath(req.url, route);
        if(match && route.getLoadDataAction) loadDataAction = route.getLoadDataAction(match);
        return match;
    });
    
    // create redux store
    const store = createStore(
        combineReducers({
            ...reducers,
            router: routerReducer
        }),
        applyMiddleware(thunk)
    ); 

    // set correct router path in store
    store.dispatch({
        type: "@@router/LOCATION_CHANGE",
        payload: { pathname: req.path }
    });

    if(loadDataAction){
        // dispatch the loadDataAction and render App with data
        store.dispatch(loadDataAction)
            .then(() => {
                try{
                    renderAndSend(req, res, store, today);
                }
                catch(err){
                    console.error(err)
                }
            })
            .catch((err) => {
                res.sendStatus(500, err)
            })
    }
    else{
        // render app without data
        renderAndSend(req, res, store, today);
    }
});

// run server on port 3000
server.listen(port, function () {
    console.log('Example app listening on port ' + port + '!');
});

const renderAndSend = (req, res, store, today) => {
    // create predefined state object with router location prefilled
    const preloadedState = store.getState();

    // render the react app to string
    // Add redux Provider and Router
    let reactContent = 
        ReactDOMServer.renderToString(
            React.createElement(Provider, {store: store},
                React.createElement(StaticRouter, {location: req.url, context: {}},
                    React.createElement(App, {}, null)
                )
            )
        );
    // wrap app in container
    reactContent = '<div id="root">' + reactContent + '</div>';
    // add predefined state to output
    reactContent += "<script>window.__PRELOADED_STATE__ = " + JSON.stringify(preloadedState).replace(/</g, '\\u003c') + "</script>";

    // replace react app in index.html template
    let final = template.replace('<div id="root"></div>', reactContent);

    // include react helmet
    const helmet = Helmet.rewind();
    let head = `
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
        ${helmet.style.toString()}
        ${helmet.script.toString()}
        ${helmet.noscript.toString()}
    `;
    final = final.replace('<title>react-helmet-placeholder</title>', head);

    // minify output
    final = minify(final, {
        collapseWhitespace: true
    });

    // fill cache
    if(caching){
        cache[req.path] = {
            time: today.getTime(),
            response: final
        };
    }

    // send response html page with prerendered react
    res.send(final);
};