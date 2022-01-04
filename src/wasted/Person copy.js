import React from 'react';
import ReactDOM from 'react-dom';
import { InputGroup, FormControl, Input } from "react-bootstrap";

class PersonBoard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "name",
            hasName: false,
            spendings: Array(0),
            // spendings: [1, 3, 4, 4, 1, 3, 4, 4],
            spendSum: 0,
        }

        // todo always bind stuffs
        this.onEnterSpending = this.onEnterSpending.bind(this);
        this.onEnterName = this.onEnterName.bind(this);
    }

    onEnterSpending(event) {
        if (event.key === "Enter" && event.target.value != "") {
            let inputVal = event.target.value;

            this.setState({ inputValue: inputVal });
            // update this.state.spendings
            this.setState({ spendings: [...this.state.spendings, inputVal] });
            this.setState((state) => {
                return { spendSum: (state.spendSum) + parseFloat(inputVal) };
            });

            // clear input field
            event.target.value = ""
        }
    }

    onEnterName(event) {
        if (event.key === "Enter" && event.target.value != "") {
            let inputVal = event.target.value;
            // update name/hasName
            this.setState((state) => {
                return {
                    name: inputVal,
                    hasName: true
                };
            });
        }
    }

    renderSpendings() {
        const spendings = this.state.spendings;

        // const listItems = spendings.map((number) =>
        //     <li>{number}</li>
        // );
        // return <ul className="spending-list"> {listItems}</ul>

        let content = [];
        for (let item of spendings) {
            content.push(<li>{item}</li>);
        }
        return <ul className="spending-list"> {content}</ul>
    }

    renderSpendingInput() {
        return (
            <InputGroup>
                <FormControl type="number" placeholder="Add Spending" onKeyPress={this.onEnterSpending} />
            </InputGroup>

        );
    }

    renderNameInput() {

        if (this.state.hasName) {
            console.log(this.state.name);
            return (
                <h4>{this.state.name}</h4>
            )

        } else {
            const { inputValue } = 0;
            return (

                <InputGroup>
                    <FormControl placeholder="Input Name" onKeyPress={this.onEnterName} />
                </InputGroup>

            );
        }

    }

    render() {
        const status = 'Next player: X';

        return (
            <div style={{ border: "solid 4px #CCC", display: 'inline-block' }}>
                {this.renderNameInput()}
                {this.renderSpendings()}
                {this.renderSpendingInput()}
                <h4>Sum: {this.state.spendSum}</h4>
            </div>
        );
    }
}

export default PersonBoard;
