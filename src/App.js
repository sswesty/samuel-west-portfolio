import React, { Component } from "react";
import Counters from "./components/counters";
import NavBar from "./components/navbar";
import "./App.css";

class App extends Component {
    state = {
        counters: [
            { id: 1, value: 1 },
            { id: 2, value: 0 },
            { id: 3, value: 0 },
            { id: 4, value: 0 },
        ],
    };

    handleDelete = (counterId) => {
        const counters = this.state.counters.filter(
            (counter) => counter.id !== counterId
        );
        this.setState({ counters });
    };

    handleReset = () => {
        const counters = this.state.counters.map(
            (counter) => (counter.value = 0)
        );
        this.setState(counters);
    };

    handleIncrement = (counter) => {
        const counters = [...this.state.counters];
        const counterId = counters.indexOf(counter);
        counters[counterId] = { ...counter };
        counters[counterId].value++;
        this.setState({ counters });
    };

    handleDecrement = (counter) => {
        const counters = [...this.state.counters];
        const counterId = counters.indexOf(counter);
        counters[counterId] = { ...counter };
        counters[counterId].value--;
        this.setState({ counters });
    };

    render() {
        return (
            <React.Fragment>
                <NavBar
                    totalCounters={
                        this.state.counters.filter(
                            (counter) => counter.value > 0
                        ).length
                    }
                />
                <Counters
                    counters={this.state.counters}
                    onDelete={this.handleDelete}
                    onReset={this.handleReset}
                    onIncrement={this.handleIncrement}
                    onDecrement={this.handleDecrement}
                />
            </React.Fragment>
        );
    }
}

export default App;
