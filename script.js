//Global Variables
let firstNum;
let secondNum;
let CheckAnswer;
let AnswerText;
let score = 0;
let highscore = 0;
let round;
let mode;

let questions = document.querySelector(".questions");
const question = document.querySelector(".question");
const choice_1 = document.getElementById("choice-1");
const choice_2 = document.getElementById("choice-2");
const choice_3 = document.getElementById("choice-3");
const scoreAdd = document.querySelector(".score");
const result = document.querySelector(".result");
const next = document.querySelector(".next");
const start = document.querySelector(".start");
const easy = document.querySelector(".easy");
const medium = document.querySelector(".medium");
const hard = document.querySelector(".hard");
const mix = document.querySelector(".mix");
const difficulty = document.querySelector(".difficulty");
const choice = document.querySelectorAll(".choice");

answerPlacer = (num) =>{
    let random = Math.trunc((Math.random() * 4 +1) * (Math.round(Math.random()) ? 1 : -1)); 
    switch(num){
        case 0:{
            CheckAnswer = firstNum + secondNum;
            AnswerText = `${firstNum} + ${secondNum}`;
            break;
        }
        case 1:{
            CheckAnswer = firstNum + secondNum;
            AnswerText = `${firstNum} + ${secondNum}`;
            break;
        }
        case 2:{
            CheckAnswer = random + (firstNum - secondNum);
            AnswerText = `${random}+(${firstNum}-${secondNum})`;
            break;
        }
        case 3:{
            CheckAnswer = random - (firstNum - secondNum);
            AnswerText = `${random}-(${firstNum}-${secondNum})`;
            break;
        }
        case 4:{
            CheckAnswer = random * (firstNum + secondNum);
            AnswerText = `${random}*(${firstNum}+${secondNum})`;
            break;
        }
        case 5:{
            CheckAnswer = random * (firstNum - secondNum);
            AnswerText = `${random}*(${firstNum}-${secondNum})`;
            break;
        }
    }
}
numberGenerator = (num1,num2) =>{
    return Math.trunc((Math.random() * num1 + num2) * (Math.round(Math.random()) ? 1 : -1));
};
numberFunction = (num1,num2,num3,num4,randomizer,randomizer1) =>{
    firstNum = numberGenerator(num1,num2);
    secondNum = numberGenerator(num3,num4);
    let num = Math.trunc(Math.random() * randomizer + randomizer1);
    answerPlacer(num);
    question.textContent = AnswerText;
};
questionGenerator = () =>{
    console.log(mode);
    if(mode == "easy") numberFunction(26,3,18,15,2,0);  
    else if(mode == "medium") numberFunction(13,2,15,8,1,2);
    else if(mode == "hard") numberFunction(5,3,12,5,1,4);
    else if(mode == "mix") numberFunction(16,5,18,5,5,0); 
}
alter_answer = () =>{
    let random;
    let alterAnswer;

    random= Math.trunc(Math.random() * 4);
    console.log(random);
    switch(random){
        case 0:{
            alterAnswer = CheckAnswer*-1;
            if(CheckAnswer==alterAnswer){
                alterAnswer= alterAnswer-2;
            }
            return alterAnswer;
        }
        case 1:{
            alterAnswer =  secondNum + firstNum ;
            if(CheckAnswer==alterAnswer){
                alterAnswer= alterAnswer+2;
            }
            return alterAnswer;
        }
        case 2:{
            alterAnswer = (firstNum*-1) + secondNum;
            if(CheckAnswer==alterAnswer){
                alterAnswer= alterAnswer-1;
            }
            return alterAnswer;
        }
        case 3:{
            alterAnswer = firstNum + (secondNum*-1);
            if(CheckAnswer==alterAnswer){
                alterAnswer= alterAnswer+2;
            }
            return alterAnswer;
        }
    }
}
function number_randomizer(c1,c2,c3){
    questionGenerator();
    let alter1 = alter_answer();
    let alter2 = alter_answer();
    if(alter1 == alter2){
        number_randomizer(c1,c2,c3);
    }else{
        choiceClassAdder(c1,c2,c3,alter1,alter2);
    }
};
choiceClassAdder = (c1, c2, c3,alter_1, alter_2) =>{
    c1.textContent=CheckAnswer; 
    c2.textContent= alter_1;
    c3.textContent= alter_2;
    answerHandleEvent(c1,c2,c3);
};
handleFunction = (c1,result1,class1, class2) =>{
        questions.classList.remove(class2);
        questions.classList.add(class1);
        choice.forEach(choice =>{
            choice.classList.remove("header-correct");
            choice.classList.remove("header-wrong");
            choice.disabled = true;
        })
        c1.classList.add("header-correct");
        result.textContent=result1;
        scoreAdd.textContent = `score: ${score}`;
        next.disabled = false;
};
answerHandleEvent = (c1,c2,c3) =>{
    let text = c1.innerHTML; 
    let text1 = c2.innerHTML;
    let text2= c3.innerHTML;
    questions.disabled=true;
    c1.addEventListener("click", ()=>{
        if(text == CheckAnswer){
            score++;
            result.textContent="correct";
            scoreAdd.textContent = `score: ${score}`;
            console.log("score clicked "+score);
            handleFunction(c1,"correct","header-correct","header-wrong");
        }
    });
    c2.addEventListener("click", ()=>{
        if(text1 != CheckAnswer){
            handleFunction(c1,"wrong","header-wrong","header-correct");
            c2.classList.add("header-wrong");
        }
    });
    c3.addEventListener("click", ()=>{
        if(text2 != CheckAnswer){
            handleFunction(c1,"wrong","header-wrong","header-correct");
            c3.classList.add("header-wrong");
        }
    });
}
endGame = () =>{
    if(round == 11){
        question.textContent = `Quiz Finish`;
        result.textContent = `Score: ${score}/${round-1}`;
        scoreAdd.textContent = " ";
        start.textContent ="Start again";
        next.disabled = true;
        start.disabled = false;
        choice.forEach(choice =>{
            choice.disabled = true;
            choice.textContent = "";
            choice.style.display="none";
        });
        start.style.display = "inline-block";
        next.style.display= "none";
    }
};
answer_loader = () =>{
    let random;
    random= Math.trunc(Math.random() * 3);
    switch(random){
        case 0: {  
            number_randomizer(choice_1,choice_2,choice_3)
            break;
        }
        case 1: {
            number_randomizer(choice_2,choice_1,choice_3)
            break;
        }
        case 2: {   
            number_randomizer(choice_3,choice_1,choice_2)  
            break;
        }
    }   
};
starter= () =>{
    difficulty.style.display = "none";
    start.textContent = "start";
    scoreAdd.style.display= "block";
    scoreAdd.textContent = `score: ${score}`;
    next.style.display ="inline-block";
}
gameLoader = () => {
    round++;
    result.textContent="";
    next.disabled=true;
    choice.forEach(choice =>{
        choice.disabled=false;
        choice.setAttribute("class","choice");
        choice.style.display = "block";
    })
    questions.setAttribute("class","questions");
    answer_loader();
    endGame();
};
next.addEventListener("click", ()=>{
    gameLoader();
});
start.addEventListener("click", ()=>{
    round = 0;
    score = 0;
    start.style.display = "none";
    difficulty.style.display = "flex";
    easy.style.display="block";
    medium.style.display="block";
    hard.style.display="block";
    mix.style.display="block";
});

easy.addEventListener("click", ()=>{
    mode = "easy";
    starter();
    gameLoader();
});
medium.addEventListener("click", ()=>{
    mode = "medium";
    starter();
    gameLoader();
});
hard.addEventListener("click", ()=>{
    mode = "hard";
    starter();
    gameLoader();
});
mix.addEventListener("click", ()=>{
    mode = "mix";
    starter();
    gameLoader();
});




