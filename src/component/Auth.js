import React, { useState, useRef } from 'react';

import './Auth.scss';
import Signin from './signin/Signin';
import Signup from './signup/Signup';

export default function Auth() {
    const [currentTab, setCurrentTab] = useState('signin');
    const btnDiv = useRef();

    const changeTab = (tabName) => {
        if (tabName === 'signin') {
            setCurrentTab('signin');
            btnDiv.current.style.right = '0';
        } else {
            setCurrentTab('signup');
            btnDiv.current.style.right = '50%';
        }
    };

    return (
        <>
            <div className="container">
                <div className="button-box">
                    <div ref={btnDiv} id="btn"></div>
                    <button className="toggle-btn" onClick={() => changeTab('signin')}>
                        ورود
                    </button>
                    <button className="toggle-btn" onClick={() => changeTab('signup')}>
                        ثبت نام
                    </button>
                </div>
                {currentTab === 'signin' && <Signin />}
                {currentTab === 'signup' && <Signup />}
            </div>
        </>
    );
}
