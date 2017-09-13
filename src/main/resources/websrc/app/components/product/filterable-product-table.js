import React from 'react'
import PropTypes from 'prop-types';

import SearchBar from "./search-bar";
import ProductTable from "./product-table";

export default class FilterableProductTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            filterText: '',
            stockOnly: false
        };

        this.handleFilterTextInput = this.handleFilterTextInput.bind(this);
        this.handleStockOnlyInput = this.handleStockOnlyInput.bind(this);
    }

    handleFilterTextInput(filterText) {
        this.setState({filterText: filterText});
    }

    handleStockOnlyInput(stockOnly) {
        this.setState({stockOnly: stockOnly});
    }

    render() {
        const products = this.props.products;
        return (
            <div>
                <SearchBar
                    filterText={this.state.filterText}
                    onFilterTextInput={this.handleFilterTextInput}
                    stockOnly={this.state.stockOnly}
                    onStockInput={this.handleStockOnlyInput}
                />
                <ProductTable
                    products={products}
                    filterText={this.state.filterText}
                    stockOnly={this.state.stockOnly}
                />
            </div>
        );
    }

}

FilterableProductTable.propTypes = {
    products: PropTypes.array.isRequired
};