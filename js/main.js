var counter = 0;
var before = 0;
var secondClick = false; // Вторая карточка?
var lastCard; // Индекс предыдущей карточки
var answers = new Array(12); // Массив для ответов
var cardcounter = 0;
function ShowCard(elem){
    $(elem).css('background-image', 'url(img/'+(answers[$(elem).index()]+1)+'.png)');
}
function Random(mass){
    let r = Math.round(Math.random() * (11 - 0) + 0); // Выбираем рандомный элемент массива от 11 до 0
    if(mass[r]==undefined){
        return r; // Если элемент не задан(undefined) то возвращаем выбраный
    }
        return Random(mass); // Если задан, возвращаемся в начало функции
}
function HideCard(){
    $('.card').css('background-image','');
}
function DeleteCard(card, cardt){
    setTimeout(function(){
    $('.card').eq(card).addClass('card--invisible');
    $('.card').eq(cardt).addClass('card--invisible');
     cardcounter++;
     if(cardcounter == 6){
        $.each(answers, function(index){answers[index]=undefined});
        $('.card--invisible').removeClass('card--invisible');
        counter = 0;
        Game();
        cardcounter = 0;
    }
    }, 400);
}
function Game(){
    $.each(answers, function(index,elem){
        answers[Random(answers)] = counter; //К выбранному с помощью функции элементу присваиваем ответ
        counter = (index != 0 && index % 2 != 0) ? counter+1:counter; 
    });
    HideCard();
}
$(document).ready(function(){
    Game();
    $('.card').click(function() {
        ShowCard(this);
        if (secondClick) {
            if (answers[lastCard]==answers[$(this).index()]) {
                DeleteCard(lastCard, $(this).index()); 
            } else {
                setTimeout(HideCard, 400);
            }
        } else {
            lastCard = $(this).index();
        }
        secondClick = !secondClick;
    });
});