# Профильное задание для стажировки

## Описание проекта:
— сайт, на котором пользователь может просматривать посты, смотреть "подробную" информацию о них, а также комментировать и обсуждать с другими пользователями.

## Технологии:

- Python 3.9
- React
- Django REST Framework

## Запуск проекта:
- Клонируем репозиторий:
```angular2html
git clone git@github.com:blwolhppt/vk.git
```

### Работа с backend:
- Устанавливаем виртуальное окружение:
```angular2html
python -m venv venv
```
- Активируем виртуальное окружение:
```angular2html
source venv/Scripts/activate
```
- Устанавливаем все зависимости из файла requirements.txt:
```angular2html
pip install -r requirements.txt
```
- Устанавливаем все зависимости из файла requirements.txt:
```angular2html
pip install -r requirements.txt
```
- Запускаем backend-часть:
```angular2html
python manage.py runserver
```

### Работа с frontend:

- Переходим в директорию frontend:
```angular2html
cd frontend
```
- Устанавливаем npm:
```angular2html
npm install
```
- Запускаем frontend-часть:
```angular2html
npm start
```

## Admin-зона
Данные для входа в админ-зону:
> username: admin
 
> password: admin


## Дополнительные комментарии по реализации

Я реализовала веб-сервис, в который только админы могут добавлять посты и всю необходимую информацию о них. Обычные пользователи могут оставлять комментарии, но при этом им не нужна авторизация: они должны обязательно задать псевдоним (валидация для которого прописана со стороны backend), под которым их комментарий будет отображаться. Также пользователи могут отвечать другим, при этом будет отображаться ник пользователя, которому они отвечают. 

Рейтинг постов я реализовала с помощью подсчета кол-ва лайков и дизлайков, чтоб юзеры могли видеть не просто среднюю оценку, а еще и кол-во оценок. Мне кажется, это более показательный способ отразить статистику поста. Так как реализация авторизации и другой работы с пользователями не предусмотрена, то и соответственно нельзя проверить уникальность лайков и дизлайков. 

Основная страница :
_Символ ⭮ - принудительно обновляет страницу_
_Стрелочки ◄ и ► переключаются между страницами_
![image](https://github.com/blwolhppt/vk/assets/125132990/78214046-84f4-4cb1-b377-eea32aec0c35)
![image](https://github.com/blwolhppt/vk/assets/125132990/f9add571-a5b7-4978-902f-054b47ac09f0)

Страница поста с комментариями:
![image](https://github.com/blwolhppt/vk/assets/125132990/a715e2c9-6f22-4b1b-b12b-318d9fcf2e40)
![image](https://github.com/blwolhppt/vk/assets/125132990/200f6540-3a5a-4987-8a0d-0b2472dd886f)

Страница поста без комментариев:
![image](https://github.com/blwolhppt/vk/assets/125132990/5ee935f1-43c9-4f5d-858f-7cf7750a0389)

## Автор проекта: Белова Ольга
