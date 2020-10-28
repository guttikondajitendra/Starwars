export const SET_CHARACTER_DATA = "SET_CHARACTER_DATA";
export const SET_FILMS = "SET_FILMS";
export const SHOW_LOADING = "SHOW_LOADING";

export const simpleAction = () => dispatch => {
    dispatch({
     type: 'SIMPLE_ACTION',
     payload: 'result_of_simple_action'
    })
}

export const fetchCharacters = () => dispatch => {
    const url = "https://swapi.dev/api/people/";
    return fetch(url, {
        method: 'GET',
      }).then(res => res.json())
      .then( data => {
        dispatch({
            type: SET_CHARACTER_DATA,
            payload: data.results
        })
    }).catch(err => {
        //Error handling should go here.
        console.log(err);
    });
}

export const fetchMovies = (characterIndex) => async (dispatch, getState) => {
    const { characters } = getState().app;
    dispatch(showLoading(true));
    if(characterIndex >= 0){
        const character = characters[characterIndex];
        const filmData = [];
        const data = await Promise.all(
            character.films.map(filmUrl => fetchFilm(filmUrl, filmData))
        );
        console.log(data);
        dispatch({
            type: SET_FILMS,
            payload: data
        });
    }else{
        dispatch({
            type: SET_FILMS,
            payload: []
        });
    }
    dispatch(showLoading(false));
}

export const showLoading = (loading) => dispatch => {
    dispatch({
        type: SHOW_LOADING,
        payload: loading
    })
}

const fetchFilm = (url, filmData) => {
    return fetch(url, {
        method: 'GET',
      }).then(res => res.json())
      .catch(err => {
        //Error handling should go here.
        console.log(err);
    });
}
