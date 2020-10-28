import React from 'react';
import { fetchCharacters, fetchMovies } from './Actions/Action';
import { connect  } from 'react-redux';
import { bindActionCreators } from 'redux';

class CharacterComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    onChange = ({target:{value}}) => {
        this.props.fetchMovies(Number(value) - 1);
    }

    componentDidMount(){
        this.props.fetchCharacters();
    }

    render(){
        const firtOption = {name:"Select"};
        const { characters, films } = this.props;
        const sortedFilm = films.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
        const lastWorkedMovie = sortedFilm && sortedFilm.length && sortedFilm[sortedFilm.length - 1]
        const allCharacters = [firtOption, ...characters];
        return(
            <>
                <div>
                    <div>
                        Characters
                    </div>
                    <select onChange={this.onChange}>
                        {
                            allCharacters.map((character, index) => {
                                return(
                                <option key={index} value={index}>{character.name}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div id="films">
                    <div>Films</div>
                    {
                        films.map(film => 
                            <div key={film}>
                                {film.title}
                            </div>
                            )
                    }
                </div>
                <div>
                    <div>Name/Year Last movie</div>
                    <hr/>
                    <div>
                        {lastWorkedMovie ? `${lastWorkedMovie.title}-${lastWorkedMovie.release_date}` : null}
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state, ownProps) =>{
    const characters = state.app.characters || [];
    const films = state.app.films || [];

    return {
        characters,
        films,
        ...ownProps
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({fetchCharacters, fetchMovies}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CharacterComponent);