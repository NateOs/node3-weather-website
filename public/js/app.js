console.log('Client side javascript is loaded')

//fetching query results from browser
// fetch('http://localhost:3000/weather?address=accra').then((response) => {
//     response.json().then((data) => {
//         if (data.error){
//             console.log(data.error)
//         } else {
//             console.log(data.location)
//             console.log(data.forecast)
//         }
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'From JavaScript'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if (data.error){
            messageOne.textContent = data.error
        } else {
            // console.log(data.location)
            // console.log(data.forecast) 
            messageTwo.textContent = data.location //passing output to user
            messageOne.textContent = data.forecast
        }
    })
})

    console.log(location)
})