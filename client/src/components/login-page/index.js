import React from 'react';
import {connect} from 'react-redux';
import {} from './actions';
import './index.css';

export function LoginPage() {
    return <a href={'/api/auth/google'}>Login with Google</a>;
}

const mapStateToProps = (state)  => ({
})

export default connect(mapStateToProps)(LoginPage);
