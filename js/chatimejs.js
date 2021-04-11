window.onload = function(){
  const iconShopping = document.querySelector('.iconShopping');
  const cartBox = document.querySelector('.cartBox');
  const cartCloseBtn = document.querySelector('i.fa-close');
  let sum = 0.00;

  const attToCartBtn = document.getElementsByClassName('attToCart');
  let items = [];

  for(let i=0; i<attToCartBtn.length; i++){
      attToCartBtn[i].addEventListener("click",function(e){
        if(typeof(Storage) !== 'undefined'){
          let item =  {
            img: e.target.parentElement.children[3].textContent,
            id:i+1,
            name:e.target.parentElement.children[0].textContent,
            price:e.target.parentElement.children[1].children[0].textContent,
            no:1
          };
          if(JSON.parse(localStorage.getItem('items')) === null){
            items.push(item);
            localStorage.setItem("items",JSON.stringify(items));
            window.location.reload();
          }else{
            const localItems = JSON.parse(localStorage.getItem("items"))
            localItems.map(data=>{
              if(item.id == data.id){
                item.no = data.no + 1;
              }else{
                items.push(data);
              }
            });
            items.push(item);
            localStorage.setItem('items',JSON.stringify(items));
            window.location.reload();
          }
        }else{
          alert('storage is not working');
        }
    });
  }
  //add item to shopping cart
  const iconShoppingP = document.querySelector('.iconShopping p');
  let no = 0;
  JSON.parse(localStorage.getItem('items')).map(data=>{
    no = no+data.no;
  });
  iconShoppingP.innerHTML = no;

  //add items in chatime cart window
  const cardBoxTable = document.querySelector('.productContainer');
  let tableData = '';

  if(JSON.parse(localStorage.getItem('items'))[0] === null){
  }else{
    totalCost();
    JSON.parse(localStorage.getItem('items')).map(data=>{
      tableData +=`<div class="product">
                      <div class="pImage">
                        <span><img src="image/${data.img}.png"><span>
                      </div>
                      <div class="pName">
                        <span>${data.name}</span>
                      </div>
                      <div class="pQuantity">
                        <span>${data.no}</span>
                      </div>
                      <div class="pPrice">
                        <span>$${data.price}</span>
                      </div>
                      <div class="pDelete">
                        <span><a href="#" onclick=Delete(this)>Delete</a></span>
                      </div>
                   </div>`;
    });
  }
  cardBoxTable.innerHTML = tableData;
  const cartWindow = document.querySelector('.main');
  const tCost= cartWindow.querySelector('.totalCost');
  tCost.innerHTML = '$' + sum.toFixed(2);

  //getCost
  function totalCost(){
    let cart;
    cart = JSON.parse(localStorage.getItem('items'))

    for(i=0; i < cart.length; i++){
      sum += parseFloat(cart[i].price)*parseFloat(cart[i].no);
    }
  }

  //delete items in cart
  const pDelete = document.querySelectorAll('.pDelete');
  for(let i=0; i<pDelete.length; i++){
    //alert(pDelete[i]);
    pDelete[i].addEventListener("click",function(e){
      let items = [];
      let name = e.target.parentElement.parentElement.parentElement.children[1].children[0].textContent;
        //alert(name);
      JSON.parse(localStorage.getItem('items')).map(data=>{
        if(data.name != name){
          items.push(data);
        }
      });
      localStorage.setItem('items',JSON.stringify(items));
      window.location.reload();
      //console.log(e);
    });
  }

  // const clearCart = document.getElementById('payItems');
  // //  alert(clearCart);
  // clearCart.addEventListener("click",function(e){
  //   alert(clearCart);
  //   let items = [];
  //   let name = e.parentElement.parentElement.parentElement.children[1].children[0].textContent;
  //   JSON.parse(localStorage.getItem('items')).map(data=>{
  //     if(data.name == name){
  //       items.push(data);
  //     }
  //   });
  //     localStorage.setItem('items',JSON.stringify(items));
  //     window.location.reload();
  // });

  // const clearCart2 = document.querySelector('.payItems2');
  // //alert(clearCart2);
  // clearCart2.addEventListener("click",function(e){
  //   alert(clearCart);
  //   let items = [];
  //   let name = e.parentElement.parentElement.parentElement.children[1].children[0].textContent;
  //   JSON.parse(localStorage.getItem('items')).map(data=>{
  //     if(data.name == name){
  //       items.push(data);
  //     }
  //   });
  //     localStorage.setItem('items',JSON.stringify(items));
  //     window.location.reload();
  // });

  // backup code for delete items
  // const pDelete = document.querySelector('.pDelete');
  // console.log(pDelete);
  // pDelete.addEventListener("click",function(e){
  //   let items = [];
  //   let name = e.target.parentElement.parentElement.parentElement.children[1].children[0].textContent;
  //     //alert(name);
  //   JSON.parse(localStorage.getItem('items')).map(data=>{
  //     if(data.name != name){
  //       items.push(data);
  //     }
  //   });
  //   localStorage.setItem('items',JSON.stringify(items));
  //   window.location.reload();
  //   //console.log(e);
  // });
  //cler cart after paying
}



// Sort drinks
$(document).ready(function(){
  $(".allDrink").click(function(){
    console.log('hello');
    $(".catMilkTea, .catSmoothieTea, .catHotTea").css("width", "100%");
    $(".catMilkTea, .catSmoothieTea, .catHotTea").show();
  });

  $(".milkTea").click(function(){
    console.log('hello');
    $(".catMilkTea").show();
    $(".catMilkTea").css("max-width", "35%");
    $(".catSmoothieTea, .catHotTea").hide();
  });

  $(".smoothie").click(function(){
    console.log('hello');
    $(".catSmoothieTea").show();
    $(".catSmoothieTea").css("max-width", "35%");
    $(".catMilkTea, .catHotTea").hide();
  });

  $(".hotDrink").click(function(){
    console.log('hello');
    $(".catHotTea").show();
    $(".catHotTea").css("max-width", "35%");
    $(".catSmoothieTea, .catMilkTea").hide();
  });
});
