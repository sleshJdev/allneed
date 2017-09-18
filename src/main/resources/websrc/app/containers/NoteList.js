import {connect} from "react-redux";

import {deleteNote} from "../actions/index";
import NoteList from "../components/NoteList";

export default connect(state => ({
    cityTitle: state.cityTitle,
    notes: state.notes
}), dispatch => ({
    deleteNote: noteId => dispatch(deleteNote(noteId))
}))
(NoteList);