const {src, dest, watch, parallel, series} = require('gulp');

const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');

//Настройка css
function styles () {
    return src('app/scss/style.scss')  //Найти файл style.scss
    .pipe (autoprefixer({overrideBrowserslist: ['last 10 version']}))  //с autoprefixer опцией overrideBrowserslist
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

//Удаление папки dist
function cleanDist () {
    return src('dist')
    .pipe(clean())
}

// Переносим файлы в dist
function building () {
    return src([
        'app/css/style.min.css',  //забираем файл
        // js
        'app/**/*.html',  // html
    ], {base: 'app'})  //сохранить базовую структуру (создать папки css js итд как у нас)
    .pipe(dest('dist'))
}

//Запуск
exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;

// exports.building = building;
exports.build = series(cleanDist, building);   //объединем в одну. serias-отвечает за последовательное выполнение тасков

//task по дефолту
exports.default = parallel(styles, browsersync, watching);