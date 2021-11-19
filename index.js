const baseSelection = document.getElementById('baseSelection');
const sauceSelection = document.getElementById('sauceSelection');
const ingredientsSelectionOne = document.getElementById('selectionOfIngredientsOne');
const ingredientsSelectionTwo = document.getElementById('selectionOfIngredientsTwo');
const orderViewingArea = document.getElementById('orderViewingArea');
const allLiElements = [...document.getElementsByTagName('li')];
const finalPrice = document.getElementById('finalPrice');
const btnToOrder = document.getElementById('btnToOrder');
const img = document.getElementById('img');

const prices = {
    margarita: 20,
    student: 18,
    mushroom: 22,
    extra: 17,
    cheesy: 1,
    garlic: 2,
    sour: 2,
    spicy: 4,
    shrimps: 5,
    champignon: 7,
    tomato: 3,
    bacon: 4,
    basil: 6,
    cheese: 9,
    salad: 5,
    onion: 10
}

const order = {
    ingredientOne: [],
    ingredientTwo: []
};

function getTheAttributeValue(event) {
    return event.target.getAttribute('value');
}

function repetitiveActions(event, flag) {
    if (flag) {
        event.target.classList.add('active');
        orderViewingArea.append(createLiAndButton(event.target.textContent, getTheAttributeValue(event)));
        showPrice();
        togglesTheOrderButton();
        insertImg(true);
    } else {
        changeClassAfterDeletion();
        showPrice();
        togglesTheOrderButton();
        insertImg(false);
    }
}

function checksChoiceOfBases(event) {
    if (!('basis' in order)) {
        order.basis = getTheAttributeValue(event);
        repetitiveActions(event, true)
    }
}

function checksChoiceOfSauce(event) {
    if (!('sauce' in order)) {
        order.sauce = getTheAttributeValue(event);
        repetitiveActions(event, true);
    }
}

function checksChoiceOfIngredientsOne(event) {
    if (order.ingredientOne.length < 2) {
        order.ingredientOne.push(getTheAttributeValue(event));
        repetitiveActions(event, true);
    }
}

function checksChoiceOfIngredientsTwo(event) {
    if (order.ingredientTwo.length < 2) {
        order.ingredientTwo.push(getTheAttributeValue(event));
        repetitiveActions(event, true);
    }
}

function createLiAndButton(textContent, idForButton) {
    let elemLi = document.createElement('li');
    let button = document.createElement('button');
    const text = document.createTextNode(textContent);
    button.id = idForButton;
    button.textContent = 'Удалить';
    elemLi.addEventListener('click', removesFromOrder);
    elemLi.append(text);
    elemLi.append(button);
    return elemLi;
}

function removesFromOrder(event) {
    for (let key in order) {
        if (Array.isArray(order[key])) {
            order[key].forEach((item, index) => {
                if (item === event.target.id) {
                    order[key].splice(index, 1);
                    event.currentTarget.remove();
                    repetitiveActions(false);
                }
            });
        }
        if (order[key] === event.target.id) {
            delete order[key];
            event.currentTarget.remove();
            repetitiveActions(false);
        }
    }
}

function changeClassAfterDeletion() {
    let arr = Object.values(order).flat();
    allLiElements.forEach((item) => {
        if (item.classList.contains('active') && !(arr.includes(item.getAttribute('value')))) {
            item.classList.remove('active');
        }
    })
}

function findTheFinalPrice() {
    let counter = 0;
    let arr = Object.values(order).flat();
    for (let key in prices) {
        if (arr.includes(key)) {
            counter += prices[key];
        }
    }
    return counter;
}

function showPrice() {
    finalPrice.textContent = `Цена: ${findTheFinalPrice()} $`;
}

function togglesTheOrderButton() {
    btnToOrder.disabled = !(order.basis && order.sauce && order.ingredientOne.length && order.ingredientTwo.length);
}

function printTheOrderInConsole() {
    console.log(order);
    alert('Заказ успешно сформирован!');
}

function insertImg(addImg) {
    img.src = `image/${changesImg(addImg)}.png`;
}

function changesImgMaker() {
    let counter = 0;
    return function (addImg) {
        addImg ? counter++ : counter--;
        return counter;
    }
}

const changesImg = changesImgMaker();

baseSelection.addEventListener('click', checksChoiceOfBases);
sauceSelection.addEventListener('click', checksChoiceOfSauce);
ingredientsSelectionOne.addEventListener('click', checksChoiceOfIngredientsOne);
ingredientsSelectionTwo.addEventListener('click', checksChoiceOfIngredientsTwo);
btnToOrder.addEventListener('click', printTheOrderInConsole);

