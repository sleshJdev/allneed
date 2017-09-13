import React, {Component} from 'react';
import PropTypes from 'prop-types';
import HttpService from "../http/http.service";

class NoteList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notes: []
        };
    }

    componentWillReceiveProps(props) {
        HttpService.get('/api/notes', {city: props.city}).then(notes => {
            this.setState(() => ({
                notes: notes
            }));
        });
    }

    render() {
        return (
            <div className="list-group">
                {
                    this.state.notes.map((note) => (
                        <a key={note.id} href="#" className="list-group-item list-group-item-action flex-column align-items-start">
                            <div className="d-flex w-100 justify-content-between">
                                <small>{note.createdOn}</small>
                            </div>
                            <p className="mb-1">{note.text}</p>
                        </a>
                    ))
                }
            </div>
        );
    }

}

NoteList.defaultProps = {
    city: ''
};

NoteList.propTypes = {
    city: PropTypes.string
};

export default NoteList