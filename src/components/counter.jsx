import React, { Component } from "react";

class Counter extends Component {
    render() {
        const { counter, onDelete, onIncrement, onDecrement } = this.props;

        return (
            <tr>
                <td>
                    <span className={this.getBadgeColour()}>
                        {this.formatCount()}
                    </span>
                </td>
                <td>
                    <button
                        className="btn btn-secondary btn-sm m-2"
                        onClick={() => onIncrement(counter)}
                    >
                        <i className="fa fa-plus"></i>
                    </button>
                </td>
                <td>
                    <button
                        className="btn btn-secondary btn-sm m-2"
                        onClick={() => onDecrement(counter)}
                        disabled={
                            this.props.counter.value === 0 ? "disabled" : ""
                        }
                    >
                        <i className="fa fa-minus"></i>
                    </button>
                </td>
                <td>
                    <button
                        className="btn btn-danger btn-sm m-2"
                        onClick={() => onDelete(counter.id)}
                    >
                        <i className="fa fa-times"></i>
                    </button>
                </td>
            </tr>
        );
    }

    getBadgeColour() {
        let classes = "badge m-2 badge-";
        return (classes +=
            this.props.counter.value === 0 ? "warning" : "primary");
    }

    formatCount() {
        const { value } = this.props.counter;
        return value === 0 ? "Zero" : value;
    }
}

export default Counter;
