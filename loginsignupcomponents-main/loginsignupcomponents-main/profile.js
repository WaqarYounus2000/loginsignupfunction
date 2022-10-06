let section1 = document.getElementById('section1ID');
var mydata = localStorage.getItem('mydata');
var mydata = JSON.parse(mydata);




for(const key in mydata){
    if(mydata.hasOwnProperty(key)){
        section1.innerHTML+=`<h3>${key}: ${mydata[key]}</h3>`;
    }
}