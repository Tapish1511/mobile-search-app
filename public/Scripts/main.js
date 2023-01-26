const container = document.getElementById('main-div');

async function render(){
    const response = await fetch('/search/data')
    const data = await response.json();
    console.log(data);    
}

document.addEventListener('DOMContentLoaded', ()=>{
    console.log('hello');
    render();
})