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
