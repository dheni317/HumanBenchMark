const Icon = document.querySelector(".Icon");
const Game = document.querySelector(".Game");
const Title = document.querySelector(".Title");
const Content = document.querySelector(".Content");
const Result = document.querySelector(".Result");
const ResultText = document.querySelector(".ResultText");
const RestartButton = document.querySelector(".RestartButton");
const SaveRecordButton = document.querySelector(".SaveRecordButton");


let step = 0;
let ClickTimer = 0;
let StartTime = 0;
let RecordTime = 0;
let Record = [];

RestartButton.addEventListener('click',Reset);

Game.addEventListener("click", () => {
    switch (step) {
        case 0:
            prepare();
            break;
        case 1:
            FastClick();
            break;
        case 2:
            ResultClick();
            break;
        case 3:
            prepare();
            break;
    }
})



function prepare() {
    step = 1;
    Icon.src = "./img/threedot.png";
    Game.classList.add("Red");
    Title.innerHTML = "기다리세요";
    Content.classList.add("Hidden");
    ClickTimer = setTimeout(WaitClick, (Math.random() * 4000) + 2000);
}

function WaitClick() {
    step = 2;
    Game.classList.add("Green");
    Game.classList.remove("Red");
    Title.innerHTML = "클릭!";
    const now = new Date();
    StartTime = now.getTime();
}

function ResultClick() {
    step = 3;
    const now = new Date();
    RecordTime = now.getTime();
    Record.push(RecordTime - StartTime);
    if(Record.length == 5)
    {
        PrintResult();
        return;
    }
    Game.classList.remove("Green");
    Icon.src = "./img/clock.png";
    Title.innerHTML = `${RecordTime - StartTime}ms`
    Content.innerHTML = "클릭하면 다시!"
    Content.classList.remove("Hidden");

}

function FastClick() {
    step = 3;
    Game.classList.remove("Red");
    Icon.src = "./img/warning.png";
    Title.innerHTML = "초록색이 되면 클릭하세요";
    Content.innerHTML = "클릭하면 다시!"
    Content.classList.remove("Hidden");
    clearTimeout(ClickTimer);
}

function Reset() {
    step = 0;
    Icon.src = "./img/thunder.png";
    Title.innerHTML = "반응속도 테스트"
    Content.innerHTML = "화면이 초록색이 되면 빠르게 클릭하세요"
    Result.classList.add('Hidden');
    Game.classList.remove('Hidden');
    Record = [];
    Game.classList.remove("Red");
    Game.classList.remove("Green");

}

function PrintResult() {
    Game.classList.add('Hidden');
    Result.classList.remove('Hidden');
    ResultText.innerHTML = `${Record.reduce((a, b) => { return a + b }) / 5}ms`;
}
