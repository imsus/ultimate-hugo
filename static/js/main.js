const Website = () => import('./modules/website.js')

console.log('Ultimate Hugo Boilerplate')

document.getElementById('button').addEventListener('click', async function() {
  (await Website()).default()
}, false)
