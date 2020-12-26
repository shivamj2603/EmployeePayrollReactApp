import React, { Component } from 'react';
import EmployeeService from '../Services/EmployeeService';

class UpdateEmployeeComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            name: '',
            salary: '400000',
            startDate: '',
            note: '',
            department: [{
                deptName: 'HR',
                isChecked: false
            },
            {
                deptName: 'Sales',
                isChecked: false
            }, {
                deptName: 'Engineer',
                isChecked: false
            }, {
                deptName: 'Finance',
                isChecked: false
            }, {
                deptName: 'Others',
                isChecked: false
            }],
            error:{
                nameError:'',
                genderError:'',
                departmentError:'',
                noteError:'',
                dateError:''
        },
            day: '',
            month: '',
            year: '',
            selectedGender: ''

        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeSalaryHandler = this.changeSalaryHandler.bind(this);
        this.changeGenderHandler = this.changeGenderHandler.bind(this);
        this.changeNoteHandler = this.changeNoteHandler.bind(this);
        this.changeDepartmentHandler = this.changeDepartmentHandler.bind(this);
        this.changeDayHandler = this.changeDayHandler.bind(this);
        this.changeMonthHandler = this.changeMonthHandler.bind(this);
        this.changeYearHandler = this.changeYearHandler.bind(this);
        this.update = this.update.bind(this);
    }
    componentDidMount() {
        EmployeeService.getEmployeeById(this.state.id).then((res) => {
            let employee = res.data.data;
            console.log(employee.department)
            employee.department.forEach(dept=>{
                console.log(dept)
                let index = this.state.department.findIndex(dep => dep.deptName == dept)
                console.log(index)
        let checkedDepartment = [...this.state.department]
        console.log(checkedDepartment[index])
        checkedDepartment[index] = { ...checkedDepartment[index], isChecked: !checkedDepartment[index].isChecked }
            
                


                
                this.setState({ department: checkedDepartment },console.log(checkedDepartment))
            }
            )
            console.log(this.state.department)
            // let dateStr = JSON.parse(employee.startDate);
            // console.log(dateStr)
            // let date = new Date(dateStr)
            // let days = date.getDay
            // let months = date.getMonth
            // let years = date.getUTCFullYear
            var dat = new Date(employee.startDate)
           let dtArray =['January','Februay','March','April','May','June','July','August','September','October','November','December']



            this.setState({
                name: employee.name,
                salary: employee.salary,
                note: employee.note,
                day: dat.getDay(),
                month: dtArray[dat.getMonth()],
                year: dat.getFullYear(),
                startDate: employee.startDate,
                selectedGender: employee.gender
            })
        })
        
    }
    changeNameHandler = (event) => {

        const nameRegex = RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$');
        if (!nameRegex.test(event.target.value) && event.target.value !== '') {
            let checkedError = this.state.error
            checkedError.nameError = 'Name is Invalid'
            console.log(checkedError)
            this.setState({ error: checkedError});
            console.log(this.state.error)
        }
        else {
            let checkedError = this.state.error
            checkedError.nameError = ''
            console.log(checkedError)
            this.setState({ error: checkedError});

        }
        this.setState({ name: event.target.value });

    }
    changeSalaryHandler = (event) => {
        this.setState({ salary: event.target.value });
    }
    changeGenderHandler = (event) => {
        this.setState({ selectedGender: event.target.value });
    }
    changeNoteHandler = (event) => {
        this.setState({ note: event.target.value });
    }
    changeDayHandler = (event) => {
        this.setState({ day: event.target.value });
    }
    changeMonthHandler = (event) => {
        this.setState({ month: event.target.value });
    }
    changeYearHandler = (event) => {
        this.setState({ year: event.target.value });
    }
    changeDepartmentHandler = (event) => {
        // let index = this.state.department.findIndex(dept => dept.deptName == event.target.name)
        
        let index = this.state.department.findIndex(dept => dept.deptName == event.target.name)
        let checkedDepartment = [...this.state.department]
        checkedDepartment[index] = { ...checkedDepartment[index], isChecked: !checkedDepartment[index].isChecked }
        console.log(checkedDepartment)

        // checkedDepartment[index] = { ...checkedDepartment[index], isChecked: !checkedDepartment[index].isChecked }
        this.setState({ department: checkedDepartment }
        )
    }


    update = (event) => {
        event.preventDefault();
        let employee = {
            name: this.state.name,
            salary: this.state.salary,
            gender: this.state.selectedGender,
            note: this.state.note,
            department: this.state.department.filter(dept=> dept.isChecked==true).map(dept=>dept.deptName),
            startDate: this.state.day + ' ' + this.state.month + ' ' + this.state.year
        };

        let flag = false
        console.log(JSON.stringify(employee));
       
        console.log(employee.name)
        if(employee.name==''){
            flag = true
            let checkedError = this.state.error
            checkedError.nameError = 'Name cannot be Empty'
            this.setState({error:checkedError})
        }
        console.log(flag)
        if(this.state.error.nameError !== ''){
            flag = true
        }
        console.log(flag)
        if(employee.gender.length < 4){
            let checkedError = this.state.error
            checkedError.genderError = 'Gender must be selected'
            this.setState({error: checkedError})
            flag = true
        }
        else{
           let  checkedError = this.state.error
            checkedError.genderError = ''
            this.setState({error:checkedError})
        }
        if(employee.department.length == 0){
            console.log(this.state.department.length)
            let checkedError = this.state.error
            checkedError.departmentError = 'One department must be selected'
            this.setState({error: checkedError})
            flag = true
        }
        else{
           let checkedError = this.state.error
            checkedError.departmentError = ''
            this.setState({error:checkedError})

        }
        if(employee.note == ''){
            let checkedError = this.state.error
            checkedError.noteError = 'Notes cannot be blank'
            this.setState({error: checkedError})
            flag = true
        }else{
            let checkedError = this.state.error
             checkedError.noteError = ''
             this.setState({error:checkedError})
        }
        console.log(this.state.day)
        if(this.state.day == '' || this.state.month == '' || this.state.year == ''){
            let checkedError = this.state.error
            checkedError.dateError = 'Please select a valid date'
            this.setState({error: checkedError})
            flag = true
        }
        else{
            let checkedError = this.state.error
            checkedError.dateError = EmployeeService.checkDate(employee.startDate)
            setInterval(console.log("hello"),1000)
            console.log(checkedError.dateError)
            if(checkedError.dateError !== '') flag = true
            this.setState({error: checkedError})

        }
        console.log(flag)
        
        if(!flag){
            EmployeeService.updateEmployee(employee, this.state.id).then(res => {
                console.log(res.data)
                this.props.history.push('/');
            })
        }
       
    }
    reset = () => {
        this.setState({
            name: '',
            salary: '',
            note: '',
            gender: '',
            department: '',
            day: '',
            month: '',
            year: '',
            startDate: ''
        })
    }
    cancel = () => {
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
                                placeholder="Enter your name" required value={this.state.name} onChange={this.changeNameHandler} />
                            <error-output class="text-error" htmlFor="name">{this.state.error.nameError}</error-output>
                        </div>
                        <div class="row-content">
                            <label class="label text" htmlFor="gender">Gender</label>
                            <div>
                                <input type="radio" id="male" name="gender" value="Male" checked={this.state.selectedGender == "Male"} onChange={this.changeGenderHandler} />
                                <label class="text" htmlFor="male">Male</label>
                                <input type="radio" id="female" name="gender" value="Female" checked={this.state.selectedGender == "Female"} onChange={this.changeGenderHandler} />
                                <label class="text" htmlFor="female">Female</label>
                                <error-output class="text-error" htmlFor="gender">{this.state.error.genderError}</error-output>
                            </div>
                        </div>
                        <div class="row-content">
                            <label class="label text" htmlFor="department">Department</label>
                            {
                                this.state.department.map(dept =>
                                    <div>
                                        <input class="checkbox" type="checkbox" name={dept.deptName} checked={dept.isChecked} value={dept.deptName} onChange={this.changeDepartmentHandler} />
                                        <label class="text" htmlFor={dept.deptName}>{dept.deptName}</label>
                                    </div>
                                )
                            }
                            {/* <div onChange={this.changeDepartmentHandler}>
                                <input class="checkbox" type="checkbox" id="hr" name="department" value="HR"/>
                                <label class="text" htmlFor="hr">HR</label>
                                <input class="checkbox" type="checkbox" id="sales" name="department" value="Sales" />
                                <label class="text" htmlFor="sales">Sales</label>
                                <input class="checkbox" type="checkbox" id="finance" name="department" value="Finance" />
                                <label class="text" htmlFor="finance">Finance</label>
                                <input class="checkbox" type="checkbox" id="engineer" name="department" value="Engineer" />
                                <label class="text" htmlFor="engineer">Engineer</label>
                                <input class="checkbox" type="checkbox" id="others" name="department" value="Others" />
                                <label class="text" htmlFor="others">Others</label>
                            </div> */}
                             <error-output class="text-error" htmlFor="department">{this.state.error.departmentError}</error-output>
                        </div>
                        <div class="row-content">
                            <label class="label text" htmlFor="salary">Choose your salary:</label>
                            <input class="slider" type="range" min="300000" max="500000" step="100"
                                name="salary" id="salary" defaultValue={this.state.salary} onChange={this.changeSalaryHandler} />
                            <output class="salary-output text" for="salary">{this.state.salary}</output>
                        </div>
                        <div class="row-content">
                            <label class="label text" htmlFor="startDate">StartDate</label>
                            <div id="date">
                                <select id="day" name="Day" onChange={this.changeDayHandler}>
                                    <option selected>{this.state.day}</option>
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
                                    <option selected>{this.state.month}</option>
                                    <option value="Jan">January</option>
                                    <option value="Feb">February</option>
                                    <option value="Mar">March</option>
                                    <option value="Apr">April</option>
                                    <option value="May">May</option>
                                    <option value="Jun">June</option>
                                    <option value="Jul">July</option>
                                    <option value="Aug">August</option>
                                    <option value="Sep">September</option>
                                    <option value="Oct">October</option>
                                    <option value="Nov">November</option>
                                    <option value="Dec">December</option>
                                </select>
                                <select id="year" name="Year" onChange={this.changeYearHandler}>
                                    <option selected>{this.state.year}</option>
                                    <option value="2020">2020</option>
                                    <option value="2019">2019</option>
                                    <option value="2018">2018</option>
                                    <option value="2017">2017</option>
                                    <option value="2016">2016</option>
                                    <option value="2015">2015</option>
                                </select>

                            </div>
                            <error-output class="date-error" htmlFor='startDate'>{this.state.error.dateError}</error-output>
                        </div>
                        <div class="row-content">
                            <label class="label text" htmlFor="notes">Notes</label>
                            <textarea class="input" id="notes" name="notes"
                                placeholder="" style={{ height: "100px" }} value={this.state.note} onChange={this.changeNoteHandler}></textarea>
                         <error-output class="text-error" htmlFor="notes">{this.state.error.noteError}</error-output>
                        </div>
                        <div class="buttonParent">
                            <button class="resetButton button cancelButton" onClick={this.cancel.bind(this)}>Cancel</button>
                            <div class="submit-reset">
                                <button type="submit" class="button submitButton" id="submitButton" onClick={this.update}>Update</button>
                                <button type="reset" class="resetButton button" onClick={this.reset.bind(this)}>Reset</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default UpdateEmployeeComponent;