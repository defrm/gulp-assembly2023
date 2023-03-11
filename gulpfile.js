const {src, dest, watch, parallel} = require('gulp');

const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();

//Настройка css
function styles () {
    return src('app/scss/style.scss')  //Найти файл style.scss
    .pipe (concat('style.min.css'))  //concat - переименовывает файлы
    .pipe(scss({outputStyle: 'compressed'}))  //scss - препроцессор. Встроенная в него ф-ция минифицирует код. Получили style.min.css
    .pipe(dest('app/css'))  //Переместить файл style.min.css
    .pipe(browserSync.stream());  //Обновить страницу
}

//Автоматизация
function watching () {
    watch (['app/scss/style.scss'], styles)  //Отслиживать файл style.scss и запускать styles
    watch (['app/**/*.html']).on('change', browserSync.reload);  //Отслеживать все файлы html во всех папках (/**/*.html)
}

function browsersync() {
    browserSync.init({
        server: {
            baseDir: "app/"   //Отслеживаем и обновляем директорию app
        }
    });
}

//Запуск
exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;

//task по дефолту
exports.default = parallel(styles, browsersync, watching);