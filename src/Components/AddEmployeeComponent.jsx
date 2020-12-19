import React, { Component } from 'react';
import EmployeeService from'../Services/EmployeeService';

class AddEmployeeComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            salary: '400000',
            gender: '',
            startDate: '',
            note: '',
            department: [],
            day:'',
            month:'',
            year:''
            
        }

        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeSalaryHandler = this.changeSalaryHandler.bind(this);
        this.changeGenderHandler = this.changeGenderHandler.bind(this);
        this.changeNoteHandler = this.changeNoteHandler.bind(this);
        this.changeDepartmentHandler = this.changeDepartmentHandler.bind(this);
        this.changeDayHandler = this.changeDayHandler.bind(this);
        this.changeMonthHandler = this.changeMonthHandler.bind(this);
        this.changeYearHandler = this.changeYearHandler.bind(this);
        this.saveEmployee = this.saveEmployee.bind(this);

    }
    changeNameHandler = (event) => {
        this.setState({ name: event.target.value });
    }
    changeSalaryHandler = (event) => {
        this.setState({ salary: event.target.value });
    }
    changeGenderHandler = (event) => {
        this.setState({ gender: event.target.value });
    }
    changeNoteHandler = (event) => {
        this.setState({ note: event.target.value });
    }
    changeDayHandler = (event) => {
        this.setState({ day: event.target.value });
    }
    changeMonthHandler = (event) =>{
        this.setState({month: event.target.value});
    }
    changeYearHandler = (event) => {
        this.setState({year: event.target.value});
    }
    changeDepartmentHandler = (event) => {
        this.state.department.push(event.target.value);
    }

    saveEmployee = (event) => {
        event.preventDefault();
        let employee = {
            name: this.state.name,
            salary: this.state.salary,
            gender: this.state.gender,
            note: this.state.note,
            department: this.state.department,
            startDate: this.state.day + ' ' + this.state.month + ' ' + this.state.year
        };
        console.log(JSON.stringify(employee));
        EmployeeService.addEmployee(employee).then(res => {
            this.props.history.push('/');
        })
    }
    reset = () => {
        this.setState({
            name: '',
            salary: '',
            note: '',
            gender: '',
            department: '',
            day:'',
            month:'',
            year:''
        })
    }
    cancel = () =>
    {
        this.props.history.push('/');
    }
    render() {
        return (
            <div>
                <div class="form-content" id="formId">
                    <form class="form">
                        <div class="form-head">Employee Payroll Form</div>
                        <div class="row-content">
                            <label class="label text" htmlFor="name">Name</label>
                            <input class="input" id="name" name="name"
                                placeholder="Enter your name" required onChange={this.changeNameHandler}/>
                            <error-output class="text-error" htmlFor="name"></error-output>
                        </div>
                        <div class="row-content">
                            <label class="label text" htmlFor="gender">Gender</label>
                            <div onClick={this.changeGenderHandler}>
                                <input type="radio" id="male" name="gender" value="Male" />
                                <label class="text" htmlFor="male">Male</label>
                                <input type="radio" id="female" name="gender" value="Female" />
                                <label class="text" htmlFor="female">Female</label>
                            </div>
                        </div>
                        <div class="row-content">
                            <label class="label text" htmlFor="department">Department</label>
                            <div onChange={this.changeDepartmentHandler}>
                                <input class="checkbox" type="checkbox" id="hr" name="department" value="HR"/>
                                <label class="text" htmlFor="hr">HR</label>
                                <input class="checkbox" type="checkbox" id="sales" name="department" value="Sales"/>
                                <label class="text" htmlFor="sales">Sales</label>
                                <input class="checkbox" type="checkbox" id="finance" name="department" value="Finance"/>
                                <label class="text" htmlFor="finance">Finance</label>
                                <input class="checkbox" type="checkbox" id="engineer" name="department" value="Engineer"/>
                                <label class="text" htmlFor="engineer">Engineer</label>
                                <input class="checkbox" type="checkbox" id="others" name="department" value="Others"/>
                                <label class="text" htmlFor="others">Others</label>
                            </div>
                        </div>
                        <div className="row-content">
                            <label className="label text" htmlFor="salary">Choose your salary:</label>
                            <input className="slider" type="range" min="300000" max="500000" step="100"
                                name="salary" id="salary" defaultValue="400000" onChange = {this.changeSalaryHandler}/>
                            <output className="salary-output text" htmlFor="salary">{this.state.salary}</output>
                        </div>
                        <div class="row-content">
                            <label class="label text" htmlFor="startDate">StartDate</label>
                            <div id="date">
                                <select id="day" name="Day" onChange={this.changeDayHandler}>
                                    <option selected>Day</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                    <option value="16">16</option>
                                    <option value="17">17</option>
                                    <option value="18">18</option>
                                    <option value="19">19</option>
                                    <option value="20">20</option>
                                    <option value="21">21</option>
                                    <option value="22">22</option>
                                    <option value="23">23</option>
                                    <option value="24">24</option>
                                    <option value="25">25</option>
                                    <option value="26">26</option>
                                    <option value="27">27</option>
                                    <option value="28">28</option>
                                    <option value="29">29</option>
                                    <option value="30">30</option>
                                    <option value="31">31</option>
                                </select>
                                <select id="month" name="Month" onChange={this.changeMonthHandler}>
                                    <option selected>Month</option>
                                    <option value="Jan">January</option>
                                    <option value="Feb">February</option>
                                    <option value="March">March</option>
                                    <option value="April">April</option>
                                    <option value="May">May</option>
                                    <option value="June">June</option>
                                    <option value="July">July</option>
                                    <option value="Aug">August</option>
                                    <option value="Sept">September</option>
                                    <option value="Oct">October</option>
                                    <option value="Nov">November</option>
                                    <option value="Dec">December</option>
                                </select>
                                <select id="year" name="Year" onChange={this.changeYearHandler}>
                                    <option selected>Year</option>
                                    <option value="2020">2020</option>
                                    <option value="2019">2019</option>
                                    <option value="2018">2018</option>
                                    <option value="2017">2017</option>
                                    <option value="2016">2016</option>
                                    <option value="2015">2015</option>
                                </select>
                            </div>
                            <error-output class="date-error" htmlFor='startDate'></error-output>
                        </div>
                        <div class="row-content">
                            <label class="label text" htmlFor="notes">Notes</label>
                            <textarea class="input" id="notes" style={{height:"100px"}} name="notes"
                                placeholder="" onChange = {this.changeNoteHandler}></textarea>
                        </div>
                        <div class="buttonParent">
                            <button class="resetButton button cancelButton" onClick={this.cancel.bind(this)}>Cancel</button>
                            <div class="submit-reset">
                                <button type="submit" class="button submitButton" id="submitButton" onClick={this.saveEmployee}>Submit</button>
                                <button type="reset" class="resetButton button" onClick={this.reset.bind(this)}>Reset</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default AddEmployeeComponent;