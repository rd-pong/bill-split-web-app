import React from 'react';
import ReactDOM from 'react-dom';
import { InputGroup, FormControl, Input } from "react-bootstrap";
import PersonBoard from './Person';
import App from './App';

class PeopleBoard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            people: Array(2).fill(<PersonBoard
                name={' '}
                spendings={[]}
                hasName={false}
                onEnterName={(event) => this.onEnterName(event)}
                onEnterSpending={(event) => this.onEnterSpending(event)}
            />)
        }

        // todo always bind stuffs

    }

    // todo
    onEnterSpending(event, i) {
        if (event.key === "Enter" && event.target.value != "") {
            let inputVal = Number(event.target.value);
            // console.log('Person', i, 'add', inputVal);

            // let peopleNew = this.state.people.slice();
            let peopleNew = JSON.parse(JSON.stringify(this.state.people)) // deep copy
            let personOld = peopleNew[i].props;
            // peopleNew[i] = <PersonBoard
            //     name={personOld.name}
            //     spendings={[...peopleNew[i].props.spendings, inputVal]}
            //     hasName={personOld.hasName}
            //     onEnterName={personOld.onEnterName}
            //     onEnterSpending={personOld.onEnterSpending}
            // />;
            peopleNew = [<PersonBoard
                name={personOld.name}
                spendings={[...peopleNew[i].props.spendings, inputVal]}
                hasName={personOld.hasName}
                onEnterName={personOld.onEnterName}
                onEnterSpending={personOld.onEnterSpending}
            />]
            console.log(this);

            this.setState((state, props) => {
                return {
                    newState: false,
                    // people: Array(3).fill( peopleNew[i])
                    people: peopleNew
                }
            });

            console.log('state', this.state.people);

            // this.setState((state) => {
            //     return {
            //         people: peopleNew
            //     };
            // });

            event.target.value = ""
        }
    }

    onEnterName(event, i) {
        if (event.key === "Enter" && event.target.value != "") {
            let inputVal = event.target.value;
            console.log(this.state.people[i].props);
            // update name/hasName
            this.setState((state) => {
                return {
                    name: inputVal,
                    hasName: true
                };
            });
        }
    }

    renderPersonBoard(i) {
        let person = this.state.people[i].props;
        return (
            <PersonBoard
                name={person.name}
                spendings={person.spendings}
                hasName={person.hasName}
                onEnterName={(event) => this.onEnterName(event, i)}
                onEnterSpending={(event) => this.onEnterSpending(event, i)}
            />
        );
    }

    render() {

        let content = [];

        for (let i = 0; i < this.state.people.length; i++) {
            content.push(<li>{this.renderPersonBoard(i)}</li>);
        }

        return (
            <ol className="people-boards"> {content} </ol>

            // <App />
            // <h1>jfjfj</h1>   
        )
    }


}

export default PeopleBoard;