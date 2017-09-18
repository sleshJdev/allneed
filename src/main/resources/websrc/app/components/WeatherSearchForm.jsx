import React from 'react';
import PropTypes from 'prop-types';

const WeatherSearchForm = ({cityTitle, updateCityTitleForSearch, saveNote}) => {
    let noteTextarea;
    return (<form>
        <div className="form-group row">
            <label htmlFor="search-text" className="col-md-3 col-form-label">
                Search text:
            </label>
            <div className="col-md-9">
                <input id="search-text" type="text" placeholder="Text for search..." className="form-control"
                       value={cityTitle}
                       onChange={e => {updateCityTitleForSearch(e.target.value);}}/>
            </div>
        </div>
        <div className="form-group row">
            <label htmlFor="note" className="col-md-3 col-form-label">Note about city</label>
            <div className="col-md-9">
                <textarea id="note" className="form-control" rows="3" ref={e => noteTextarea = e}/>
                <button type="button" className="form-control" onClick={() => {
                    saveNote(cityTitle, noteTextarea.value);
                    noteTextarea.value = '';
                }}>Save</button>
            </div>
        </div>
    </form>);
};

WeatherSearchForm.propTypes = {
    updateCityTitleForSearch: PropTypes.func.isRequired,
    saveNote: PropTypes.func.isRequired
};

export default WeatherSearchForm;

