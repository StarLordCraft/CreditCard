import "./css/index.css"
import Imask from "imask"

const ccBgColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path");
const ccBgColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path");

const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img")


//mask -> serve pra controlar os inputs dos usuarios 
const securityCode = document.getElementById('security-code');//cvc
const securityCodePattern = {
    mask: "0000"
}
const securityCodeMasked = IMask(securityCode, securityCodePattern);

const expirationDate = document.getElementById('expiration-date')
const expirationDatePattern = {
    mask: "MM{/}YY",
    blocks: {
        MM: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 12,
        },
        YY: {
            mask: IMask.MaskedRange,
            from: String(new Date().getFullYear()).slice(2),
            to: String(new Date().getFullYear() + 10).slice(2),
        },
    },
}
const expirationDateMasked = IMask(expirationDate, expirationDatePattern)

const cardNumber = document.getElementById('card-number')
const cardNumberPattern ={
    mask: [
        {
            mask:"0000 0000 0000 0000",
            regex: /^((((6363)|(4389)|(5041)|(4514)|(6362))\d{0,10})|((5067)|(4576)|(4011))\d{0,12})/,
            cardtype: "elo",
        },
        {
            mask:"0000 0000 0000 0000",
            regex: /((^5[1-5]\d{0,2})|(^22[2-9]\d{0,1})|(^2[3-7]\d{0,2}))\d{0,12}/,
            cardtype: "mastercard",
        },
        {
            mask:"0000 0000 0000 0000",
            regex:  /^4\d{0,15}/,
            cardtype: "visa",
        },
        {
            mask:"0000 0000 0000 0000",
            cardtype: "default",
        },

    ],
        dispatch: function (appended, dynamicMasked){
            const number = (dynamicMasked.value + appended); //TESTAR APAGAR ESSA LINHA DPS
            const Masked = dynamicMasked.compiledMasks.find(function (item){
                return number.match(item.regex)
            });
            return Masked;
    },
}
const cardNumberMasked = IMask(cardNumber, cardNumberPattern);
//end mask

//funções
function setCardType(type){

    const colors = {
        visa: ["#436D99","#2D57F2"],
        mastercard: ["#DF6F29","#C69347"],
        elo: ["#EF9214", '#A50606'],
        default: ["black", "gray"],
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

cardNumberMasked.on(
    'accept', () => {
        const cardType = cardNumberMasked.masked.currentMask.cardtype;
        setCardType(cardType);
        const ccNumber = document.querySelector('.cc-number');
        ccNumber.innerText = (cardNumberMasked.value.length > 0)? cardNumberMasked.value : '1234 5678 9012 3456'
    })

const cardHolder = document.querySelector('#card-holder');
cardHolder.addEventListener(
    'input', () => {
        const ccHolder = document.querySelector('.cc-holder .value')
        ccHolder.innerText = (cardHolder.value.length > 0)?cardHolder.value: 'FULANO DA SILVA';
    });

expirationDateMasked.on(
    'accept', () => {
        const ccExpiration = document.querySelector('.cc-extra .value') 
        ccExpiration.innerText = (expirationDateMasked.value.length > 0)?expirationDateMasked.value : '01/32'
    })

securityCodeMasked.on(
    'accept', () => {
    const ccsecurity = document.querySelector('.cc-security .value')
    ccsecurity.innerText = (securityCodeMasked.value.length > 0)? securityCodeMasked.value : '123';
    });

const addButton = document.querySelector('#add-card').addEventListener(
    'click', () => {
        alert("Cartão Adicionado!")
})

