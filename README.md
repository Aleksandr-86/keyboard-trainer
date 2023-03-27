<h3 align="center">
Клавиатурный тренажёр
</h3>

<p align="center">
  <a href="https://vuejs.org/">
    <img src="https://img.shields.io/badge/Vue-3.2.37-blue?style=plastic&logo=vuedotjs"/>
  </a>
  <a href="https://vitejs.dev/">
    <img src="https://img.shields.io/badge/Vite-3.0.0-blue?style=plastic&logo=vite"/>
  </a>
  <a href="https://prettier.io/">
    <img src="https://img.shields.io/badge/Prettier-2.6.0-blue?style=plastic&logo=prettier"/>
  </a>
  <a href="https://eslint.org/">
    <img src="https://img.shields.io/badge/ESLint-8.11.0-blue?style=plastic&logo=eslint"/>
  </a>
</p>

<div align="center">
  <a href="https://aleksandr-86.github.io/keyboard-trainer/">
    <img src="https://user-images.githubusercontent.com/96790009/227899478-5f3bd741-d642-4431-af73-d15dc4657346.png"/>
  </a>
</div>

### Описание:

Небольшое приложение для тренировки набора текста с выводом статистики по набору. Управление состоянием осуществляется без библиотек вроде `Pinia` или `Vuex` за счёт реактивных переменных хранимых в отдельных файлах папки `store`

### Установка и запуск:

`npm i` - установка необходимых пакетов  
`npm run dev` - запуск сервера для разработки  
`npm run build` - сборка проекта  
`npm run preview` - предварительный просмотр собранного проекта

### Особенности:

- Набор отрывка из книги (на русском или английском языке) или буфера обмена.
- Текущая и общая статистика набора.
- Разноцветные указатели положения пальцев.
- Настройки позволяющие изменить: состояния отображения элементов, фон, цвета, громкость набора и т.п.
- Локальное сохранение настроек (Local Storage)
