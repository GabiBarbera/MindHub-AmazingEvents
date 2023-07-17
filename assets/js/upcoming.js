let container = document.getElementById("upcomingCards")
const inputsLabels = document.getElementById("allInputs")
const searchInput = document.getElementById("search")
let allEvents;
let currentDate;

fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then(answer => answer.json())
    .then(data => {
        allEvents = data.events
        currentDate = data.currentDate
        let categories = allEvents.map(category => category.category)
        let nonRepeatingCategories = new Set(categories)
        let nonRepeatinArray = Array.from(nonRepeatingCategories)
        showCards(allEvents, currentDate, container)
        showInputs(nonRepeatinArray, inputsLabels)
        inputsLabels.addEventListener("change", () => {
            container.innerHTML = " "
            let checkbox = document.querySelectorAll("input[type='checkbox']:checked")
            let checkArray = []
            checkbox.forEach(function (values) {
                checkArray.push(values.value)
            })
            let filter = crossFilter(allEvents, searchInput.value, checkArray)
            showCards(filter, currentDate, container)
        })
        searchInput.addEventListener("input", () => {
            container.innerHTML = " "
            let checkbox = document.querySelectorAll("input[type='checkbox']:checked")
            let checkArray = []
            checkbox.forEach(function (values) {
                checkArray.push(values.value)
            })
            let filter = crossFilter(allEvents, searchInput.value, checkArray)
            showCards(filter, currentDate, container)
        })
    })
    .catch(error => console.log(error))

function createLetters(object) {
    return ` <div class="card col-md-2 float-md-end mb-3 ms-md-3 shadow-lg p-3 mb-5 bg-body-success rounded">
      <img src="${object.image}" class="card-img w-100 object-fit-cover" alt="cinema">
      <div class="card-body d-flex flex-column justify-content-evenly">
      <h5 class="card-title align-self-center">${object.name}</h5>
      <p class="card-text">${object.description}</p>
      <div class="d-flex justify-content-between align-items-center">
      <h6>US$${object.price}</h6>
      <a href="../pages/details.html?parameter=${object._id}" class="btn btn-secondary border border-black shadow">Details</a>
          </div>
      </div>
  </div>`
}

function showCards(array, date, place) {
    let template = " "
    if (array.length == 0) {
        place.innerHTML = `<h2>❌ oops something went wrong ❌</h2>`
    } else {
        place.innerHTML += " "
        for (events of array) {
            if (events.date >= date) {
                template += createLetters(events)
            }
        }
        place.innerHTML += template
    }
}

function createInputs(category) {
    return `<div>
    <input type="checkbox" name="checkCategory" id="${category}" value="${category}">
    <label for="${category}">${category}</label>
    </div>`
}

function showInputs(array, where) {
    for (let element of array) {
        where.innerHTML += createInputs(element)
    }
}

function searchfilter(arrayEvents, text) {
    return arrayEvents.filter(event => event.name.toLowerCase().includes(text.toLowerCase()))
}

function checkFilter(eventList, categories) {
    if (categories.length == 0) {
        return eventList
    }
    return aux = eventList.filter(event => categories.includes(event.category) || categories.length == 0)
}

function crossFilter(eventList, searchvalue, categories) {
    let checkFilter2 = checkFilter(eventList, categories)
    let checkInput2 = searchfilter(checkFilter2, searchvalue)
    return checkInput2
}

