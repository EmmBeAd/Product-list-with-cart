let product_container_arr = document.querySelectorAll('.product_container')
let category = document.querySelectorAll('.category')
let product_name = document.querySelectorAll('.product_name')
let price = document.querySelectorAll('.price')
let add_to_cart_btn = document.querySelectorAll('.add_to_cart')
let qty_counter = document.querySelectorAll('.qty_counter')
let quantity = document.querySelectorAll('.quantity')
let minus_btn = document.querySelectorAll('.minus')
let plus_btn = document.querySelectorAll('.plus')
let total =  document.querySelector('.total')

let cart_container = document.querySelector('.cart_container')
let items_container = document.querySelector('.items_container')
let cart_item_qty = document.querySelectorAll('.cart_item_qty')
let cart_item_price = document.querySelectorAll('.cart_item_price')
let cart_item_name = document.querySelectorAll('.cart_item_name')
let cart_item_unit_total = document.querySelectorAll('.cart_item_unit_total')
let remove_btn = document.querySelectorAll('.btn_remove_btn')
let total_qty = document.querySelector('.total_qty')

let confirm_btn = document.querySelector('.confirm_btn')
let order_conf_box_wrapper = document.querySelector('.order_conf_box_wrapper')
let confirm_box = document.querySelector('.order_confirmation_box')
let confirmation_list = document.querySelector('.confirmation_list')
let lower_third = document.querySelector('.lower_third')


let minus_btn_triggered = false;
let item_removed = false;

let cart_items = []

let new_total = 0;

add_to_cart_btn.forEach((button, index) => {
    button.addEventListener('click', () => {
        button.classList.add('active');
        qty_counter[index].classList.add('active');
        cart_container.classList.add('active');

        //add item to cart array
        cart_items.push({name: my_array[index].name, price: my_array[index].price, unit_total: my_array[index].price, ind: index, quantity: 1, image_th: my_array[index].image.thumbnail})
        
        //Get the index in the cart array of the added item
        let current_item_index = cart_items.length - 1
        
        //Add the new index to the product in the product array
        let new_obj = {cart_pos_ind: current_item_index}
        my_array[index] = {...my_array[index], ...new_obj}
        
        //Change the cart item's value in the browser
        add_to_cart(current_item_index)
        update_qty();
        
        cart_item_qty = document.querySelectorAll('.cart_item_qty')
        cart_item_price = document.querySelectorAll('.cart_item_price')
        cart_item_name = document.querySelectorAll('.cart_item_name')
        cart_item_unit_total = document.querySelectorAll('.cart_item_unit_total')
        remove_btn = document.querySelectorAll('.btn_remove_btn')

        activate_remove_btn_EL();
        
    })
})

confirm_btn.addEventListener('click', () =>{
    order_conf_box_wrapper.classList.add('active')

    cart_items.forEach((item) =>{
        confirmation_list.innerHTML += `
                                <div class="item">
                                <img class="item_thumbnail" src="${item.image_th}">
                                <div class="cart_left2">
                                    <div class="cart_item_name">${item.name}</div>
                                    <div class="details">
                                        <div class="cart_item_qty">${item.quantity}x</div>
                                        <div class="cart_item_price">@$${item.price}</div>
                                    </div>
                                </div>
                                    <div class="cart_item_unit_total">$${item.unit_total}</div>
                                </div>
                                <hr>
                            `
    })
    lower_third.innerHTML += `
                                <div class="order_total">
                                    Order Total
                                    <div class="total_c">$${total.innerText}</div>
                                </div>
                                <button class="start_order_btn red_btn">Start new order</button>
                            `

    let start_order_btn = document.querySelector('.start_order_btn')
    start_order_btn.addEventListener('click', () => {
        cart_items = []
        cart_item_qty = []
        cart_item_price = []
        cart_item_name = []
        cart_item_unit_total = []
        remove_btn = []
        total_qty.innerText = '';
        items_container.innerHTML = '';
        confirmation_list.innerHTML = '';
        lower_third.innerHTML = '';
        total.innerText = '';

        new_total = 0;
        my_array.forEach((item, index) => {
            qty_counter[index].classList.remove('active')
            quantity[index].innerText = '1';
            add_to_cart_btn[index].classList.remove('active')
            order_conf_box_wrapper.classList.remove('active')
            cart_container.classList.remove('active');
        })
    
    })
})


function add_to_cart(current_item_index){
    items_container.innerHTML += `
                                <div class="item">
                                <div class="cart_left">
                                    <div class="cart_item_name">${cart_items[current_item_index].name}</div>
                                    <div class="details">
                                        <div class="cart_item_qty">${cart_items[current_item_index].quantity}x</div>
                                        <div class="cart_item_price">@$${cart_items[current_item_index].price}</div>
                                        <div class="cart_item_unit_total">$${cart_items[current_item_index].unit_total}</div>
                                    </div>
                                </div>
                                <div class="remove_btn"><button class="btn_remove_btn">x</button></div>
                                </div>
                                <hr>
                                `
                                // cart_item_name.innerText = cart_items[current_item_index].name
    // cart_item_price.innerText = cart_items[current_item_index].price
    // cart_item_qty.innerText = cart_items[current_item_index].quantity
    if(!item_removed){
        cart_items[current_item_index].quantity = 1  
    }

    if(!minus_btn_triggered){
        new_total += parseFloat(cart_items[current_item_index].price)
        console.log(new_total + ' + ' + cart_items[current_item_index].price)
        total.innerText = new_total       
    }
    minus_btn_triggered = false;
}



minus_btn.forEach((button, index) => {
    button.addEventListener('click', () => {
        let quantity_value = parseInt(quantity[index].innerText) -1
        if(quantity_value !== 0){
            quantity[index].innerText  = quantity_value;
            let new_unit_total = quantity_value * cart_items[my_array[index].cart_pos_ind].price;
            cart_item_unit_total[my_array[index].cart_pos_ind].innerText = new_unit_total;
            cart_items[my_array[index].cart_pos_ind].unit_total = new_unit_total;
            cart_items[my_array[index].cart_pos_ind].quantity = quantity_value
            cart_item_qty[my_array[index].cart_pos_ind].innerText = quantity_value + 'x';
            
            new_total = 0;
            
            cart_items.forEach((price) => {
                new_total += parseFloat(price.unit_total)
            })
            total.innerText = new_total
            update_qty();
        } else{
            qty_counter[index].classList.remove('active')
            add_to_cart_btn[index].classList.remove('active')
            console.log(cart_item_unit_total[my_array[index].cart_pos_ind])
            remove(my_array[index].cart_pos_ind)
            update_qty()
        }
    })
})

plus_btn.forEach((button, index) => {
    button.addEventListener('click', () => {
        let new_quantity_value = parseInt(quantity[index].innerText) + 1
        quantity[index].innerText  = new_quantity_value;
        let new_unit_total = new_quantity_value * cart_items[my_array[index].cart_pos_ind].price;
        cart_items[my_array[index].cart_pos_ind].unit_total = new_unit_total;
        cart_item_unit_total[my_array[index].cart_pos_ind].innerText = '$' + new_unit_total;

        cart_items[my_array[index].cart_pos_ind].quantity = new_quantity_value
        cart_item_qty[my_array[index].cart_pos_ind].innerText = new_quantity_value + 'x'

        new_total = 0;

        cart_items.forEach((price) => {
            console.log('+' + price.unit_total + ' = ' + new_total)
            new_total += parseFloat(price.unit_total)
        })
        
        total.innerText = new_total
        update_qty();

    })
})

function activate_remove_btn_EL(){
    remove_btn.forEach((button, index) => {
        
        button.addEventListener('click', (e) =>{
            e.preventDefault()
            qty_counter[cart_items[index].ind].classList.remove('active')
            add_to_cart_btn[cart_items[index].ind].classList.remove('active')
            quantity[cart_items[index].ind].innerText = '1';
            remove(index)
            
        })
    })
}


function remove(index){
    console.log(total.innerText + ' - ' + cart_items[index].unit_total)
    console.log()
    new_total = parseFloat(total.innerText) - parseFloat(cart_items[index].unit_total)
    console.log(new_total)
    total.innerText = new_total
    cart_items = cart_items.filter((_, ind) => ind !== index)

    item_removed = true;

    reprint_cart()
}

function reprint_cart(){

    items_container.innerHTML = ''
    
    //reset all corresponding html element arrays
    cart_item_qty = []
    cart_item_price = []
    cart_item_name = []
    cart_item_unit_total = []
    remove_btn = []

    if(cart_items.length == 0){
        cart_container.classList.remove('active');
    } else{
        cart_items.forEach((item, index) =>{
    
            my_array[item.ind].cart_pos_ind = index
    
            minus_btn_triggered = true;
            add_to_cart(index)
            cart_item_qty = document.querySelectorAll('.cart_item_qty')
            cart_item_price = document.querySelectorAll('.cart_item_price')
            cart_item_name = document.querySelectorAll('.cart_item_name')
            cart_item_unit_total = document.querySelectorAll('.cart_item_unit_total')
            remove_btn = document.querySelectorAll('.btn_remove_btn')
    
            activate_remove_btn_EL()
        })
    }
    
}

function update_qty(){
    let new_quantity = 0;
    cart_items.forEach((item, index) => {
        new_quantity += parseInt(item.quantity)
    })
    total_qty.innerText = new_quantity;
}
        

fetch('data.json')
    .then(response =>response.json())
    .then(data => {
        my_array = data
        console.log(data);

        product_container_arr.forEach((product, index) => {
            product.children[1].children[1].innerText = data[index].category
            product.children[1].children[2].innerText = data[index].name
            product.children[1].children[3].innerText = '$' + data[index].price.toLocaleString(undefined, { maximumFractionDigits: 2 });

            product.children[0].style.backgroundImage = `url(${data[index].image.desktop})`
        })
    })