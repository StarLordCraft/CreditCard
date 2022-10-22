function setCardType(type){

    const colors = {
        visa: ["#436D99","#2D57F2"],
        mastercard: ["#DF6F29","#C69347"],
        default: ["black","gray"]
    }
    ccBgColor01.setAttribute("fill",colors[type][0]);
    ccBgColor02.setAttribute("fill",colors[type][1]);
    ccLogo.setAttribute("src", "cc-"+ type +".svg");
}

globalThis.setCardType = setCardType

document.querySelector('form').addEventListener(
    'submit', (event) => {
        event.preventDefault();
});

const addButton = document.querySelector('#add-card').addEventListener(
    'click', () => {
        alert("Cartão Adicionado!")
})

const cardHolder = document.querySelector('#card-holder').addEventListener(
'input', () => {
    const ccHolder = document.querySelector('.cc-holder .value')
    ccHolder.innerText = (cardHolder.value.length > 0)?cardHolder.value : 'FULANO DA SILVA';
});
