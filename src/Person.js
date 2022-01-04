import React from 'react';
import ReactDOM from 'react-dom';
import { InputGroup, FormControl, Input } from "react-bootstrap";
import './Person.css'

class PersonBoard extends React.Component {
    renderSpendings() {
        const spendings = this.props.spendings;
        let content = [];
        for (let item of spendings) {
            content.push(<li>{item}</li>);
        }
        return (
            <div>
                <h4 className='person spending-title'>开销：</h4>
                <ul className="spending-list">{content} </ul>
            </div>
        )
    }

    renderSpendingInput() {
        return (
            <InputGroup>
                <FormControl type="number" placeholder="添加收支记录" onKeyPress={this.props.onEnterSpending} />
            </InputGroup>
        );
    }

    renderNameInput() {
        if (this.props.hasName) {
            return (
                <div>
                    <h4 className='person name-title'>姓名：</h4>
                    <div className='person name'>{this.props.name}</div>
                </div>

            )
        } else {
            const { inputValue } = 0;
            return (
                <InputGroup>
                    <FormControl placeholder="输入名字" onKeyPress={this.props.onEnterName} />
                </InputGroup>

            );
        }

    }

    render() {
        // console.log("PersonBoard:render()", this.props);
        return (
            <div className='person board'>
                {this.renderNameInput()}
                {this.renderSpendings()}
                {this.renderSpendingInput()}
                <hr className="solid"></hr>
                <h4 className='person sum-title'>个人小结：</h4>
                <div className='person sum'>{this.props.personalSum}</div>
            </div>
        );
    }
}

export default PersonBoard;
