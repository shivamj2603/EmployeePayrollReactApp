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
}
export default new EmployeeService()