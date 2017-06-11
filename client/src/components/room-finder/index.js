import React from 'react';
import {connect} from 'react-redux';
import './index.css';

export class RoomFinder extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let rooms = [];
        for (let key in this.props.availableRooms) {
            let obj = this.props.availableRooms;
            let name = key;
            let number = (obj[key] < 6) ? obj[key] : "Full";
            rooms.push(<li key={name}>Room {name}: {number}<button onClick={() => this.props.joinRoom({name})}>Join</button></li>)
        }
        if (rooms.length < 1) {
            rooms = (<li>No rooms exist</li>)
        }
        let socketError = (this.props.socketError) ? (<li>Error: {this.props.socketError}</li>) : ''
        return (
            <div>
                <form onSubmit={e => this.props.createRoom(e)}>
                    <input type="text" name="room" autoComplete="off"
                        placeholder="Create a room" required />
                    <input type="submit" name="submit" value="Submit" />
                </form>
                <ul>
                    {socketError}
                    {rooms}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state)  => ({
    availableRooms: state.socketWrapper.availableRooms, 
    room: state.socketWrapper.room,
    socketError: state.socketWrapper.socketError
})

export default connect(mapStateToProps)(RoomFinder);
