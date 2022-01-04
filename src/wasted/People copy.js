import React from 'react';
import ReactDOM from 'react-dom';
import { InputGroup, FormControl, Input } from "react-bootstrap";
import PersonBoard from './Person';

class PeopleBoard extends React.Component {
    constructor(props) {
        super(props)
        // this.state = {
        //     people: Array(3).fill(new PersonBoard())
        // }

        // todo always bind stuffs

    }

    render() {
        // console.log(this.state.people);
        // let content = [];
        // for (let p of this.state.people) {
        //     content.push(<li>{p.render()}</li>);
        // }

        return (
            <PersonBoard />
            // <ol className="people-boards"> {content} </ol>
        )
    }


}

export default PeopleBoard;