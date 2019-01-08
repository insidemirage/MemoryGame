var counter = 0;
var before = 0;
var clickcounter = 0; // Число сделанных кликов
var lastcard; // Индекс предыдущей карточки
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
    $('.card').eq(card).css('opacity','0'); //Функция просто скрывает элемент(это позволяет избежать сдвигов)
    $('.card').eq(cardt).css('opacity','0');
}
$(document).ready(function(){
    
    var answers = new Array(12); // Массив для ответов
    $.each(answers, function(index,elem){
        answers[Random(answers)] = counter; //К выбранному с помощью функции элементу присваиваем ответ
        if(index != 0 && index % 2 != 0 ){ // Если номер элемента не 0 и является нечетным(каждый второй элемент), то увеличиваем счетчик
            counter++;
       }
    });
    console.log(answers);
    $('.card').click(function(){
        clickcounter++;
        if(clickcounter==2){ // Если произошел клик на второй карте
            clickcounter = 0;
            if(answers[lastcard]==answers[$(this).index()]) DeleteCard(lastcard, $(this).index()); //Если совпали , то удаляем карточки 
        }
        else{
            lastcard = $(this).index(); // Сброс предыдущей карты

        }
    });
});