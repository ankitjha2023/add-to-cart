const products = [
    {
        id:1,
        src:"img/product1.jpg",
        title:"Black Tshirt",
    },
    {
        id:2,
        src:"img/product2.jpg",
        title:"Ear Pod",
    },
    {
        id:3,
        src:"img/product3.jpg",
        title:"Hoddie",
    },
    {
        id:4,
        src:"img/product4.jpg",
        title:"Perfume",
    },
    {
        id:5,
        src:"img/product5.jpg",
        title:"Glass",
    },
    {
        id:6,
        src:"img/product6.jpg",
        title:"Cap",
    },
    {
        id:7,
        src:"img/product7.jpg",
        title:"Bag",
    },
    {
        id:8,
        src:"img/product8.jpg",
        title:"Shoes",
    },
]
const search = document.getElementById('search')
const icon = document.getElementById('icon')
const lsProducts = JSON.parse(localStorage.getItem('products')) || []
const productsContainer = document.getElementById('products-container')
const cartContainer = document.getElementById('cart-container')
const carousel = document.getElementById('carouselExampleAutoplaying')
products.forEach((product,index)=>{
    let div = document.createElement('div')
    div.classList.add('col-lg-3','col-md-6')
    div.innerHTML = `
    
    <div class="card">
  <img src="${product.src}" class="card-img-top" alt="...">
  <div class="card-body text-center">
    <h5 class="card-title">${product.title}</h5>
    <a href="#" class="btn btn-primary btn-sm mt-3">Add to Cart</a>
  </div>

</div>
    
    
    `
    productsContainer.appendChild(div)
    
    
})

function addToCart(product){
    
    
    carousel.style.display="none"
    let div = document.createElement('div')
    div.classList.add('row')

    div.innerHTML = `
    
    <div class="col-lg-4 col-md-12">
                <img src="${product.src}" alt="product" class="img-fluid">
            </div>
            <div class="col-lg-8 col-md-12 py-3">
                <h2>${product.title}</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates sunt tenetur corrupti iusto. Distinctio, blanditiis. Doloribus quibusdam facere quia animi obcaecati minus mollitia ducimus consequatur fugiat. Fugit pariatur fuga, dolorum harum sint perspiciatis odio corrupti dolores eligendi praesentium quas aliquid blanditiis voluptatum! Animi ea dignissimos odio corporis in totam nam eos ullam, fuga ipsa sequi, nesciunt vero expedita! Cum.</p>
                <div class="d-flex gap-2">
                    <button class="btn btn-success btn-sm">Buy</button>
                    <button class="btn btn-danger btn-sm"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
    
    
    `
    cartContainer.prepend(div)

    div.querySelector('.btn-danger').addEventListener('click',()=>{

        div.remove()
        popProduct(product.id)
      
    })
}


function popProduct(id){
    lsProducts.forEach((product,index)=>{
        if(product.id==id){
            lsProducts.splice(index,1)
        }
    })
    updateLs()
}


function displayProduct(){
    carousel.style.display="none"
    productsContainer.style.display=""
    cartContainer.style.display="none"
}

function displayCart(){
    carousel.style.display="none"
    productsContainer.style.display="none"
    cartContainer.style.display="block"
}

productsContainer.querySelectorAll('.btn-primary').forEach((btn,index)=>{
    btn.addEventListener('click',()=>{
        productsContainer.style.display="none"
        cartContainer.style.display="block"
        pushProduct(index)
      
    })
})

function pushProduct(index){

    if(isPresent(index)){
       console.log('already present')

    }else{
        let product = {
            id:products[index].id,
            src:products[index].src,
            title:products[index].title
        }
        
        lsProducts.push(product)
        addToCart(product)
        updateLs()
    }
    

}

function isPresent(index){
    let present = false
    lsProducts.forEach((product)=>{
        if(product.id==products[index].id){
            present=true
        }
    })
    return present
}

function updateLs(){
    localStorage.setItem('products',JSON.stringify(lsProducts))
}

function displayCartProducts(){
    if(!lsProducts.length==0){
       
        lsProducts.forEach((product)=>{
            addToCart(product)
        })
    }
       
       
    

}

function displayHome(){
    carousel.style.display=""
    productsContainer.style.display=""
    cartContainer.style.display="none"
}

function toggleIcon(){
    if(icon.classList.contains('fa-bars')){
        icon.classList.replace('fa-bars','fa-xmark')
    }else{
        icon.classList.replace('fa-xmark','fa-bars')
    }
}

search.addEventListener('keyup',(e)=>{
    let searchTerm = e.target.value.toUpperCase()
    console.log(searchTerm)

    productsContainer.querySelectorAll('.col-lg-3').forEach((product)=>{
        if(product.querySelector('h5').textContent.toUpperCase().indexOf(searchTerm)>-1){
            product.style.display=""
        }else{
            product.style.display="none"
        }
    })
})

displayCartProducts()

