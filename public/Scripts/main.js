let containerLeft = document.getElementById('main-div-left');
let containerRight = document.getElementById('main-div-right');
let searchBar = document.getElementById('form-container');
let mainBody = document.getElementById('main-div')

let searchHeight = searchBar.getBoundingClientRect().height;
mainBody.style.height = `calc(100vh - ${searchHeight}px)`


async function render(){
    const responseAmazon = await fetch('/search/amazondata')
    const dataAmazon = await responseAmazon.json();
    const responseFlipkart = await fetch('/search/flipkartdata')
    const dataFlipkart = await responseFlipkart.json();
    // console.log(data);
    let x = createBody(dataAmazon); 
    let y = createBody(dataFlipkart); 
    containerLeft.innerHTML = x;
    containerRight.innerHTML = y;
    
}

function createBody(data){
    let mainBody = '';
   
    for (let i=0; i<data.length; i++){
        let imgUrl = data[i].img;
        let title = data[i].title;
        let price = data[i].price;
        let url = data[i].url + data[i].link;
        let web = data[i].web;

        mainBody += createCard(imgUrl, title, price, web, url);
    }

    return mainBody;

}



function createCard(imgUrl, title, price, web, url){
    return `<div class="card-item">
                <div class="card-image">
                    <img src="${imgUrl}" alt="${title}">
                </div>
                <h2 class="item-name">${title}</h2>
                <div class="price">${price}</div>
                <div class="website">${web}</div>
                <div class="product-link card-btn">
                    <a href="${url}" target="_blank">visit to the site <i class="fa fa-external-link"></i></a>
                </div>
            </div>`
}

document.addEventListener('DOMContentLoaded', ()=>{
    console.log('hello');
    render();
})


{/* <div class="card-item">
    <div class="card-image">
        <img src="../images/smartPhonelogo.png" alt="">
    </div>
    <h2 class="item-name">samsung galexy s 20 pro</h2>
    <div class="price">2000rs</div>
    <div class="website">amazon</div>
    <div class="product-link card-btn">
        <a href="">visit to the site <i class="fa fa-external-link"></i></a>
    </div>
    
</div> */}