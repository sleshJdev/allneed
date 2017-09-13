import React from 'react'

export default class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.handleFilterTextInputChange = this.handleFilterTextInputChange.bind(this);
        this.handleStockInputChange = this.handleStockInputChange.bind(this);
    }

    handleFilterTextInputChange(e) {
        this.props.onFilterTextInput(e.target.value);
    }

    handleStockInputChange(e) {
        this.props.onStockInput(e.target.checked);
    }

    render() {
        return (
            <form>
                <input type="text"
                       placeholder="Search..."
                       value={this.props.filterText}
                       onChange={this.handleFilterTextInputChange}/>
                <p>
                    <input type="checkbox"
                           value={this.props.stockOnly}
                           onChange={this.handleStockInputChange}/>
                    {' '}
                    Only show products in stock
                </p>
            </form>
        );
    }

}