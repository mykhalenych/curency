
let date = new Date();
let dd = date.getDate();
if (dd < 10) dd = '0' + dd;

let mm = date.getMonth() + 1;
if (mm < 10) mm = '0' + mm;

let yy = date.getFullYear();

date = yy  + mm + dd;

document.querySelector('#statusCurr').insertAdjacentHTML('beforeend',dd + '.' + mm + '.' + yy);


ajax(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=${date}&json`,'GET',funcResp);

let UAH = {
    cc: 'UAH',
    rate: 1
}
function funcResp(data){
    data = JSON.parse(data.response);
    data.push(UAH);
    
    inpNumb.oninput = () =>{
        mainFuncCalc(data)
    }
    selectOut.onchange = () =>{
        mainFuncCalc(data)
    }
    selectInp.onchange = () =>{
        mainFuncCalc(data)
    }

    fillCurr(data);
}

let selectInp = document.querySelector('#inpSelect'),
    selectOut = document.querySelector('#outSelect')
    inpNumb = document.querySelector('#firstCurrenc'),
    outNumb = document.querySelector('#endCurrence');

    function mainFuncCalc(obj) {
        
        let enterValue = inpNumb.value;
        let selectValueInp = selectInp.value;
        let selectValueOut = selectOut.value;
        let inpRate, outRate;
        
        for(let i = 0; i < obj.length; i++){
            if(selectValueInp == obj[i].cc){
                inpRate = obj[i].rate;
            }
            if(selectValueOut == obj[i].cc){
                outRate = obj[i].rate;
            }

        }   

        let result = ((inpRate/outRate)*enterValue).toFixed(3);
        
        outNumb.value = result;

    }


    function fillCurr(arr) {
        let cuurFill = document.querySelectorAll('.buy');

        for(let j = 0; j <= cuurFill.length-1; j++){
            for(let i = 0; i <= arr.length-1; i++){
                if(cuurFill[j].name == arr[i].cc){
                    cuurFill[j].value = (arr[i].rate).toFixed(3);
                }
            }
        }
        
        
        
    }



