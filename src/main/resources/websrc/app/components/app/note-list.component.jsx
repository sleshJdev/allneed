import React, {Component} from 'react';
import PropTypes from 'prop-types';
import HttpService from "../../service/http.service";

class NoteList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notes: []
        };
    }

    componentWillReceiveProps(props) {
        this.fetchNotes(props.city);
    }

    fetchNotes(city) {
        HttpService.get('/api/notes', {city: city}).then(notes =>
            this.setState(() => ({notes: notes})));
    }

    removeNote(noteId) {
        HttpService.remove('/api/notes', {id: noteId}).then(() =>
            this.fetchNotes(this.props.city))
    }

    render() {
        return (
            <div className="list-group">
                {
                    this.state.notes.map((note) => (
                        <a key={note.id} href="#"
                           className="list-group-item list-group-item-action flex-column align-items-start">
                            <div className="d-flex w-100 justify-content-between">
                                <span className="glyphicon glyphicon-remove-sign"
                                      onClick={() => this.removeNote(note.id)}/>
                            </div>
                            <p className="mb-1">{note.text}</p>
                            <small className="text-muted">
                                {note.createdAt}
                            </small>
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