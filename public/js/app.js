const weatherForm = document.querySelector("form")
const search = document.querySelector('input')
const messageOne = document.querySelector("#message-one")
const messageTwo = document.querySelector("#message-two")
const messageThree = document.querySelector("#message-three")


messageOne.textContent = ""
messageTwo.textContent = ""
messageThree.textContent = ""


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() // prevent refresh on submitting form 
    messageOne.textContent = "Loading..."
    const location = search.value
    const url = '/weather/?address=' + encodeURIComponent(location)
    fetch(url).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                messageOne.textContent = ""
                messageTwo.textContent = data.error
            } else {
                messageOne.textContent = "Weather Data:"
                messageTwo.textContent = data.location
                messageThree.textContent = "Current Temperature: " + data.temperature + "F"
            }
        })
    })
})
