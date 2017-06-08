import React from 'react';
import * as Cookies from 'js-cookie';

import io from 'socket.io-client';
const socket = io();
export default class QuestionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: []
        };
    }
    componentWillMount() {
    }
    componentDidMount() {
        socket.on('connect', () => {
            console.log('we have connected')
            socket.emit('test1', 'test1')
        })
        const accessToken = Cookies.get('accessToken');
        fetch('/api/questions', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }).then(res => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json();
        }).then(questions =>
            this.setState({
                questions
            })
        );
    }

    render() {
        const questions = this.state.questions.map((question, index) =>
            <li key={index}>{question}</li>
        );
                // socket.on('message', (msg) => console.log(msg))
        return (
            <div>
            <button onClick={() => socket.emit('room', {room: 'yolt'})}>JOINROOM</button> 
            {/*<button onClick={() => {console.log('second button fired')
                socket.emit('message', {room: 'yolt', message: 'hi'})}}>SENDMESSAGE</button>*/}
            <button onClick={() => socket.emit('shit fucker', {room: 'yolo'})}>msg2</button> 
            </div>
        );
    }
}
