import React, { Component } from "react";
import Counter from "./counter";

class Counters extends Component {
    render() {
        const {
            onReset,
            counters,
            onDelete,
            onIncrement,
            onDecrement,
        } = this.props;

        return (
            <div className="container">
                <button
                    onClick={onReset}
                    className="btn btn-sm btn-primary m-2"
                >
                    Reset
                </button>
                <table>
                    <tbody>
                        {counters.map((counter) => (
                            <Counter
                                key={counter.id}
                                counter={counter}
                                onDelete={onDelete}
                                onIncrement={onIncrement}
                                onDecrement={onDecrement}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Counters;
