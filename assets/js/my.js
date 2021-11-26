let table = document.querySelector("#tbody");
table.innerHTML = '';

let order = [];



function orderpopulate() {

    table.innerHTML = '';
    let count = 1;
    order.forEach((a) => {
        
        table.innerHTML += `<tr>
                            <td>${count}</td>
                            <td>${a[2]}</td>
                            <td>${a[3]}&euro;</td>
                            <td><input type="number" readonly value="${a[4]}" class="count" id="c${count}" min="1" ordid="${count-1}"></td>
                            <td>${a[3]*a[4]}</td>
                            <td  align="center"><img src="./assets/img/${a[5]}" class="orderimage" id="test" style=""></td>
                            <td id="a${count}" class="actions" ><i class="bi bi-pencil-square" onclick="enedit('c${count}');"></i></td>
                            <td id="b${count}" class="actions" onclick="deleteitem(${count-1})"><i class="bi bi-trash"></a></td>
                            
                            
                        </tr>`;
        count++;

    })

    gettotal();

    let testt = document.querySelectorAll("#test");
    
    for (let i = 0; i < testt.length; i++) {
        testt[i].addEventListener("click", (e) => {
            let c1 = document.querySelector(`#a${i+1}`);
            let c2 = document.querySelector(`#b${i+1}`);

            if (c1.style.visibility === "") {
                c1.style.visibility = "visible";
                c2.style.visibility = "visible";
            } else {
                c1.style.visibility = "";
                c2.style.visibility = "";
            }
        })
    }
    

}

function gettotal() {
    let total = document.querySelector("#totalprice");
    let tt = 0;
    order.forEach((a) => {


        tt += a[3] * a[4];

    })
    total.innerHTML = tt + "&euro;";
    localStorage.setItem("payment", tt);
}



if (JSON.parse(localStorage.getItem("order")) != null) {

    order = JSON.parse(localStorage.getItem("order"));


}

orderpopulate()

let orderid = localStorage.getItem("orderid")

function pushorder(id, name, price, image) {


    let count = 1;
    let tempord = [];
    tempord.push(orderid)
    tempord.push(id);
    tempord.push(name);
    tempord.push(price);


    if (order.length == 0) {

        let tempord = [];
        tempord.push(orderid)
        tempord.push(id);
        tempord.push(name);
        tempord.push(price);
        tempord.push(1);
        tempord.push(image);

        order.push(tempord);

        tempord = [];
    } else {
        order.forEach((a => {
            if (a[1] == id) {

                order.splice(order.indexOf(a), 1)
                orderpopulate();
                count = Number(a[4] + 1);
            } else {




            }
        }))

        tempord.push(count);
        tempord.push(image);
        order.push(tempord);

        tempord = [];
        count = '';
    }

    localStorage.setItem("order", JSON.stringify(order));


    orderpopulate();

    orderid++;

    localStorage.setItem("orderid", orderid)




}



let a = document.querySelector("#totalsales");
a.innerHTML = `<h3>TOTAL SALES</h3> 
                <h3 class="strong" >${localStorage.getItem("sales")}&euro;</h3>`;
let cash = document.querySelector("#cash");
let change = document.querySelector("#change");

cash.addEventListener("input", (e) => {


    change.value = cash.value - localStorage.getItem("payment");
})

function finishpayment() {
    let sales = 0;
    sales = Number(localStorage.getItem("sales"));

    sales += Number(localStorage.getItem("payment"));

    localStorage.setItem("sales", sales);
    sales = 0;

    localStorage.removeItem("order", '');
    localStorage.setItem("orderid", 1);
    order = [];
    orderid = localStorage.getItem("orderid")
    orderpopulate();
    cash.value = 0;
    change.value = 0;

    let a = document.querySelector("#totalsales");
    a.innerHTML = `<h3>TOTAL SALES</h3> 
                <h3 class="strong" >${localStorage.getItem("sales")}&euro;</h3>`;


}


function gettotalpayment() {
    let payment = document.querySelector("#payment");
    payment.innerHTML = "Total Payment: " + localStorage.getItem("payment") + "&euro;";



}
const btn = document.querySelector("#insert");
const name = document.querySelector("#name");
const price = document.querySelector("#price");
const image = document.querySelector("#image");
let menu = [];

function populatemenu() {
    let menusec = document.querySelector("#menu");
    menuhtml = `
       <div class="items title text-center" >Menu</div>
            
       `;
    let count=0;
    
    for (a in menu) {
        let c = `<div style="border:1px solid red;">
               <div class="items text-center" id="${menu[a][0]}" onclick="pushorder('${menu[a][0]}','${menu[a][1]}','${menu[a][2]}','${menu[a][3]}')">
                <input type="hidden" id="${menu[a][0]}">
                <img src="./assets/img/${menu[a][3]}" alt="Hamburger">
                <p class="mt-2 mb-0">${menu[a][1]}</p>
                <span class="price"> ${menu[a][2]} &euro;</span><br/>
                </div>
                <span><a href="#" class="btn" data-toggle="modal" data-target="#editmenu" onclick="updatemenu(${count})"><i class="bi bi-pencil-square"></i></a></span>
                
            </div>
            
               `;
        menuhtml += c;
        count++;



    }
    menusec.innerHTML = menuhtml;

}

if (JSON.parse(localStorage.getItem("menu")) != null) {

    menu = JSON.parse(localStorage.getItem("menu"));
    populatemenu();

}


let menuItem = [];

btn.addEventListener("click", (e) => {
    e.preventDefault();
    populatemenu();
    menuItem = [];
    let id = localStorage.getItem("id");
    menuItem.push(id);
    menuItem.push(name.value);
    menuItem.push(price.value);
    menuItem.push(image.files[0].name);
    id++;
    localStorage.setItem("id", id);





    menu.push(menuItem);
    menuItem = [];

    localStorage.setItem("menu", JSON.stringify(menu));
    populatemenu();

})




function deleteitem(id) {
    let order2 = JSON.parse(localStorage.getItem("order"));
    let conf = confirm("Do you want to delete", "defaultText");
    if (conf == true) {

        order2.splice(id, 1);
        localStorage.setItem("order", JSON.stringify(order2));
        order = [];
        orderpopulate();
        order = order2;
        orderpopulate();

    }



}

function updateorder(id, cc) {
    let order2 = order;

    order[id][4] = cc;

    order = order2;
    localStorage.setItem("order", JSON.stringify(order2));
    orderpopulate();




}

function enedit(id) {


    let control = document.querySelector(`#${id}`);
    control.removeAttribute('readonly');
    control.classList.add("count-enable")

    control.focus();
    control.addEventListener("keyup", (e) => {
        if (event.keyCode === 13) {
            event.preventDefault();

            updateorder(control.getAttribute("ordid"), Number(control.value));

        }
    })



}

let eur = 1;
let usd = 0;
let chf = 0;
let gbp = 0;
let symbols = "USD,CHF,GBP"
document.querySelector("#EUR").setAttribute("checked", "");
document.querySelector("#LEUR").classList.add("checked")
axios.get("http://data.fixer.io/api/latest?access_key=de749d240f993d2359d4a2ab8fb5cac7&symbols=" + symbols + "&format=1")
    .then(response => {

        usd = response.data.rates.USD;
        chf = response.data.rates.CHF;
        gbp = response.data.rates.GBP;
    })
    .catch(error => console.log(error));;

var radios = document.forms["formA"].elements["currency"];
for (var i = 0, max = radios.length; i < max; i++) {
    let amount = document.querySelector("#cash");
    let converted = document.querySelector("#change");
    let payment = localStorage.getItem("payment");
    radios[i].onclick = function() {
        switch (this.value) {
            case "EUR":
                converted.value = Number(amount.value - localStorage.getItem("payment"));

                document.querySelector("#LEUR").classList.add("checked");
                document.querySelector("#LUSD").classList.remove("checked");
                document.querySelector("#LCHF").classList.remove("checked");
                document.querySelector("#LGBP").classList.remove("checked");

                break;
            case "USD":
                converted.value = Math.floor(Number((amount.value / usd) - localStorage.getItem("payment")) * 100) / 100;


                document.querySelector("#LEUR").classList.remove("checked");
                document.querySelector("#LUSD").classList.add("checked");
                document.querySelector("#LCHF").classList.remove("checked");
                document.querySelector("#LGBP").classList.remove("checked");
                break;
            case "CHF":
                converted.value = Math.floor(Number((amount.value / chf) - localStorage.getItem("payment")) * 100) / 100;

                document.querySelector("#LEUR").classList.remove("checked");
                document.querySelector("#LUSD").classList.remove("checked");
                document.querySelector("#LCHF").classList.add("checked");
                document.querySelector("#LGBP").classList.remove("checked");
                break;
            case "GBP":
                converted.value = Math.floor(Number((amount.value / gbp) - localStorage.getItem("payment")) * 100) / 100;

                document.querySelector("#LEUR").classList.remove("checked");
                document.querySelector("#LUSD").classList.remove("checked");
                document.querySelector("#LCHF").classList.remove("checked");
                document.querySelector("#LGBP").classList.add("checked");
                break;

        }
    }
}

function updatemenu(count){
    console.log("menu update");
    let body=document.querySelector("#insertfood");
    let menu=JSON.parse(localStorage.getItem("menu"));

    console.log(menu[count]);
    // <input type="file" name="aa" id="image2" value="${menu[count][3]}"></input>
    let aaa="ismeti";
    body.innerHTML=`
    <input type="text" placeholder="Name" id="name2" value="${menu[count][1]}"> 
    <input type="number" name=""  placeholder="PRICE" id="price2" value="${menu[count][2]}">
    
    <a href="#" class="btn btn-primary" onclick="update2('${count}')">UPDATE</a>
    `;

    
}

function update2(id){
   
    const name = document.querySelector("#name2").value;
    const price = document.querySelector("#price2").value;
    // const image = document.querySelector("#image2").files[0].name;

    menu[id][1]=name;
    menu[id][2]=Number(price);

    localStorage.setItem("menu",JSON.stringify(menu));
    populatemenu();

}


