import React from 'react';
import ReactDOM from 'react-dom';
import { InputGroup, FormControl, Input } from "react-bootstrap";

class PersonBoard extends React.Component {
    constructor(props) {
        super(props)
        console.log(this.props.name);
        this.state = {
            name: this.props.name,
            hasName: this.props.hasName,
            spendings: this.props.spendings,
            spendSum: this.props.sum,
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
                <FormControl type="number" placeholder="Add Spending" onKeyPress={this.props.onEnterSpending} />
            </InputGroup>

        );
    }

    renderNameInput() {

        if (this.state.hasName) {
            return (
                <h4>{this.state.name}</h4>
            )

        } else {
            const { inputValue } = 0;
            return (

                <InputGroup>
                    <FormControl placeholder="Input Name" onKeyPress={this.props.onEnterName} />
                </InputGroup>

            );
        }

    }

    render() {
        console.log("PersonBoard:render()", this.state);
        return (
            this.props,
            <p style={{ border: "solid 4px #CCC", display: 'inline-block' }}>

                {this.renderNameInput()}
                {this.renderSpendings()}
                {this.renderSpendingInput()}
                <h4>Sum: {this.state.spendSum}</h4>
            </p>
        );
    }
}

// PersonBoard.defaultProps = {
//     name: "no-name",
//     hasName: false,
//     spendings: Array(0),
//     spendSum: 0,
// };

export default PersonBoard;
