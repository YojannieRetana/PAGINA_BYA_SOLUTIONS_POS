import { supabase } from './supabase.js'

window.register = async function(){

 const name = document.getElementById('name').value
 const company = document.getElementById('company').value
 const plan = document.getElementById('plan').value
 const email = document.getElementById('email').value
 const password = document.getElementById('password').value

 const { data, error } = await supabase.auth.signUp({
  email,
  password
 })

 if(error){
  alert(error.message)
  return
 }

 const userId = data.user.id

 const { data: companyData } = await supabase
 .from('companies')
 .insert([
  {
   name: company,
   plan: plan
  }
 ])
 .select()

 await supabase
 .from('profiles')
 .insert([
  {
   id:userId,
   company_id:companyData[0].id,
   name:name,
   email:email,
   role:'admin'
  }
 ])

 alert('Cuenta creada')

 window.location='index.html'
}