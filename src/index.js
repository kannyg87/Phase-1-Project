document.addEventListener("DOMContentLoaded", function() {
  const input = document.getElementById('taskInput')
  const btn = document.getElementById('addButton')
  const ul = document.getElementById('taskList')

  btn.addEventListener('click', ()=>{
    let val = input.value
    const li = document.createElement('li')
    if (input.value !== ""){
      li.innerHTML=`<div>${val}</div><button class ="delete-button">X</button>`
        ul.appendChild(li);
      }
    ul.addEventListener('click', function(e){
      if(e.target.classList.contains('delete-button')){
        e.target.parentElement.remove();
      }
    })
    input.value =''

    if(val === "cook"){
        li.innerHTML=`<div>${val}</div><button id="addButton" class="recipe">How about Christmas pie?</button><button class ="delete-button">X</button>`
    }

  })
});

