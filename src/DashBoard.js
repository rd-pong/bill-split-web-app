import React from 'react';
import ReactDOM from 'react-dom';
import { InputGroup, FormControl, Input } from "react-bootstrap";
import PersonBoard from './Person';
import App from './App';
import getTransaction from './getTransactions'
import './DashBoard.css'

class Person {
    constructor(name = '', hasName = false, spendings = [], personalSum = 0) {
        this.name = name;
        this.hasName = hasName;
        this.spendings = spendings;
        this.personalSum = personalSum
    }
}

class DashBoard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // people: [new Person('person1'), new Person('person2')],
            people: [new Person('person1')],
            records: []
        }

        //NB always bind stuffs
        this.onEnterNewPerson = this.onEnterNewPerson.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.renderHumanResults = this.renderHumanResults.bind(this)
    }

    onEnterNewPerson(event) {
        if (event.key === "Enter" && event.target.value !== "") {
            let inputVal = event.target.value;

            this.setState((state, props) => {
                return {
                    people: [...this.state.people, new Person(inputVal, true)]
                }
            });

            // console.log('state', this.state.people);
            event.target.value = ""
        }
    }

    onEnterSpending(event, i) {
        if (event.key === "Enter" && event.target.value !== "") {
            let inputVal = Number(event.target.value);
            // console.log('Person', i, 'add', inputVal);

            let peopleNew = this.state.people.slice();
            let personOld = peopleNew[i];
            peopleNew[i] = new Person(personOld.name, personOld.hasName, [...personOld.spendings, inputVal], personOld.personalSum + inputVal);

            this.setState((state, props) => {
                return {
                    people: peopleNew
                }
            });

            // console.log('state', this.state.people);
            event.target.value = ""
        }
    }

    onEnterName(event, i) {
        if (event.key === "Enter" && event.target.value !== "") {
            let inputVal = event.target.value;
            // console.log('Person', i, 'name', inputVal);

            let peopleNew = this.state.people.slice();
            let personOld = peopleNew[i];
            peopleNew[i] = new Person(inputVal, true, personOld.spendings, personOld.personalSum);

            this.setState((state, props) => {
                return {
                    people: peopleNew
                }
            });

            // console.log('state', this.state.people);
            event.target.value = ""
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log('You clicked submit.');
        this.setState((state, props) => {
            return {
                records: getTransaction(this.state.people)
            }
        });
    }

    renderPerson(i) {
        let person = this.state.people[i];
        // console.log("DashBoard:renderPerson(", i, ")", person);
        return (
            <PersonBoard
                name={person.name}
                spendings={person.spendings}
                hasName={person.hasName}
                personalSum={person.personalSum}
                onEnterName={(event) => this.onEnterName(event, i)}
                onEnterSpending={(event) => this.onEnterSpending(event, i)}
            />
        );
    }


    renderHumanResults() {
        // console.log(this.state.records);
        let content = [];
        if (this.state.records.length === 0) return content;

        content.push(<h3>第三步：怎么转：</h3>)
        this.state.records.forEach((record, index) => {
            content.push(<li key={index}>{record.from} 给 {record.to} {record.value}</li>);
        });

        return (content)
    }

    render() {
        // console.log("DashbBard:render()", this.state.people);

        let content = [];

        for (let i = 0; i < this.state.people.length; i++) {
            content.push(<li key={i.toString()}>{this.renderPerson(i)}</li>);
        }

        return (
            <div>
                <h3>第一步：输入个人收支记录（➕为开销，➖为收入）</h3>
                <ol className="people-boards"> {content} </ol>
                <ul>
                    <InputGroup>
                        <FormControl placeholder="输入新人物姓名" onKeyPress={this.onEnterNewPerson} />
                    </InputGroup>
                </ul>

                <hr className="solid" />
                <h3>第二步：点⬇️</h3>
                <ul>
                    <form onSubmit={this.handleSubmit}>
                        <button type="submit">给爷算</button>
                    </form>
                </ul>

                <hr className="solid" />

                {this.renderHumanResults(this.state.records)}

            </div>

        )
    }


}

export default DashBoard;