
function checkDate(employeeDate){
let now = new Date();
 let startDate=new Date(Date.parse(employeeDate))
        if(startDate > now) return "Start Date cannot be future date";
        let diff = Math.abs(now.getTime() - startDate.getTime());
        if( diff/(1000*60*60*24) > 30) return "Startdate is beyond 30 days";
}
export default checkDate
        
