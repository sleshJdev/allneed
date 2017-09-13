import React from 'react';
import PropTypes from 'prop-types';

class SearchForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            searchText: this.props.searchText,
            note: this.props.note
        };

        this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
        this.handleTextAreChange = this.handleTextAreChange.bind(this);
        this.handleSaveNote = this.handleSaveNote.bind(this);
    }

    handleSearchInputChange(event) {
        const searchText = event.target.value;
        this.setState({
            searchText: searchText
        });
        this.props.onSearchInputChange(searchText);
    }

    handleTextAreChange(event) {
        const note = event.target.value;
        this.setState({
            note: note
        });
    }

    handleSaveNote() {
        this.props.onSaveNote(this.state.note);
        this.setState({
            note: ''
        });
    }

    render() {
        return (
            <form>
                <div className="form-group row">
                    <label htmlFor="search-text" className="col-md-3 col-form-label">
                        Search text:
                    </label>
                    <div className="col-md-9">
                        <input id="search-text" type="text" placeholder="Text for search..." className="form-control"
                               value={this.state.searchText} onChange={this.handleSearchInputChange}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="note" className="col-md-3 col-form-label">Note about city</label>
                    <div className="col-md-9">
                        <textarea id="note" className="form-control" rows="3"
                                  onChange={this.handleTextAreChange} value={this.state.note}/>
                        <button type="button" className="form-control" onClick={this.handleSaveNote}>Save</button>
                    </div>
                </div>
                {false &&
                    <div className="form-group row">
                        <label htmlFor="search-type" className="col-md-3 col-form-label">
                            Search by:
                        </label>
                        <div className="col-md-9">
                            <select id="search-type" className="form-control" defaultValue={this.props.searchType}>
                                <option value="city">City</option>
                                <option value="country">Country</option>
                            </select>
                        </div>
                    </div>}
            </form>
        );
    }

}

SearchForm.defaultProps = {
    searchText: '',
    note: ''
};

SearchForm.propTypes = {
    searchText: PropTypes.string,
    onSearchInputChange: PropTypes.func.isRequired,
    onSaveNote: PropTypes.func.isRequired
};

export default SearchForm;

