let searchParams = new URLSearchParams(window.location.search)
searchParams.has('token') 
let token = searchParams.get('token')
console.log(token);