import { stateobserver } from './signup/firebase1.js';
let section1 = document.getElementById('section1ID');
var mydata = localStorage.getItem('mydata');
var mydata = JSON.parse(mydata);





let stateobsers = stateobserver();
stateobsers.then(()=>{
    console.log("here is return value:",stateobsers)
    if (stateobsers) {
        document.getElementById('titleID').innerHTML += ` ${(mydata.Fullname).toUpperCase()}`;
        for (const key in mydata) {
            if (mydata.hasOwnProperty(key)) {
                section1.innerHTML += `<h3>${key}: ${mydata[key]}</h3>`;
            }
        }
    }
    else {
        alert('go check your inbox to verify the account')
        
        
    }

}).catch((error)=>{
    console.log(error)
})
