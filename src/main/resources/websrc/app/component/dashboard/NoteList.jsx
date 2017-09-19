import React from 'react';
import PropTypes from 'prop-types';

const NoteList = ({notes, deleteNote}) => {
    return (
        <div className="list-group">
            {
                notes.map((note) => (
                    <a key={note.id} href="#"
                       className="list-group-item list-group-item-action flex-column align-items-start">
                        <div className="d-flex w-100 justify-content-between">
                            <span className="glyphicon glyphicon-remove-sign" onClick={() => deleteNote(note.id)}/>
                        </div>
                        <p className="mb-1">{note.text}</p>
                        <small className="text-muted">
                            {note.createdAt}
                        </small>
                    </a>
                ))
            }
        </div>);
};

NoteList.propTypes = {
    notes: PropTypes.array.isRequired,
    deleteNote: PropTypes.func.isRequired
};

export default NoteList