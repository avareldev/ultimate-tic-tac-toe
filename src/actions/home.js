import fetch from 'node-fetch';

export const HOME_SET_INITIAL_DATA = 'HOME_SET_INITIAL_DATA';

export function homeSetInitialData(){
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            // has to return an action that returns a primise
            fetch("https://swapi.co/api/people")
                .then(res => res.json())
                .then(data => {
                    dispatch({
                        type: 'HOME_SET_INITIAL_DATA',
                        payload: data
                    });
                    resolve();
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
}
