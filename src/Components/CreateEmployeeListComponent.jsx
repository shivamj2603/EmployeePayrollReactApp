import React, { Component } from 'react';
import EmployeeService from '../Services/EmployeeService';
import utility from '../Services/utility';
import DepartmentComponent from './DepartmentComponent';


class CreateEmployeeListComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            employees: []
        }
        this.addEmployee = this.addEmployee.bind(this);
        this.updateEmployee = this.updateEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
    }
    componentDidMount() {
        EmployeeService.getEmployees().then((res) => {
            console.log(res.data.data)
            this.setState({ employees: res.data.data }
             )
        });
        
    }
    addEmployee() {
        this.props.history.push('/create');
    }
    updateEmployee(id) {
        this.props.history.push(`/update/${id}`);
    }

    deleteEmployee(id) {
        EmployeeService.deleteEmployee(id).then(res => {
            this.setState({
                employees: this.state.employees.filter(employee => employee.id !== id)
            });
        });
    }
   
    render() {
        function NumberList(props) {
            const numbers = props.numbers;
            const listItems = numbers.map((number) =>
              <div class="dept-label" >
                {number }
              </div>
            );
            return (
              <div>{listItems}</div>
            );
          }
          
        return (
            <div>
                <div class="main-content">
                    <div class="header-content">
                        <div class="emp-detail-text">Employee Details<span>&nbsp;</span>
                            <div class="emp-count">{this.state.employees.length}</div>
                        </div>
                        <button onClick={this.addEmployee} class="add-button">
                            <img src="../assets/add-24px.svg" alt="" />Add User</button>
                    </div>
                </div>
                <div class="table-main">
                    <table class="table" id="display">
                        <tr><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>StartDate</th><th>Actions</th></tr>
                        {
                            this.state.employees.map(
                                (employee) =>
                                    <tr key={employee.id}>
                                        <td>{employee.name}</td>
                                        <td>{employee.gender}</td>
                                        <td>
                                        <NumberList numbers={employee.department} />

                                        </td>
                                      
                                        <td>{employee.salary}</td>
                                        <td>{utility.stringifyDate(employee.startDate)}</td>
                                        <td>
                                            <img src="../assets/create-black-18dp.svg" onClick={() => this.updateEmployee(employee.id)} alt="edit" />
                                            <img src="../assets/delete-black-18dp.svg" onClick={() => this.deleteEmployee(employee.id)}/>
                                        </td>
                                    </tr>)
                        }
                    </table>
                </div>
            </div>
        );
    }
}

export default CreateEmployeeListComponent;