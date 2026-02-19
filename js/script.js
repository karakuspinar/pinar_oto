let products=[];
let filtered=[];
let cart=[];

fetch("products.json")
.then(res=>res.json())
.then(data=>{
products=data;
filtered=data;
showProducts(data);
loadBrands(data);
});

function loadBrands(data){
let brands=[...new Set(data.map(p=>p.brand))];
let select=document.getElementById("brandFilter");
brands.forEach(b=>{
select.innerHTML+=`<option value="${b}">${b}</option>`;
});

select.addEventListener("change",()=>{
let val=select.value;
if(val==="all"){filtered=products}
else{filtered=products.filter(p=>p.brand===val)}
showProducts(filtered);
});
}

function showProducts(list){
const area=document.getElementById("products");
area.innerHTML="";
list.forEach((p,i)=>{
area.innerHTML+=`
<div class="card">
<img src="images/${p.image}">
<h3>${p.title}</h3>
<p>${p.price} ₺</p>
<button onclick="addToCart(${i})">Sepete Ekle</button>
</div>`;
});
}

function filterProducts(cat){
if(cat==="all"){filtered=products}
else{filtered=products.filter(p=>p.category===cat)}
showProducts(filtered);
}

document.getElementById("search").addEventListener("input",e=>{
let val=e.target.value.toLowerCase();
let result=filtered.filter(p=>p.title.toLowerCase().includes(val));
showProducts(result);
});

function addToCart(i){
cart.push(filtered[i]);
updateCart();
}

function updateCart(){
let area=document.getElementById("cartItems");
area.innerHTML="";
let total=0;
cart.forEach(p=>{
area.innerHTML+=`<p>${p.title}</p>`;
total+=parseInt(p.price);
});
document.getElementById("total").innerText="Toplam: "+total+"₺";
document.getElementById("cartCount").innerText=cart.length;
}

function toggleCart(){
let c=document.getElementById("cart");
c.style.display=c.style.display==="block"?"none":"block";
}

function sendWhatsApp(){
let msg="Sipariş:%0A";
cart.forEach(p=>{msg+=p.title+"%0A"});
window.open("https://wa.me/905063773868?text="+msg);
}