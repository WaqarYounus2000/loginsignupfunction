import { observer } from './signup/firebase1.js';
let section1 = document.getElementById('section1ID');
var mydata = localStorage.getItem('mydata');
var mydata = JSON.parse(mydata);



let stateobserver = observer()
stateobserver.then(()=>{
    document.getElementById('titleID').innerHTML += ` ${(mydata.Fullname).toUpperCase()}`;
        for (const key in mydata) {
            if (mydata.hasOwnProperty(key)) {
                section1.innerHTML += `<h3>${key}: ${mydata[key]}</h3>`;
            }
        }


}).catch(()=>{
    alert("Email is not verified!, check your inbox...")
})