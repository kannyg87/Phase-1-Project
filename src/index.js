document.addEventListener('DOMContentLoaded', function () {
  const input = document.getElementById('taskInput');
  const btn = document.getElementById('addButton');
  const ul = document.getElementById('taskList');

  const div = document.createElement('div');
  const datepicker = document.createElement('input');
  datepicker.type = 'date';
  datepicker.id = 'datepicker';
  datepicker.value = new Date().toISOString().split('T')[0].slice(0, 10)
  const date = datepicker.value 
  const newObj = {
    date,
  }
  datepicker.addEventListener('click', function () {
    fetch(`http://localhost:3000/recipes`,{
      method:'POST',
      headers: {
        'Content-Type': "application/json",
      },
      body: JSON.stringify(newObj)
  })
  .then(response =>response.json())
  .then(data =>console.log(data))
});
  btn.addEventListener('click', () => {
    let val = input.value;
    const li = document.createElement('li');
    if (input.value !== '') {
      li.innerHTML = `<div>${val}</div><button class ="delete-button">X</button>`;
      ul.appendChild(li);
    }
    ul.addEventListener('click', function (e) {
      if (e.target.classList.contains('delete-button')) {
        e.target.parentElement.remove();
      }
    });
    input.value = '';

    if (val === 'cook') {
      li.innerHTML = `<div>${val}</div><button id="addButton" class="recipe">How about Christmas pie?</button><button class ="delete-button">X</button>`;
      
      const recipe = li.querySelector('.recipe');
      recipe.addEventListener('click', function () {
        fetch('http://localhost:3000/recipes')
          .then((res) => res.json())
          .then((data) => {
            div.innerHTML = '';
            data.forEach((recipe) => {
              if (recipe.name) {
                div.innerHTML += `
                <button class="delete-button">Delete Recipe</button>
                <figure class="snip1578" key=${recipe.id}>
                  <img src="${recipe.img}" />
                  <figcaption>
                    <h3>${recipe.name}</h3>
                    <h5>By: ${recipe.author}</h5>
                    <h2>Ingredients:</h2>
                    <ul>
                    ${recipe.ingredients ? recipe.ingredients.map((ingredient) => `<li>${ingredient}</li>`).join('') : ''}

                    </ul>
                    <h2>Method:</h2>
                    <ol>
                      ${recipe.method.map((step) => `<li>${step}</li>`).join('')}
                    </ol>
                  </figcaption>
                </figure>`;
              }
                div.addEventListener('click', function (e) {
                  if (e.target.classList.contains('delete-button')) {
                    e.target.parentElement.remove();
                  }
                });
            });
          });
      });

      const recipee = document.getElementById('recipe');
      recipee.innerHTML = ''; // Clear previous content
      ul.appendChild(datepicker);
      recipee.appendChild(div);
    }
  });
});
