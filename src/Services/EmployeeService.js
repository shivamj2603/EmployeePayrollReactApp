import axios from 'axios';
const EMPLOYEEPAYROLL_URL = "http://localhost:8080/employee";
class EmployeeService{
    getEmployees(){
        return axios.get(EMPLOYEEPAYROLL_URL);
    }
    addEmployee(employee){
        return axios.post("http://localhost:8080/employee/create", employee);
    }
    getEmployeeById(id){
        return axios.get(EMPLOYEEPAYROLL_URL + "/get/" + id);
    }
    updateEmployee(employee, id){
        return axios.put(EMPLOYEEPAYROLL_URL + "/update/" + id, employee);
    }
    deleteEmployee(id){
        return axios.delete(EMPLOYEEPAYROLL_URL + "/delete/" + id);
    }
    checkDate(employeeDate){
        let error = ''
        let now = new Date();
         let startDate=new Date(Date.parse(employeeDate))
                if(startDate > now) error ="Start Date cannot be future date";
                else {
                let diff = Math.abs(now.getTime() - startDate.getTime());
                if( diff/(1000*60*60*24) > 30) error = "Startdate is beyond 30 days";
                }
                return error
        }
}
export default new EmployeeService()