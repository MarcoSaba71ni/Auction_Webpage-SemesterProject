const burguerBtn = document.getElementById('burguer-btn');
const dropDown = document.getElementById('dropdown-menu');
dropDown.classList.add('hidden');

burguerBtn.addEventListener("click", (e) => {
    e.preventDefault();
    dropDown.classList.toggle("hidden");
})

document.addEventListener("click", (e)=>{
    const clickedInsideMenu = dropDown.contains(e.target);
    const clickedButton = burgerBtn.contains(e.target);

    if (!clickedInsideMenu && !clickedButton) {
        dropDown.classList.add("hidden");
    }
})
