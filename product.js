// all product
var product = [
    {
        id: 1,
        img: '/image/11.jpg',
        name: 'มหาเวทย์ผนึกมาร เล่ม 11',
        price: 6500,
        description: 'มหาเวทย์ผนึกมาร Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, iusto amet ullam molestiae et tempore.',
        type: 'การ์ตูน'
    },{
        id: 2,
        img: '/image/13.jpg',
        name: 'มหาเวทย์ผนึกมาร เล่ม 13',
        price: 6500,
        description: 'มหาเวทย์ผนึกมาร Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, iusto amet ullam molestiae et tempore.',
        type: 'การ์ตูน'
    },{
        id: 3,
        img: '/image/w1.jpg',
        name: 'คาเฟ่สำหรับคนหลงทาง',
        price: 12500,
        description: 'คาเฟ่สำหรับคนหลงทาง Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit numquam laboriosam minima labore quisquam excepturi unde perferendis repellendus, modi voluptate eos animi.',
        type: 'พัฒนาตัวเอง'
    },{
        id: 4,
        img: '/image/w2.jpg',
        name: 'คาเฟ่สำหรับคนหลงทาง 2',
        price: 1450,
        description: 'คาเฟ่สำหรับคนหลงทาง 2 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit numquam laboriosam minima labore quisquam excepturi unde perferendis repellendus, modi voluptate eos animi.',
        type: 'พัฒนาตัวเอง'
    },{
        id: 6,
        img: '/image/a1.jpg',
        name: 'เชอร์ล็อก โฮมส์',
        price: 3100,
        description: 'เชอร์ล็อก โฮมส์ Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto dignissimos praesentium magnam aspernatur sint nihil, officiis tempore repellat doloribus delectus tenetur voluptatibus, corrupti facere repudiandae!',
        type: 'สืบสวนสอบสวน'
    },{
        id: 7,
        img: '/image/s2.jpg',
        name: 'คิดแบบอัจฉริยะ',
        price: 3500,
        description: 'คิดแบบอัจฉริยะ Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas similique possimus nihil ipsa dicta sequi quidem ipsum.',
        type: 'สารคดี'
    },{
        id: 8,
        img: '/image/l1.jpg',
        name: 'ลอร์ดออฟเดอะริงส์',
        price: 13500,
        description: 'ลอร์ดออฟเดอะริงส์ Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut explicabo velit cumque eos, vero non qui excepturi voluptatem nostrum optio minus iusto voluptates. Voluptas odio est tempora perferendis ea laudantium?',
        type: 'นิยาย'
    }
]

// productlist
$(document).ready(() => {
    var html = '';
    for (let i = 0; i < product.length; i++) {
        html += `<div onclick="openProductDetail(${i})" class="product-items ${product[i].type}">
                <img class="product-img" src="${product[i].img}" alt="">
                <p class="product-name">${product[i].name}</p>
                <p class="product-price">${numberWithCommas(product[i].price)} บาท</p>
                </div>`
    }
    $("#productlist").html(html);
})

// ,ให้กับราคา
function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}

// search book
function searchbook(elem) {
    // แสดงบนconsole
    // console.log(elem.id)
    var value = $("#"+elem.id).val()
    console.log(value)
    
    html = '';
    for (let i = 0; i < product.length; i++) {
        if( product[i].name.includes(value) + product[i].type.includes(value)){
            html += `<div onclick="openProductDetail(${i})" class="product-items ${product[i].type}">
                <img class="product-img" src="${product[i].img}" alt="">
                <p class="product-name">${product[i].name}</p>
                <p class="product-price">${numberWithCommas(product[i].price)} บาท</p>
                </div>`
        }
    }
    if(html == ''){
        $("#productlist").html(`<p>"ไม่พบสินค้า"</p>`);
    } else {
        $("#productlist").html(html);
    }
}

// menu
function searchmenu(param) {
    console.log(param)
    $(".product-items").css('display', 'none')
    if( param == 'ทั้งหมด'){
        $(".product-items").css('display', 'block')
    } else {
        $("."+param).css('display', 'block')
    }
    
}

var productindex = 0;
// product info all time
function openProductDetail(index) {
    productindex = index
    console.log(productindex)
    $("#modaldesc").css("display", "flex")
    $("#mdd-img").attr('src', product[index].img)
    $("#mdd-name").text(product[index].name)
    $("#mdd-price").text(numberWithCommas(product[index].price) + ' บาท')
    $("#mdd-desc").text(product[index].description)
}

function closemodaldesc() {
    $(".modal").css('display', 'none')
}

var cart = [];
function addtocart() {
    var pass = true;

    for (let i = 0; i < cart.length; i++) {
        if( productindex == cart[i].index) {
            // console.log('found same ')
            cart[i].count++;
            pass = false;
        }
    }

    if(pass){
        var obj = {
            index : productindex,
            id : product[productindex].id,
            name : product[productindex].name,
            price : product[productindex].price,
            img : product[productindex].img,
            count : 1
        };
        cart.push(obj)
    }
    console.log(cart)

    Swal.fire({
        icon: 'success',
        title: 'เพิ่ม ' + product[productindex].name + ' ลงตะกร้าแล้ว',
        timer: 3000,
    })

    $('#cartcount').css('display' , 'flex').text(cart.length)
}

function opencart() {
    $('#modalcart').css('display', 'flex')
    rendercart();
}

function rendercart() {
    if(cart.length > 0) {
        var html = '';
        for (let i = 0; i < cart.length; i++) {
            html += `<div class="cartlist-items">
                        <div class="cartlist-left">
                            <img src="${cart[i].img}" alt="">
                            <div class="cartlsit-detail">
                                <p style="font-size: 1.5vw;">${cart[i].name}</p>
                                <p style="font-size: 1.2vw;">${numberWithCommas(cart[i].price * cart[i].count)}</p>
                            </div>
                        </div>
                        <div class="cartlist-rigth">
                            <button onclick="deinitems('-', ${i})" class="btn btn-dein">-</button>
                            <p id="countitems${i}" style="margin: 0 10px;">${cart[i].count}</p>
                            <button onclick="deinitems('+', ${i})" class="btn btn-dein">+</button>
                        </div>
                    </div>`;
        }
        $('#mycart').html(html)
    } else {
        $('#mycart').html(`"ไม่พบสินค้า"`)
    }
}

function deinitems(action, index) {
    if(action == '-') {
        cart[index].count--;
        $("#countitems"+index).text(cart[index].count)
        $('#cartcount').css('display' , 'flex').text(cart[index].count)
        rendercart()
        if(cart[index].count <= 0) {
            Swal.fire({
                icon: 'warning',
                title: 'คุณแน่ใจที่จะลบสินค้าใช่มั้ย? ',
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: 'ลบ',
                cancelButtonText: 'ยกเลิก'
            }).then((res) => {
                if(res.isConfirmed) {
                    cart.splice(index, 1)
                    console.log(cart)
                    rendercart()
                    $('#cartcount').text(cart.length)

                    if(cart.length <= 0) {
                        $('#cartcount').css('display' , 'none')
                    }
                } else {
                    cart[index].count++;
                    $("#countitems"+index).text(cart[index].count)
                    rendercart()
                }
            })
        }

    } else if (action == '+') {
        cart[index].count++;
        $("#countitems"+index).text(cart[index].count)
        rendercart()
    }
}