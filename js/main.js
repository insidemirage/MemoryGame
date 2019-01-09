var counter = 0;
var before = 0;
var secondClick = false; // Вторая карточка?
var lastCard; // Индекс предыдущей карточки
function Random(mass){
    let r = Math.round(Math.random() * (11 - 0) + 0); // Выбираем рандомный элемент массива от 11 до 0
    if(mass[r]==undefined){
        return r; // Если элемент не задан(undefined) то возвращаем выбраный
    }
    else{
        return Random(mass); // Если задан, возвращаемся в начало функции
    }
}
function DeleteCard(card, cardt){
    setTimeout(function(){
    $('.card').eq(card).addClass('card--invisible');
     $('.card').eq(cardt).addClass('card--invisible');
    }, 400);
}
$(document).ready(function(){

    var answers = new Array(12); // Массив для ответов
    $.each(answers, function(index,elem){
        answers[Random(answers)] = counter; //К выбранному с помощью функции элементу присваиваем ответ
        if(index != 0 && index % 2 != 0 ){ // Если номер элемента не 0 и является нечетным(каждый второй элемент), то увеличиваем счетчик
            counter++;
       }
    });
    $('.card').click(function() {
        if (secondClick) {
            if (answers[lastCard]==answers[$(this).index()]) {
                $(this).css('background-image', 'url(img/'+(answers[$(this).index()]+1)+'.png)');
                DeleteCard(lastCard, $(this).index());
            } else {
                $(this).css('background-image', 'url(img/'+(answers[$(this).index()]+1)+'.png)')
                setTimeout(function() {
                    $('.card').css('background-image','');
                }, 400);
            }
        } else {
            lastCard = $(this).index();
            let img = answers[lastCard]+1;
            $(this).css('background-image', 'url(img/'+img+'.png)')
        }
        secondClick = !secondClick;
    });
});