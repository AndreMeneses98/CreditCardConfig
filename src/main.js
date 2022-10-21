import "./css/index.css"
import IMask from "imask"

const ccBgColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path")
const ccBgColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path")
const cardLogo = document.querySelector(".cc-logo span:nth-child(2) img")



function setCardType(type){

    const colors = {
        visa: ["#2D57F2","#436D99"],
        mastercard: ["#C69347","#DF6F29"],
        americanExpress: ["#29BEDF","#477AC6"],
        default: ["black", "gray"]
    }
    
    ccBgColor01.setAttribute("fill", colors[type][0])
    ccBgColor02.setAttribute("fill", colors[type][1])
    cardLogo.setAttribute("src", `cc-${type}.svg`)

}


setCardType("default")
globalThis.setCardType = setCardType



//Security code
const securityCode = document.querySelector("#security-code")
const securityCodePattern =  {
    mask: '0000',
  };

const securityCodeMasked = IMask(securityCode, securityCodePattern)

securityCodeMasked.on("accept",() => {
    const ccSecurityCode = document.querySelector(".cc-security .value")
    ccSecurityCode.innerText = securityCode.value.length === 0 ? "123" : securityCode.value})
/*securityCode.addEventListener("input", () => {
    const ccSecurityCode = document.querySelector(".cc-security .value")
    ccSecurityCode.innerText = securityCode.value
})*/

//----------------------------------------------------------------
const experationDate = document.querySelector("#expiration-date")
const experationDatePattern =  {
    mask: 'MM{/}YY',
    blocks: {
        MM: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 12,
            
        },
        YY: {   
            mask: IMask.MaskedRange,
            from: String(new Date().getFullYear()).slice(2),
            to: String(new Date().getFullYear() + 10).slice(2)
        },
    },
}

const experationDateMasked = IMask(experationDate, experationDatePattern)
experationDateMasked.on("accept", () => {
    const ccExperation = document.querySelector(".cc-expiration .value")
    ccExperation.innerText = experationDate.value.length === 0 ? "02/32" : experationDate.value
})
/*experationDate.addEventListener("input", () => {
    const ccExperation = document.querySelector(".cc-expiration .value")
    ccExperation.innerText = experationDate.value; 
})*/


//----------------------------------------------------------------
const cardNumber =  document.querySelector("#card-number")
const cardNumberPattern = {
    mask: [
        { 
            mask: "0000 0000 0000 0000",
            regex: /^4\d{0,15}/,
            cardType: "visa"
        },
        { 
            mask: "0000 0000 0000 0000",
            regex: /(^5[1-5]\d{0,2}|^22[2-9]\d{0,1}|^2[3-7]\d{0,2})\d{0,12}/,
            cardType: "mastercard"
        },
        { 
            mask: "0000 0000 0000 0000",
            regex: /^3\d{0,15}/,
            cardType: "americanExpress"
        },
        { 
            mask: "0000 0000 0000 0000",
            cardType: "default" 
        },
    ],
    dispatch: function (appended, dynamicMasked) {
        const number = (dynamicMasked.value + appended).replace(/\D/g,'')
        const foundMask = dynamicMasked.compiledMasks.find(function (item){
            return number.match(item.regex)
        })
        console.log(foundMask)
        return foundMask
    },
}


const cardNumberMasked = IMask(cardNumber, cardNumberPattern)
/*cardNumber.addEventListener("input", ()=>{
    const ccNumber = document.querySelector(".cc-info .cc-number")
    ccNumber.innerText = cardNumber.value
    setCardType("cardType")
    
    
})*/
cardNumberMasked.on("accept", () => {
    const cardType = cardNumberMasked.masked.currentMask.cardType
    setCardType(cardType)
    const ccNumber = document.querySelector(".cc-info .cc-number")
    ccNumber.innerText = cardNumber.value.length === 0 ? "1234 5678 9012 3456" : cardNumber.value
})
//----------------------------------------------------------------

const addButton = document.querySelector("#add-card")
addButton.addEventListener("click", () =>{
console.log("UEPAAAA")
})

document.querySelector("form").addEventListener("submit", () =>{

    alert("cartao adicionado")
 

})


const cardHolder = document.querySelector("#card-holder")
cardHolder.addEventListener("input", () =>{
    const ccHolder = document.querySelector(".cc-holder .value")
    ccHolder.innerText = cardHolder.value.length === 0 ? "Nome" : cardHolder.value
});


