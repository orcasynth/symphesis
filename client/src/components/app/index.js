import React from 'react';
import * as Cookies from 'js-cookie';

import SocketWrapper from '../socket-wrapper';
import LoginPage from '../login-page';
import {connect} from 'react-redux';
import {fetchUser} from './actions';
import './index.css';

class App extends React.Component {
    componentDidMount() {
        const accessToken = Cookies.get('accessToken');
        if (accessToken) {
           this.props.dispatch(fetchUser(accessToken));
        }
    }

    render() {
        if (!this.props.currentUser) {
            return <LoginPage />;
        }

        return <SocketWrapper />;
    }
}

const mapStateToProps = (state)  => ({
    currentUser: state.app.currentUser,
    loading: state.app.loading,
    statusCode: state.app.statusCode,
    room: state.socketWrapper.room,
})

export default connect(mapStateToProps)(App);
