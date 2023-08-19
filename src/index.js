document.addEventListener('DOMContentLoaded', function () {
  const input = document.getElementById('taskInput')
  const btn = document.getElementById('addButton')
  const ul = document.getElementById('taskList')

  const div = document.createElement('div')

  btn.addEventListener('click', () => {
    let val = input.value
    const li = document.createElement('li')
    if (input.value !== '') {
      li.innerHTML = `<div>${val}</div><button class ="delete-button">X</button>`
      ul.appendChild(li)
    }
    ul.addEventListener('click', function (e) {
      if (e.target.classList.contains('delete-button')) {
        e.target.parentElement.remove()
      }
    })
    input.value = ''

    if (val === 'cook') {
      li.innerHTML = `<div>${val}</div><button id="addButton" class="recipe">How about Christmas pie?</button><button class ="delete-button">X</button>`
      const input = document.createElement('input')

      const recipe = li.querySelector('.recipe')
      recipe.addEventListener('click', function () {
        fetch('http://localhost:3000/recipes')
          .then((res) => res.json())
          .then((data) => {
            data.forEach((recipe) => {
              input.addEventListener('change', function () {
                const selectedDate = new Date(input.value)
                const formattedDate = selectedDate.toLocaleDateString()
                alert(`You selected: ${formattedDate}`)
                console.log(formattedDate)
              })

              div.innerHTML = `<input type="date" id="datepicker">

              <button class ="delete-button">Delete Recipe</button>
              <figure class="snip1578">
                <img src="${recipe.img}"/>
                <figcaption>
                  <h3>${recipe.name}</h3>
                  <h5>${recipe.author}</h5>
                  <h2>Ingredients:</h2>
                  <ul>
                    ${recipe.ingredients
                      .map((ingredient) => `<li>${ingredient}</li>`)
                      .join('')}
                  </ul>
                  <h2>Method:</h2>
                  <ol>
                    ${recipe.method.map((step) => `<li>${step}</li>`).join('')}
                  </ol>        
                </figcaption>
              </figure>`
              div.addEventListener('click', function (e) {
                if (e.target.classList.contains('delete-button')) {
                  e.target.parentElement.remove()
                }
              })
            })
          })
      })
      const recipee = document.getElementById('recipe')
      recipee.append(div)
    }
  })
})
