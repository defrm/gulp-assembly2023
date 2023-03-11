const {src, dest, watch} = require('gulp');

const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');

//Настройка css
function styles () {
    return src('app/scss/style.scss')
    .pipe (concat('style.min.css'))  //concat - переименовывает файлы
    .pipe(scss({outputStyle: 'compressed'}))  //scss(встроенная ф-ция) - минифицирует код
    .pipe(dest('app/css'))
}

//Автоматизация
function watching () {
    watch (['app/scss/style.scss'], styles)  //Отслиживать файл style.scss и запускать styles

}

//Запуск
exports.styles = styles;
exports.watching = watching;