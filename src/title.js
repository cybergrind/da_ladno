import _ from 'lodash';


let titles = [
    'Блог Русского Человека',
    'Гордый Ковровчанин',
    'Я мамина лапа',
];


export function getTitle(){
    let title = _.sample(titles);
    document.title = title;
    return title;
}
