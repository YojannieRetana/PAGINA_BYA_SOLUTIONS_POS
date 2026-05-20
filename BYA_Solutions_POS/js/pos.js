import { supabase } from './supabase.js'
 html += `
 <div class='product-card'
 onclick='addCart(${JSON.stringify(product)})'>

 <h3>${product.name}</h3>
 <p>₡${product.price}</p>

 </div>
 `
 

 document.getElementById('products').innerHTML=html


window.addCart=function(product){

 cart.push(product)
 renderCart()
}

function renderCart(){

 let html=''
 let total=0

 cart.forEach(item=>{

 total += Number(item.price)

 html += `
 <div>
 ${item.name} - ₡${item.price}
 </div>
 `
 })

 document.getElementById('cart').innerHTML=html
 document.getElementById('total').innerText='₡'+total
}

window.pay = async function(){

 let total=0

 cart.forEach(item=>{
 total += Number(item.price)
 })

 const payment=document.getElementById('payment').value

 const {
  data:{user}
 } = await supabase.auth.getUser()

 const { data:profile } = await supabase
 .from('profiles')
 .select('*')
 .eq('id',user.id)
 .single()

 await supabase
 .from('sales')
 .insert([
  {
   company_id:profile.company_id,
   total,
   payment_method:payment
  }
 ])

 alert('Venta realizada')

 cart=[]
 renderCart()
}

loadProducts()