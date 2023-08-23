var product=[{
    id:1,
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80',
    name:'Macbook pro',
    price: 24000,
    description:'Macbook pro dolor sit amet consectetur, adipisicing elit. Commodi saepe amet dolorem, placeat fugit nulla.',
    type:'computer',
},{
    id:2,
    img:'https://images.unsplash.com/photo-1611740677496-3e0ef378e189?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1040&q=80',
    name:'IPhone 12',
    price:15000,
    description:'IPhone 12 dolor sit amet consectetur, adipisicing elit. Commodi saepe amet dolorem, placeat fugit nulla.',
    type:'Smartphone',
},{
    id:3,
    img:'https://images.unsplash.com/photo-1574683189522-9c5a95f78b76?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2834&q=80',
    name:'case IPhone',
    price:1000,
    description:'the case iphone dolor sit amet consectetur, adipisicing elit. Commodi saepe amet dolorem, placeat fugit nulla.',
    type:'case',
}];
//[{},{},{}] length = 3
$(document).ready(()=>{
    var html ='';
    // i= 0
    for (let i = 0; i < product.length; i++) {
        html +=`<div onclick="OpenProductDetail(${i})" class="product-items ${product[i].type} ">
                 <img class="product-img" src="${product[i].img} " alt="">
                 <p style="font-size: 1.2vw;" >${product[i].name}  </p>
                 <p style="font-size: .9vw;">  ${numberWithCommas(product[i].price)}TH</p>
                </div>`;  
    }
    $("#productlist").html(html);
})

function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}

//document.querySelector("#text").innerHTML = numberWithCommas(2300);

function searchsomething(elem) {
   // console.log('#'+elem.id)
    var value = $('#'+elem.id).val()
    console.log(value)

    var html ='';
    // i= 0
    for (let i = 0; i < product.length; i++) {
        if(product[i].name.includes(value)){
            html +=`<div onclick="OpenProductDetail(${i})" class="product-items ${product[i].type} ">
            <img class="product-img" src="${product[i].img} " alt="">
            <p style="font-size: 1.2vw;" >${product[i].name}  </p>
            <p style="font-size: .9vw;">  ${numberWithCommas(product[i].price)}TH</p>
           </div>`;  
        }   
    }
    if(html ==''){
        $("#productlist").html(`<p> not found product</p>`);
    }else{
        $("#productlist").html(html);
    }
    

}
function searchproduct(param){
    console.log(param)
    $(".product-items").css('display','none')
    if(param =='all'){
        $(".product-items").css('display','block')
    }
    else{
       $("."+param).css('display','block')
    }

}
var productindex = 0;
function OpenProductDetail(index){
    productindex = index;
    console.log(productindex)
    $("#ModalDesc").css('display','flex')
    $("#mdd-img").attr('src',product[index].img);
    $("#mdd-name").text(product[index].name);
    $("#mdd-price").text(numberWithCommas(product[index].price)+'THB');
    $("#mdd-desc").text(product[index]. description)
}
function coseModal(){
    $(".modal").css('display','none')
}

var cart = [];
function addtocart(){
    var pass = true;
    for (let i = 0; i < cart.length; i++){
        if(productindex == cart[i].index){
            console.log('found same product')
            cart[i].count++;
            pass = false;
        }
    }
     if(pass){
        var obj = {
            index: productindex,
            id:product[productindex].id,
            name:product[productindex].name,
            price:product[productindex].price,
            img:product[productindex].img,
            count: 1
        };
       // console.log(obj)
        cart.push(obj)
     }
     console.log(cart)

     Swal.fire({
        icon:'success',
        title:'Add ' + product[productindex].name + ' to cart !'
     })
     $("#cartcount").css('display','flex').text(cart.length)
}

function openCart(){
    $('#modalCart').css('display','flex')
    rendercart();
}
function closeModal(){
    $('#modalCart').css('display','none')
}

function rendercart() {
    if(cart.length > 0 ){
        var html = '';
        for (let i = 0; i < cart.length; i++){
            html += `<div class="cartlist-items">
            <div class="cartlist-left">
                <img src="${cart[i].img}"alt="">
                <div class="cartlist-detail">
                    <p style="font-size: 1.5vw;">${cart[i].name}</p>
                    <p style="font-size: 1.2vw;" > ${numberWithCommas(product[i].price * cart[i].count )}TH</p>
                </div>
            </div>
            <div class="cartlist-right">
                <p onclick="deinitem('-',${i})" class="btnc" >-</p>
                <p id="countitem${i}" style="margin: 0px 20px;" > ${cart[i].count}</p>
                <p onclick="deinitem('+',${i})" class="btnc" >+</p>
            </div>
        </div>`;
        }
        $("#mycart").html(html)
    }
    else{
        $("#mycart").html(`<p>Not found product list</P>`)
    }
}

function deinitem(action, index){
    if(action == '-'){
       if(cart[index].count > 0) {
        cart[index].count--;
        $("#countitem"+index).text(cart[index].count)

        if(cart[index].count <= 0){
            Swal.fire({
                icon :'warning',
                title :'Are you sure to delete?',
                showConfirmButton: true,
                showCancelButton:true,
                confirmButtonText:'Delete',
                cancelButtonText:'cancle'
            }).then((res) => {
                if(res.isConfirmed){
                    cart.splice(index,1)
                    console.log(cart)
                    rendercart();
                    $("#cartcount").css('display','flex').text(cart.length)
                    if(cart.length <= 0){
                        $("#cartcount").css('display','none')
                    }
                }
                else{
                    cart[index].count++;
                    $("#countitem"+index).text(cart[index].count)
                }
            })
        }
       } 
    }
    else if(action == '+'){
        cart[index].count++;
        $("#countitem"+index).text(cart[index].count)
    }
}