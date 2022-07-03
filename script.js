let firstNum;
let secondNum;
let thirdNum;
let CheckAnswer;
let AnswerText;
let alterPut1;
let alterPut2;
let score = 0;
let highscore = 0;
let temp = 0;
let round = 0;


const question = document.querySelector(".question");
const choice_1 = document.getElementById("choice-1");
const choice_2 = document.getElementById("choice-2");
const choice_3 = document.getElementById("choice-3");
const scoreAdd = document.querySelector(".score");

const result = document.querySelector(".result");
const next = document.querySelector(".next");
const start = document.querySelector(".start");
const choice = document.querySelectorAll(".choice");


numberGenerator = () =>{
    let RandomTwoPicker = [];
    for (let j = 0; j < 2; j++) {
        thirdNum = Math.trunc(Math.random() * 2);
        RandomTwoPicker[j] = thirdNum;
    }

    firstNum = Math.trunc(
        (Math.random() * 25 + 2) * (Math.round(Math.random()) ? 1 : -1)
    );

    secondNum = Math.trunc(
        (Math.random() * 21 + 8) * (Math.round(Math.random()) ? 1 : -1)
    );

    if (RandomTwoPicker[0] === 0) {
        CheckAnswer = firstNum + secondNum;
        AnswerText = `${firstNum} + ${secondNum}`;
    } else {
        CheckAnswer = firstNum - secondNum;
        AnswerText = `${firstNum} - ${secondNum}`;
    }
    question.textContent = AnswerText;
}
alter_answer = () =>{
    let random;
    let alterAnswer;

    random= Math.trunc(Math.random() * 5);
    console.log(random);
    switch(random){
        case 0:{
            alterAnswer = CheckAnswer*-1;
            if(CheckAnswer==alterAnswer){
                alterAnswer= alterAnswer-2;
            }
            console.log(alterAnswer);
            return alterAnswer;
        }
        case 1:{
            alterAnswer = firstNum + secondNum;
            if(CheckAnswer==alterAnswer){
                alterAnswer= alterAnswer+2;
            }
            console.log(alterAnswer);
            return alterAnswer;
        }
        case 2:{
            alterAnswer = (firstNum*-1) + secondNum;
            if(CheckAnswer==alterAnswer){
                alterAnswer= alterAnswer-1;
            }
            console.log(alterAnswer);
            return alterAnswer;
        }
        case 3:{
            alterAnswer = (CheckAnswer-1)*-1;
            if(CheckAnswer==alterAnswer){
                alterAnswer= alterAnswer+1;
            }
            console.log(alterAnswer);
            return alterAnswer;
        }
        case 4:{
            alterAnswer = firstNum - secondNum-1;
            if(CheckAnswer==alterAnswer){
                alterAnswer= alterAnswer+2;
            }
            console.log(alterAnswer);
            return alterAnswer;
        }
    }
}

function number_randomizer(c1,c2,c3){
    let alter1 = alter_answer();
    let alter2 = alter_answer();
    if(alter1 == alter2){
        number_randomizer(c1,c2,c3);
    }else{
        answer_alter(c1,c2,c3,alter1,alter2);
    }
};

answer_alter = (c1,c2,c3,alter_1, alter_2) =>{
    c1.textContent=CheckAnswer; 
    c2.textContent= alter_1;
    c3.textContent= alter_2;
};
choiceClassAdder = (c1, c2, c3) =>{
    c1.classList.add("correct-answer");
    c2.classList.add("wrong-answer1");
    c3.classList.add("wrong-answer2");
    answerHandleEvent(c1,c2,c3);

};
answerHandleEvent = (c1,c2,c3) =>{
    let questions = document.querySelector(".questions");
    let text = c1.innerHTML; 

    questions.disabled=true;
    c1.addEventListener("click", ()=>{
        if(text == CheckAnswer){
            score++;
            temp = score;
            console.log("score clicked "+score)
            questions.classList.remove("header-wrong");
            questions.classList.add("header-correct");
            choice.forEach(choice =>{
                choice.classList.remove("header-correct");
                choice.classList.remove("header-wrong");
            })
            c1.classList.add("header-correct");
            result.textContent="correct";
            scoreAdd.textContent = `score: ${score}`;
            next.disabled = false;
            c3.disabled = true;
            c2.disabled = true;
            c1.disabled = true;
        }
    });
    c2.addEventListener("click", ()=>{
        if(true){
            questions.classList.remove("header-correct");
            questions.classList.add("header-wrong");
  
            choice.forEach(choice =>{
                choice.classList.remove("header-correct");
                choice.classList.remove("header-wrong");
            })
            c2.classList.add("header-wrong");
            c1.classList.add("header-correct");
            result.textContent="wrong";
            scoreAdd.textContent = `score: ${temp}`;
            next.disabled = false;
            c2.disabled = true;
            c3.disabled = true;
            c1.disabled = true;
        }
    });
    c3.addEventListener("click", ()=>{
        if(true){

            questions.classList.remove("header-correct");
            questions.classList.add("header-wrong");


            choice.forEach(choice =>{
                choice.classList.remove("header-correct");
                choice.classList.remove("header-wrong");
            })
            c3.classList.add("header-wrong");
            c1.classList.add("header-correct");
            result.textContent="wrong";
            scoreAdd.textContent = `score: ${temp}`;
            next.disabled = false;
            c2.disabled = true;
            c3.disabled = true;
            c1.disabled = true;
        }
    });
}
endGame = () =>{
    if(round == 11){
        question.textContent = `Game Finish`;
        result.textContent = `Score: ${score}/${round-1}`;
        highscore = score;
        round = 0;
        score = 0;
        scoreAdd.textContent = `YEHEY`;
        start.textContent ="Start again";
        next.disabled = true;
        start.disabled = false;
        choice.forEach(choice =>{
            choice.disabled = true;
            choice.textContent = ""
        });
        start.style.display = "inline-block";
        next.style.display= "none";
        choice.forEach(choice =>{
            choice.style.display="none";
        });
    }
};
answer_loader = () =>{
    let random;
    random= Math.trunc(Math.random() * 3);
    switch(random){
        case 0: {  
            numberGenerator();
            number_randomizer(choice_1,choice_2,choice_3)
            choiceClassAdder(choice_1,choice_2,choice_3);
            break;
        }
        case 1: {
            numberGenerator();
            number_randomizer(choice_2,choice_1,choice_3)
            choiceClassAdder(choice_2,choice_1,choice_3);
            break;
        }
        case 2: {   
            numberGenerator();   
            number_randomizer(choice_3,choice_1,choice_2)  
            choiceClassAdder(choice_3,choice_1,choice_2); 
            break;
        }
    }   
};
next.addEventListener("click", ()=>{
    round++
    result.textContent="";
    let questions = document.querySelector(".questions");
    start.disabled=true;
    next.disabled=true;
    choice.forEach(choice =>{
        choice.disabled=false;
        choice.classList.remove("correct-answer");
        choice.classList.remove("wrong-answer1");
        choice.classList.remove("wrong-answer2");
        choice.classList.remove("header-correct");
        choice.classList.remove("header-wrong");
    })
    questions.classList.remove("header-correct");
    questions.classList.remove("header-wrong");
    answer_loader();
    endGame();
});
start.addEventListener("click", ()=>{
    round++
    score = 0;
    scoreAdd.style.display= "block";
    scoreAdd.textContent = `score: ${score}`;
    result.textContent="";
    start.textContent = "start";
    start.style.display = "none";
    let questions = document.querySelector(".questions");
    next.disabled=true;
    start.disabled=true;
    next.style.display ="inline-block";
    choice.forEach(choice =>{
        choice.style.display="block";
    });
    choice.forEach(choice =>{
        choice.disabled=false;
        choice.classList.remove("correct-answer");
        choice.classList.remove("wrong-answer1");
        choice.classList.remove("wrong-answer2");
        choice.classList.remove("header-correct");
        choice.classList.remove("header-wrong");
    })
    questions.classList.remove("header-correct");
    questions.classList.remove("header-wrong");
    answer_loader();
    endGame();
});



