import { supabase } from './supabase.js'

async function loadProducts(){

 const {
  data:{user}
 } = await supabase.auth.getUser()

 const { data:profile } = await supabase
 .from('profiles')
 .select('*')
 .eq('id',user.id)
 .single()

 const { data:products } = await supabase
 .from('products')
 .select('*')
 .eq('company_id',profile.company_id)

 let html=''

 products.forEach(product=>{

  html += `
   <tr>
    <td>${product.name}</td>
    <td>₡${product.price}</td>
    <td>${product.stock}</td>
   </tr>
  `
 })

 document.getElementById('products').innerHTML=html
}

window.addProduct = async function(){

 const name=document.getElementById('name').value
 const price=document.getElementById('price').value
 const stock=document.getElementById('stock').value

 const {
  data:{user}
 } = await supabase.auth.getUser()

 const { data:profile } = await supabase
 .from('profiles')
 .select('*')
 .eq('id',user.id)
 .single()

 await supabase
 .from('products')
 .insert([
  {
   company_id:profile.company_id,
   name,
   price,
   stock
  }
 ])

 loadProducts()
}

loadProducts()