window.addEventListener("DOMContentLoaded", () => {
    const cardsContainer = document.querySelector(".cards__container")

    function openBurger() {
        const burger = document.querySelector(".header__burger")
        const menu = document.querySelector(".header__navbar")
        const bodyPage = document.querySelector("body")

        burger.addEventListener("click", () => {
            burger.classList.toggle("active")
            menu.classList.toggle("active")
            bodyPage.classList.toggle("lock")
        })

    }

    function quantityHandler() {

        const increaseBtns = document.querySelectorAll(".card__counter-increase")
        const decreaseBtns = document.querySelectorAll(".card__counter-decrease")
        const quantityInput = document.querySelectorAll(".card__counter-input")

        const arrIncreaseBtns =  Array.prototype.slice.call(increaseBtns)
        const arrDecreaseBtns =  Array.prototype.slice.call(decreaseBtns)

        cardsContainer.addEventListener("click", (event) => {
            let target = event.target

            if (target.classList.contains("card__counter-increase")) {
                let idx = arrIncreaseBtns.indexOf(target)
                quantityInput.item(idx).value ++

            } else if (target.classList.contains("card__counter-decrease")) {
                let idx = arrDecreaseBtns.indexOf(target)
                if(quantityInput.item(idx).value > 0){
                    quantityInput.item(idx).value --
                } 
            } 
        })
    }

      function onDescrHandler() {

         const descrBtn = document.querySelectorAll(".accordion")
         const descrText = document.querySelectorAll(".card__details")
         const arrowUp = document.querySelectorAll("#arrow__up")
         const arrowDown = document.querySelectorAll("#arrow__down")
 
        const arrDescrBtns =  Array.prototype.slice.call(descrBtn)

         cardsContainer.addEventListener("click", (event) => {
             let target = event.target
             let idx = arrDescrBtns.indexOf(target)
             if (target.classList.contains("accordion")) {
                descrText.item(idx).classList.toggle("active")
                  if (descrText.item(idx).style.maxHeight) {
                     descrText.item(idx).style.maxHeight = null;
                 } else {
                     descrText.item(idx).style.maxHeight = descrText.item(idx).scrollHeight + "px";
                 } 
             } else {
                 return null
             }
             arrowUp.item(idx).classList.toggle("active")
             arrowDown.item(idx).classList.toggle("active")
         })
     } 

     function unitHandler(){
        const unitTabs1 = document.querySelectorAll(".card__unit__tab1")
        const unitTabs2 = document.querySelectorAll(".card__unit__tab2")
        const arrUnitTabs1 = Array.prototype.slice.call(unitTabs1)
        const arrUnitTabs2 = Array.prototype.slice.call(unitTabs2)

        cardsContainer.addEventListener("click", (event) => {
            let target = event.target
            if (target.classList.contains("card__unit__tab1")) {
                let idx = arrUnitTabs1.indexOf(target)
                unitTabs1.item(idx).classList.toggle("active")
                unitTabs2.item(idx).classList.remove("active")
            } else if (target.classList.contains("card__unit__tab2")) {
                let idx = arrUnitTabs2.indexOf(target)
                unitTabs2.item(idx).classList.toggle("active")
                unitTabs1.item(idx).classList.remove("active")
            }
        })
     }

        unitHandler()
        onDescrHandler()  
        quantityHandler()
        openBurger()

})