const {body} = document; // This syntax means I would make "document.body"
let candidate : number[]; // This means "let candidate"'s type is a number array.
let array: number[] = [];

function chooseNumber() {
    candidate = [1,2,3,4,5,6,7,8,9]; //Already, let candidate is determined as number, this array only can encompass numbers.
    array = [];
    for (let i=0; i<4; i+=1){
        const chosen = candidate.splice(Math.floor(Math.random()*(9-i)),1)[0];
        array.push(chosen);
    }
} //candidate.splice = eliminate certain value inside the array. For example, candidate.splice(3,2) means I would omit two valuses from the forth value. In other words, the array is [1,2,3,6,7,8,9]

chooseNumber();
console.log(array);

const result = document.createElement('h1');
body.append(result);
const form = document.createElement('form');
body.append(form);
const input = document.createElement('input');
form.append(input);
input.type = 'text';
input.maxLength = 4;
const button = document.createElement('button');
button.textContent = 'input';
form.append(button);

let wrongCount = 0;

form.addEventListener('submit', (event)=>{
    event.preventDefault();
    const answer = input.value;
    if(answer === array.join('')){ //array.join() = things are arranged like "a,b,c" / array.join('') = things are arranged like "abc"
        result.textContent = 'Good job';
        input.value = '';
        input.focus();
        chooseNumber();
        wrongCount = 0;
    } else {
        const answerArray = answer.split(''); // .split('') = you would split the target in terms of each part. ex)a,b,c,d,e,f,g' / .split(' ') = you would split the target in terms of space. ex)'abc def ghi' 
        let strike = 0;
        let ball = 0;
        wrongCount +=1;
        if(wrongCount >10){
            result.textContent = `You can't continue this game. The answer is ${array.join(',')}`; 
            input.value = '';
            input.focus();
            chooseNumber();
            wrongCount=0;
        } else { //If the number of wrong answer is less than 10 times
            for(let i =0; i<=3; i +=1){
                if(Number(answerArray[i]) === array[i]){ //If the 'i'th number of your answer is equal to the 'i'th number of true answer,
                    strike +=1;
                }else if(array.indexOf(Number(answerArray[i])) > -1){
                    ball +=1;
                }
            }
            result.textContent = `${strike}strike ${ball}ball`;
            input.value='';
            input.focus();
        }
    }
});