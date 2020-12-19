import React, { Component } from 'react';

class HeaderComponent extends Component {
    render() {
        return (
            <div>
                 <header className="header-content header" >
                <div className="logo-content">
                    <img src="../assets/logo.png" alt="" />
                    <div>
                        <span className="emp-text">EMPLOYEE</span><br />
                        <span className="emp-text emp-payroll">PAYROLL</span>
                    </div>
                </div>
                </header>
                
            </div>
        );
    }
}

export default HeaderComponent;