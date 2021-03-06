import React, { Component } from 'react';
import axios from 'axios';
import { Consumer } from '../../Context';

export default class Search extends Component {
    state = {
        trackTitle: ''
    };

    findTrack = (dispatch, e) => {
        e.preventDefault();
        axios
            .get(
                `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=9199b050a1939244d25710674776bbbb`
            )
            .then(res => {
                dispatch({
                    type: 'SEARCH_TRACK',
                    payload: res.data.message.body.track_list
                });
                this.setState({ trackTitle: '' });
            })
            .catch(err => console.log(err));
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        return (
            <div>
                <Consumer>
                    {value => {
                        const { dispatch } = value;
                        return (
                            <div className="card card-body mb-4 p-4">
                                <h1 className="dsiplay-4 text-center title">
                                    <i className="fas fa-music" /> Search for A
                                    song
                                </h1>
                                <p className="lead text-center">
                                    Get the Lyrics for your favourite Songs
                                </p>
                                <form
                                    onSubmit={this.findTrack.bind(
                                        this,
                                        dispatch
                                    )}
                                >
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control form-control"
                                            placeholder="Song title"
                                            name="trackTitle"
                                            value={this.state.trackTitle}
                                            onChange={this.onChange}
                                        />
                                    </div>
                                    <button
                                        className="btn btn-dark btn btn-block"
                                        type="submit"
                                    >
                                        Search Lyrics
                                    </button>
                                </form>
                            </div>
                        );
                    }}
                </Consumer>
            </div>
        );
    }
}
