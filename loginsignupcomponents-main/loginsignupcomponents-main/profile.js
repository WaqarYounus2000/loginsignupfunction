let section1 = document.getElementById('section1ID');
var mydata = localStorage.getItem('mydata');
var mydata = JSON.parse(mydata);
document.getElementById('titleID').innerHTML+=` ${(mydata.Fullname).toUpperCase()}`;




for(const key in mydata){
    if(mydata.hasOwnProperty(key)){
        section1.innerHTML+=`<h3>${key}: ${mydata[key]}</h3>`;
    }
}