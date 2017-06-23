import React from 'react';
import {connect} from 'react-redux';
import './index.css';

export function LoginPage() {
    return <a href={'/api/auth/google'} className='login-btn' >START</a>;
}

const mapStateToProps = (state)  => ({
})

export default connect(mapStateToProps)(LoginPage);
