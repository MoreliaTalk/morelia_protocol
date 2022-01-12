# Официальная документация протокола MTP

Актуально на: **12.01.2022**

Версия протокола: **1.0** Редакция протокола: **1.17**

MTP (MoreliaTalk protocol) создан для унификации взаимодействия между клиентом и сервером в MoreliaTalk Network.
Интерфейс взаимодействия реализован через вебсокеты. Приложения общаются между собой путём отправки JSON-файла со структурой описанной ниже.

Содержание:

- [Официальная документация протокола MTP](#официальная-документация-протокола-mtp)
  - [Описание API](#описание-api)
    - [Поле type](#поле-type)
    - [Поле data](#поле-data)
    - [Поле flow](#поле-flow)
    - [Поле message](#поле-message)
    - [Поле user](#поле-user)
    - [Поле errors](#поле-errors)
    - [Поле jsonapi](#поле-jsonapi)
    - [Поле meta](#поле-meta)
  - [Пример JSON-объекта](#пример-json-объекта)
  - [Описание методов](#описание-методов)
    - [Метод register_user](#метод-register_user)
    - [Метод get_update](#метод-get_update)
    - [Метод send_message](#метод-send_message)
    - [Метод all_messages](#метод-all_messages)
    - [Метод add_flow](#метод-add_flow)
    - [Метод all_flow](#метод-all_flow)
    - [Метод user_info](#метод-user_info)
    - [Метод authentication](#метод-authentication)
    - [Метод delete_user](#метод-delete_user)
    - [Метод delete_message](#метод-delete_message)
    - [Метод edited_message](#метод-edited_message)
    - [Метод ping_pong](#метод-ping_pong)
    - [Метод error](#метод-error)
  - [Описание ошибок](#описание-ошибок)
    - [Код 200 статус "Ok"](#код-200-статус-ok)
    - [Код 201 статус "Created"](#код-201-статус-created)
    - [Код 202 статус "Accepted"](#код-202-статус-accepted)
    - [Код 206 статус "Partial Content"](#код-206-статус-partial-content)
    - [Код 400 статус "Bad Request"](#код-400-статус-bad-request)
    - [Код 401 статус "Unauthorized"](#код-401-статус-unauthorized)
    - [Код 403 статус "Forbidden"](#код-403-статус-forbidden)
    - [Код 404 статус "Not Found"](#код-404-статус-not-found)
    - [Код 405 статус "Method Not Allowed"](#код-405-статус-method-not-allowed)
    - [Код 408 статус "Request Timeout"](#код-408-статус-request-timeout)
    - [Код 409 статус "Conflict"](#код-409-статус-conflict)
    - [Код 415 статус "Unsupported Media Type"](#код-415-статус-unsupported-media-type)
    - [Код 417 статус "Expectation Failed"](#код-417-статус-expectation-failed)
    - [Код 426 статус "Upgrade Required"](#код-426-статус-upgrade-required)
    - [Код 429 статус "Too Many Requests"](#код-429-статус-too-many-requests)
    - [Код 499 статус "Client Closed Request"](#код-499-статус-client-closed-request)
    - [Код 500 статус "Internal Server Error"](#код-500-статус-internal-server-error)
    - [Код 503 статус "Service Unavailable"](#код-503-статус-service-unavailable)
    - [Код 520 статус "Unknown Error"](#код-520-статус-unknown-error)
    - [Код 526 статус "Invalid SSL Certificate"](#код-526-статус-invalid-ssl-certificate)

## Описание API

Запросы между клиентом и сервером передаются в виде объекта сериализованного в строку с JSON-форматированием. В каждом запросе имеется ключ `type` значение которого является именем метода.

- Первая пара _ключ:значение_ (объект `type`) устанавливает тип метода. Клиент/сервер обрабатывают запрос в соответствии с именем метода. Значение ключа не может быть пустым или `null`.
- Вторая пара _ключ:значение_ (объект `data`) передает массив данных соответствующих запросу. В случае отсутствия данных, значение ключа `null`.
- Третья пара _ключ:значение_ (объект `errors`) передает информацию о статусе выполнения запроса. Значение ключа не может быть пустым или `null`.
- Четвёртая пара _ключ:значение_ (объект `jsonapi`) передает информацию об используемом протоколе. Значение ключа не может быть пустым или `null`.
- Пятая пара _ключ:значение_ (объект `meta`) резервная, для дальнейшего расширения протокола. В случае отсутствия данных, значение поля `null`.

Ниже описаны все возможные поля JSON-объекта.

### Поле type

В `type` передается тип метода. Значение в поле `type` не может быть пустым или `null`.

| Ключ | Тип | Обязательный (запрос / ответ) | Описание                                                                                                                                                                                                  |
|------|-----|-------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| type | str | Yes / Yes                     | Уникальное имя метода из следующего списка: all_flow, add_flow, all_messages, authentication, get_update, register_user, send_message, user_info, delete_user, delete_message, edited_message, ping_pong. |

### Поле data

В `data` передается основной массив информации. В случае отсутствия данных значение `data` должно быть `null`.

| Ключ    | Тип                      | Обязательный (запрос / ответ) | Описание                                                                     |
|---------|--------------------------|-------------------------------|------------------------------------------------------------------------------|
| time    | int                      | No / No                       | Время, в секундах со времени начала эпохи (Unix-время).                      |
| flow    | [flow](#поле-flow)       | No / No                       | Информация о потоке. Объект данных в виде списка содержащего словарь.        |
| message | [message](#поле-message) | No / No                       | Информация о сообщении. Объект данных в виде списка содержащего словарь.     |
| user    | [user](#поле-user)       | No / No                       | Информация о пользователе. Объект данных в виде списка содержащего словарь.  |
| meta    | Any                      | No / No                       | Зарезервировано. По умолчанию значение `null`.                               |

### Поле flow

Во `flow` передается полная информация о потоке (чате, канале, группе). Объект данных в виде списка содержащего словарь.

Всего существуют три типа потока:

- chat (2 пишут, 2 читают)
- channel (1 пишет, многие читают)
- group (многие пишут, многие читают)

| Ключ          | Тип       | Обязательный (запрос / ответ) | Описание                                                                                                                   |
|---------------|-----------|-------------------------------|----------------------------------------------------------------------------------------------------------------------------|
| uuid          | str       | Yes / Yes                     | Уникальный номер потока.                                                                                                   |
| time          | int       | No / No                       | Время создания потока, в секундах со времени начала эпохи (Unix-время).                                                    |
| type          | str       | No / No                       | Тип потока.                                                                                                                |
| owner         | str       | No / No                       | `uuid` создателя `flow`.                                                                                                   |
| users         | list[str] | No / No                       | Список пользователей, участников `flow`. Объект данных в виде списка содержащего `uuid` пользователей.                     |
| title         | str       | No / No                       | Персональное имя потока (может быть не уникальным).                                                                        |
| info          | str       | No / No                       | Описание потока (может быть не уникальным).                                                                                |
| message_start | int       | No / No                       | Начальный порядковый номер сообщения в потоке. Используется для загрузки сообщений "порциями".                             |
| message_end   | int       | No / No                       | Конечный порядковый номер сообщения в потоке (общее количество сообщений). Используется для загрузки сообщений "порциями". |

### Поле message

В `message` передается информация о сообщении.

| Ключ          | Тип   | Обязательный (запрос / ответ) | Описание                                                                                                             |
|---------------|-------|-------------------------------|----------------------------------------------------------------------------------------------------------------------|
| uuid          | str   | Yes / Yes                     | Уникальный номер сообщения.                                                                                          |
| client_id     | int   | Yes / No                      | Номер сообщения присваиваемый самим клиентом. Сервер не меняет этот номер, и после обработки возвращает его клиенту. |
| text          | str   | No / No                       | Текст сообщения.                                                                                                     |
| from_user     | str   | No / No                       | Уникальный номер пользователя который написал сообщение.                                                             |
| from_flow     | str   | No / No                       | Уникальный номер потока которому принадлежит сообщение.                                                              |
| time          | int   | No / No                       | Время когда сообщение было написано, в секундах со времени начала эпохи (Unix-время).                                |
| file_picture  | bytes | No / No                       | Файл-вложение к сообщению (фото).                                                                                    |
| file_video    | bytes | No / No                       | Файл-вложение к сообщению (видео).                                                                                   |
| file_audio    | bytes | No / No                       | Файл-вложение к сообщению (аудио).                                                                                   |
| file_document | bytes | No / No                       | Файл-вложение к сообщению (документ).                                                                                |
| emoji         | bytes | No / No                       | Тип емоджи (в виде файла).                                                                                           |
| edited_time   | int   | No / No                       | Время когда пользователь последний раз исправил сообщение, в секундах со времени начала эпохи (Unix-время).          |
| edited_status | bool  | No / No                       | Статус сообщения (исправлено или нет).                                                                               |

### Поле user

В `user` передается информация о пользователе, а так же его настройки.

| Ключ         | Тип   | Обязательный (запрос / ответ) | Описание                                                             |
|--------------|-------|-------------------------------|----------------------------------------------------------------------|
| uuid         | str   | No / No                       | Уникальный номер пользователя. Выдается сервером после регистрации.  |
| login        | str   | No / No                       | Логин пользователя.                                                  |
| username     | str   | No / No                       | Отображаемое имя пользователя.                                       |
| bio          | str   | No / No                       | Информация о пользователе.                                           |
| avatar       | bytes | No / No                       | Изображение пользователя.                                            |
| password     | str   | No / No                       | Пароль пользователя.                                                 |
| salt         | str   | No / No                       | Соль. Ключевое слово подмешиваемое к паролю при создании Хэш-пароля. |
| key          | str   | No / No                       | Дополнительный ключ для генерации хэш-пароля.                        |
| is_bot       | bool  | No / No                       | Указывает на тип пользователя (бот или человек).                     |
| auth_id      | str   | No / No                       | Токен аутентификации.                                                |
| email        | str   | No / No                       | Адрес почты пользователя.                                            |
| time_created | int   | No / No                       | Дата и время создания пользователя.                                  |

### Поле errors

В `errors` передается информация о результате выполнения запроса. Не может быть пустым.
Коды ошибок (и их статусы) соответствуют кодам протокола [HTTP](https://ru.wikipedia.org/wiki/%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA_%D0%BA%D0%BE%D0%B4%D0%BE%D0%B2_%D1%81%D0%BE%D1%81%D1%82%D0%BE%D1%8F%D0%BD%D0%B8%D1%8F_HTTP). Значения ключа `detail` предназначено для подробного разъяснения статуса выполнения запроса.

| Ключ   | Тип | Обязательный (запрос / ответ) | Описание                                                                       |
|--------|-----|-------------------------------|--------------------------------------------------------------------------------|
| code   | int | No / Yes                      | Код ошибки.                                                                    |
| status | str | No / Yes                      | Статус ошибки.                                                                 |
| time   | int | No / Yes                      | Время когда произошла ошибка, в секундах со времени начала эпохи (Unix-время). |
| detail | str | No / No                       | Подробное описание ошибки.                                                     |

### Поле jsonapi

В `jsonapi` передается версия протокола. Не может быть пустым.

| Ключ     | Тип | Обязательный (запрос / ответ) | Описание           |
|----------|-----|-------------------------------|--------------------|
| version  | str | Yes / Yes                     | Версия протокола.  |
| revision | str | No / No                       | Ревизия протокола. |

### Поле meta

Поле `meta` зарезервировано. В случае отсутствия данных значение поля `null`.

| Ключ | Тип | Обязательный (запрос / ответ) | Описание         |
|------|-----|-------------------------------|------------------|
| meta | Any | No / No                       | Зарезервировано. |

## Пример JSON-объекта

Содержание JSON-объекта, используются все возможные поля.

```javascript
{
    "type": "user_info",
        "data": {
            "time": 1594492370,
            "flow": [{
                "uuid": "1254",
                "time": 1594492370,
                "type": "chat",
                "title": "Name Chat",
                "info": "Info about this chat",
                "owner": "123456",
                "users": ["123456", "65478"],
                "message_start": 0,
                "message_end": 100
                },
                {...}],
            "message": [{
                "uuid": "1",
                "client_id": 123,
                "text": "some text...",
                "from_user": "1234567",
                "time": 1594492370,
                "from_flow": "123655455",
                "file_picture": "jkfikdkdsd",
                "file_video": "sdfsdfsdf",
                "file_audio": "fgfsdfsdfsdf",
                "file_document": "fghsfghsfgh",
                "emoji": "sfdfsdfsdf",
                "edited_time": 1594492370,
                "edited_status": true
                },
                {...}],
            "user": [{
                "uuid": "1234567",
                "login": "username1",
                "password": "lksdjflksjfsd",
                "salt": "salt",
                "key": "key",
                "username": "Vasya",
                "is_bot": true,
                "auth_id": "4646hjgjhg64",
                "email": "querty@querty.com",
                "avatar": "fffdddddd",
                "bio": "My bio",
                "time_created": 2542445821452
                },
                {...}],
            "meta": null
            },
        "errors": {
            "code": 200,
            "status": "OK",
            "time": 1594492370,
            "detail": "successfully"
            },
        "jsonapi": {
            "version": "1.0",
            "revision": "17"
            },
        "meta": null
        }
```

## Описание методов

Имя метода передается как значение поля `type` внутри объекта сериализованного как строка с JSON-форматированием.
Передача имени метода происходит как при запросе, так и при ответе. Ниже описаны примеры запросов и ответы на них.

_Примечание:_

- запрос в котором указан неподдерживаемый тип метода или вовсе отсутствует указание на тип метода вернёт ошибку [405 Method Not Allowed](#код-405-статус-method-not-allowed)
- запрос который не проходит валидацию вернёт ошибку [415 Unsupported Media Type](#код-415-статус-unsupported-media-type).

### Метод register_user

Метод позволяет зарегистрировать нового пользователя.

Пример запроса:

```javascript
{
    "type": "register_user",
    "data": {
        "user": [{
            "password": "ds45ds45fd45fd",
            "salt": "salt",
            "key": "key",
            "login": "User",
            "email": "querty@querty.com",
            "username": "User1"
            }],
        "meta": null
        },
    "jsonapi": {
        "version": "1.0",
        "revision": "17"
        },
    "meta": null
    }
```

Пример ответа (успех):

```javascript
{
    "type": "register_user",
    "data": {
        "time": 234345345435,
        "user": [{
            "uuid": "1234567",
            "auth_id": "35fg673g56fggfg735jg67"
            }],
        "meta": null
        },
    "errors": {
        "code": 201,
        "status": "CREATED",
        "time": 1594492370,
        "detail": "Created"
        },
    "jsonapi": {
        "version": "1.0",
        "revision": "17"
        },
    "meta": null
    }
```

Пример ответа (ошибка):

```javascript
{
    "type": "register_user",
    "data": null,
    "errors": {
        "code": 409,
        "status": "CONFLICT",
        "time": 1594492370,
        "detail": "Conflict"
        },
    "jsonapi": {
        "version": "1.0",
        "revision": "17"
        },
    "meta": null
    }
```

### Метод get_update

Позволяет получить от сервера обновление общедоступной информации (сообщений, чатов, пользовательских данных) за период от времени `time` до текущего времени.

Пример запроса:

```javascript
{
    "type": "get_update",
    "data": {
        "time": 1594492370,
        "user": [{
            "uuid": "1234567",
            "auth_id": "dks7sd9f6g4fg67vb78g65"
            }],
        "meta": null
        },
    "jsonapi": {
        "version": "1.0",
        "revision": "17"
        },
    "meta": null
    }
```

Пример ответа (успех):

```javascript
{
    "type": "get_update",
    "data": {
        "time": 23423535,
        "flow": [{
            "uuid": "1254",
            "time": 1594492370,
            "type": "chat",
            "title": "Name Chat",
            "info": "Info about this chat",
            "owner": "123456",
            "users": ["123456", "654789"]
            },
            {...}],
        "message": [{
            "uuid": "1",
            "client_id": null,
            "text": "some text...",
            "from_user": "1234567",
            "time": 1594492370,
            "from_flow": "123655455",
            "file_picture": "jkfikdkdsd",
            "file_video": "sdfsdfsdf",
            "file_audio": "fgfsdfsdfsdf",
            "file_document": "fghsfghsfgh"
            "emoji": "sfdfsdfsdf",
            "edited_time": 1594492370,
            "edited_status": true
            },
            {...}],
        "user": [{
            "uuid": "1234567",
            "username": "Vasya",
            "is_bot": true,
            "avatar": "fffdddddd",
            "bio": "My bio"
            },
            {...}],
        "meta": null
        },
    "errors": {
        "code": 200,
        "status": "OK",
        "time": 1594492370,
        "detail": "successfully"
        },
    "jsonapi": {
        "version": "1.0",
        "revision": "17"
        },
    "meta": null
    }
```

Пример ответа (ошибка):

```javascript
{
    "type": "get_update",
    "data": null,
    "errors": {
        "code": 401,
        "status": "Unauthorized",
        "time": 1594492370,
        "detail": "Unauthorized"
        },
    "jsonapi": {
        "version": "1.0",
        "revision": "17"
        },
    "meta": null
    }
```

### Метод send_message

Метод позволяет отправить сообщение в поток `flow`.
Для того чтобы сделать привязку отправленного клиентом сообщения с ответным `uuid` от сервера - клиент, в своём запросе __обязательно__ указывает сгенерированный им `client_id`. В случае успеха сервер возвращает в ответе `message` со значениями `uuid`, `from_user`, `from_flow` и неизменный `client_id`.

Пример запроса:

```javascript
{
    "type": "send_message",
    "data": {
        "flow": [{
            "uuid": "123"
            }],
        "message": [{
            "client_id": 1234,
            "text": "Hello!",
            "file_picture": b"jkfikdkdsd",
            "file_video": b"sdfsdfsdf",
            "file_audio": b"fgfsdfsdfsdf",
            "file_document": b"adgdfhfgth",
            "emoji": b"sfdfsdfsdf"
            }],
        "user": [{
            "uuid": "1234567",
            "auth_id": "dks7sd9f6g4fg67vb78g65"
            }],
        "meta": null
        },
    "jsonapi": {
        "version": "1.0",
        "revision": "17"
        },
    "meta": null
    }
```

Пример ответа (успех):

```javascript
{
    "type": "send_message",
    "data": {
        "time": 45346456,
        "message": [{
            "uuid": "858585",
            "client_id" 123,
            "from_user": "1234567",
            "from_flow": "123"
        }],
        "meta": null
    },
    "errors": {
        "code": 200,
        "status": "OK",
        "time": 1594492370,
        "detail": "successfully"
        },
    "jsonapi": {
        "version": "1.0",
        "revision": "17"
        },
    "meta": null
    }
```

Пример ответа (ошибка):

```javascript
{
    "type": "send_message",
    "data": null,
    "errors": {
        "code": 401,
        "status": "Unauthorized",
        "time": 1594492370,
        "detail": "Unauthorized"
        },
    "jsonapi": {
        "version": "1.0",
        "revision": "17"
        },
    "meta": null
    }
```

### Метод all_messages

Метод позволяет получить все сообщения в потоке `flow`, за период с начала времени `time` по настоящее время.
Сервер за один запрос выдаёт не более 100 сообщений, по порядку с учётом начального порядкового номера сообщения указанного в `message_start`.
Если в запросе будет отсутствовать `message_start` или количество сообщений больше 100 - сервер в ответе сообщит клиенту общее количество сообщений в ключе `message_end`.
Если количество сообщений в потоке больше чем лимит (100) в `errors` будет указываться статус "Partial Content" с кодом "206".

Пример запроса (отсутствуют `message_start` и `message_end`):

```javascript
{
    "type": "all_messages",
    "data": {
        "time": 1594492370,
        "flow": [{
            "uuid": "123"
            }],
        "user": [{
            "uuid": "1234567",
            "auth_id": "dks7sd9f6g4fg67vb78g65"
            }],
        "meta": null
        },
    "jsonapi": {
        "version": "1.0",
        "revision": "17"
        },
    "meta": null
    }
```

Пример запроса:

```javascript
{
    "type": "all_messages",
    "data": {
        "time": 1594492370,
        "flow": [{
            "uuid": "123",
            "message_start": 0,
            "message_end": 99
            }],
        "user": [{
            "uuid": "1234567",
            "auth_id": "dks7sd9f6g4fg67vb78g65"
            }],
        "meta": null
        },
    "jsonapi": {
        "version": "1.0",
        "revision": "17"
        },
    "meta": null
    }
```

Пример ответа (успех, до 100 сообщений):

```javascript
{
    "type": "all_messages",
    "data": {
        "flow": [{
            "uuid": "123"
            }],
        "message": [{
            "uuid": "1",
            "text": "some text...",
            "from_user": "1234567",
            "time": 1594492370,
            "from_flow": "123655455",
            "file_picture": "jkfikdkdsd",
            "file_video": "sdfsdfsdf",
            "file_audio": "fgfsdfsdfsdf",
            "file_document": "fghsfghsfgh"
            "emoji": "sfdfsdfsdf",
            "edited_time": 1594492370,
            "edited_status": true
            },
            {...}],
        "meta": null
        },
    "errors": {
        "code": 200,
        "status": "OK",
        "time": 1594492370,
        "detail": "successfully"
        },
    "jsonapi": {
        "version": "1.0",
        "revision": "17"
        },
    "meta": null
    }
```

Пример ответа (успех, более 100 сообщений):

```javascript
{
    "type": "all_messages",
    "data": {
        "flow": [{
            "uuid": "123",
            "message_end": 256
            }],
        "message": [{
            "uuid": "1",
            "text": "some text...",
            "from_user": "1234567",
            "time": 1594492370,
            "from_flow": "123655455",
            "file_picture": "jkfikdkdsd",
            "file_video": "sdfsdfsdf",
            "file_audio": "fgfsdfsdfsdf",
            "file_document": "fghsfghsfgh"
            "emoji": "sfdfsdfsdf",
            "edited_time": 1594492370,
            "edited_status": true
            }],
        "meta": null
        },
    "errors": {
        "code": 206,
        "status": "Partial Content",
        "time": 1594492370,
        "detail": "Information provided partially."
        },
    "jsonapi": {
        "version": "1.0",
        "revision": "17"
        },
    "meta": null
    }
```

Пример ответа (ошибка):

```javascript
{
    "type": "all_message",
    "data": null,
    "errors": {
        "code": 401,
        "status": "Unauthorized",
        "time": 1594492370,
        "detail": "Unauthorized"
        },
    "jsonapi": {
        "version": "1.0",
        "revision": "17"
        },
    "meta": null
    }
```

### Метод add_flow

Метод позволяет создать новый поток `flow`. При создании `flow` с типом `chat` в ключе `users` необходимо указать uuid двух пользователей.
При создании `flow` с любым типом ключ `owner` должен содержать uuid владельца этого `flow`.

Пример запроса (создание `group` и `channel`):

```javascript
{
    "type": "add_flow",
    "data": {
        "flow": [{
            "type": "chat",
            "title": "title",
            "info": "info",
            "owner": "123456",
            "users": ["12345", "65478"]
            }],
        "user": [{
            "uuid": "1234567",
            "auth_id": "auth_id"
            }],
        "meta": null
        },
    "jsonapi": {
        "version": "1.0",
        "revision": "17"
        },
    "meta": null
    }
```

Пример запроса (создание `chat`):

```javascript
{
    "type": "add_flow",
    "data": {
        "flow": [{
            "type": "chat",
            "title": "title",
            "info": "info",
            "owner": "123456",
            "users": ["123456", "654987"]
            }],
        "user": [{
            "uuid": "1234566",
            "auth_id": "auth_id"
            },
        "meta": null
        },
    "jsonapi": {
        "version": "1.0",
        "revision": "17"
        },
    "meta": null
    }
```

Пример ответа (успех):

```javascript
{
    "type": "add_flow",
    "data": {
        "time": 346456457567,
        "flow": [{
            "uuid": "5655",
            "time": 1594492370,
            "type": "chat",
            "title": "title",
            "info": "info",
            "owner": "123456",
            "users": ["123456", "654987"]
            }],
        "meta": null
        },
    "errors": {
        "code": 200,
        "status": "OK",
        "time": 1594492370,
        "detail": "successfully"
        },
    "jsonapi": {
        "version": "1.0",
        "revision": "17"
        },
    "meta": null
    }
```

Пример ответа (ошибка):

```javascript
{
    "type": "add_flow",
    "data": null,
    "errors": {
        "code": 401,
        "status": "Unauthorized",
        "time": 1594492370,
        "detail": "Unauthorized"
        },
    "jsonapi": {
        "version": "1.0",
        "revision": "17"
        },
    "meta": null
    }
```

### Метод all_flow

Метод позволяет получить от сервера перечень всех потоков `flow` которые зарегистрированы на сервере.

Пример запроса:

```javascript
{
    "type": "all_flow",
    "data": {
        "user": [{
            "uuid": "1234567",
            "auth_id": "dks7sd9f6g4fg67vb78g65"
            }],
        "meta": null
        },
    "jsonapi": {
        "version": "1.0",
        "revision": "17"
        },
    "meta": null
    }
```

Пример ответа (успех):

```javascript
{
    "type": "all_flow",
    "data": {
        "time": 345345345,
        "flow": [{
            "uuid": "5655",
            "time": 1594492370,
            "type": "chat",
            "title": "Some chat",
            "info": "Info from some chat"
            "owner": "123456",
            "users": ["123456", "654987"]
            },
            {...}]
        "meta": null
        },
    "errors": {
        "code": 200,
        "status": "OK",
        "time": 1594492370,
        "detail": "successfully"
        },
    "jsonapi": {
        "version": "1.0",
        "revision": "17"
        },
    "meta": null
    }
```

Пример ответа (ошибка):

```javascript
{
    "type": "all_flow",
    "data": null,
    "errors": {
        "code": 401,
        "status": "Unauthorized",
        "time": 1594492370,
        "detail": "Unauthorized"
        },
    "jsonapi": {
        "version": "1.0",
        "revision": "17"
        },
    "meta": null
    }
```

### Метод user_info

Метод позволяет клиенту получить от сервера информацию о своих настройках и настройках других пользователей.
При этом в ответе сервера содержится только та информация, которая пользователем разрешена к публикации, в настройках клиента.

В одном запросе можно указать не более 100 пользователей, если запрошено больше пользователей сервер возвратит ошибку.
Первый по очереди UUID должен принадлежать пользователю который делает запрос.

Пример запроса:

```javascript
{
    "type": "user_info",
    "data": {
        "user": [{
            "uuid": "1234567",
            "auth_id": "dks7sd9f6g4fg67vb78g65"
            },{
            "uuid": "1234568",
            },{
            "uuid": "1234569",
            }],
        "meta": null
        },
    "jsonapi": {
        "version": "1.0",
        "revision": "17"
        },
    "meta": null
    }
```

Пример ответа:

```javascript
{
    "type": "user_info",
    "data": {
        "time": 345345345,
        "user": [{
            "uuid": "1234568",
            "login": "tony95",
            "username": "Tony",
            "is_bot": false,
            "avatar": "fffdddddd",
            "bio": "My bio"
            },{
            "uuid": "1234569",
            "login": "maria_pele0",
            "username": "Marta",
            "is_bot": false,
            "avatar": "fffdddddd",
            "bio": "My bio"
            }],
        "meta": null
        },
    "errors": {
        "code": 200,
        "status": "OK",
        "time": 1594492370,
        "detail": "successfully"
        },
    "jsonapi": {
        "version": "1.0",
        "revision": "17"
        },
    "meta": null
    }
```

Пример ответа (ошибка):

```javascript
{
    "type": "user_info",
    "data": null,
    "errors": {
        "code": 401,
        "status": "Unauthorized",
        "time": 1594492370,
        "detail": "Unauthorized"
        },
    "jsonapi": {
        "version": "1.0",
        "revision": "17"
        },
    "meta": null
    }
```

Пример ответа (ошибка при запросе более 100 UUID):

```javascript
{
    "type": "user_info",
    "data": null,
    "errors": {
        "code": 429,
        "status": "Too Many Requests",
        "time": 1594492370,
        "detail": "Too much data has been requested"
        },
    "jsonapi": {
        "version": "1.0",
        "revision": "17"
        },
    "meta": null
    }
```

Пример ответа (ошибка при запросе 0 пользователей):

```javascript
{
    "type": "user_info",
    "data": null,
    "errors": {
        "code": 400,
        "status": "Bad Request",
        "time": 1594492370,
        "detail": "Bad Request"
        },
    "jsonapi": {
        "version": "1.0",
        "revision": "17"
        },
    "meta": null
    }
```

### Метод authentication

Метод позволяет клиенту пройти аутентификацию на сервере.
Сервер проверяет наличие логина и пароля в базе данных и если клиент с такими данными существует, в ответе указывается сгенерированный `auth_id` и присвоенный ранее `uuid`.


Пример запроса:

```javascript
{
    "type": "authentication",
    "data": {
        "user": [{
            "password": "ds45ds45fd45fd",
            "login": "User"
            }],
        "meta": null
        },
    "jsonapi": {
        "version": "1.0",
        "revision": "17"
        },
    "meta": null
    }
```

Пример ответа (успех):

```javascript
{
    "type": "authentication",
    "data": {
        "time": 2345345,
        "user": [{
            "uuid": "1234567",
            "auth_id": "lkds89ds89fd98fd"
            }],
        "meta": null
        },
    "errors": {
        "code": 200,
        "status": "OK",
        "time": 1594492370,
        "detail": "successfully"
        },
    "jsonapi": {
        "version": "1.0",
        "revision": "17"
        },
    "meta": null
    }
```

Пример ответа (ошибка):

```javascript
{
    "type": "authentication",
    "data": null,
    "errors": {
        "code": 401,
        "status": "Unauthorized",
        "time": 1594492370,
        "detail": "Unauthorized"
        },
    "jsonapi": {
        "version": "1.0",
        "revision": "17"
        },
    "meta": null
    }
```

### Метод delete_user

Метод позволяет клиенту удалить пользователя. При этом, сервер не удаляет запись о пользователе из БД, а делает замену следующим образом:

- содержимое полей `login` и `username` заменяется на "User deleted";
- содержимое полей: `salt`, `key`, `bio` заменяется на "deleted";
- содержимое полей `avatar` и `email` заменяется на пустое значение "";
- содержимое поля `password`, `hashPassword` и `auth_id` заменяется на случайным образом сгенерированное число размером 64 символа.

Пример запроса:

```javascript
{
    "type": "delete_user",
    "data": {
        "user": [{
            "uuid": "1234567",
            "password": "ds45ds45fd45fd",
            "salt": "salt",
            "key": "key",
            "login": "User",
            "auth_id": "jkfdjkfdjkf"
            }],
        "meta": null
        },
    "jsonapi": {
        "version": "1.0",
        "revision": "17"
        },
    "meta": null
    }
```

Пример ответа (успех):

```javascript
{
    "type": "delete_user",
    "data": null,
    "errors": {
        "code": 200,
        "status": "OK",
        "time": 1594492370,
        "detail": "successfully"
        },
    "jsonapi": {
        "version": "1.0",
        "revision": "17"
        },
    "meta": null
    }
```

Пример ответа (ошибка):

```javascript
{
    "type": "delete_user",
    "data": null,
    "errors": {
        "code": 401,
        "status": "Unauthorized",
        "time": 1594492370,
        "detail": "Unauthorized"
        },
    "jsonapi": {
        "version": "1.0",
        "revision": "17"
        },
    "meta": null
    }
```

### Метод delete_message

Метод позволяет клиенту удалить своё сообщение. При этом, сервер не удаляет сообщение из БД, а делает замену следующим образом:

- содержимое поля `text` заменяется на "Message deleted";
- содержимое полей: `filePicture`, `fileVideo`, `fileAudio`, `fileDocument`, `emoji` заменяется на пустое значение "";
- значение поля `editedTime` устанавливается равным текущему времени;
- значение поля `editedStatus` устанавливается равным `True`;

Пример запроса:

```javascript
{
    "type": "delete_message",
    "data": {
        "flow": [{
            "uuid": "123"
            }],
        "message": [{
            "uuid": "858585"
            }],
        "user": [{
            "uuid": "1234567",
            "auth_id": "lkds89ds89fd98fd"
            }],
        "meta": null
        },
    "jsonapi": {
        "version": "1.0",
        "revision": "17"
        },
    "meta": null
    }
```

Пример ответа (успех):

```javascript
{
    "type": "delete_message",
    "data": null,
    "errors": {
        "code": 200,
        "status": "OK",
        "time": 1594492370,
        "detail": "successfully"
        },
    "jsonapi": {
        "version": "1.0",
        "revision": "17"
        },
    "meta": null
    }
```

Пример ответа (ошибка):

```javascript
{
    "type": "delete_message",
    "data": null,
    "errors": {
        "code": 401,
        "status": "Unauthorized",
        "time": 1594492370,
        "detail": "Unauthorized"
        },
    "jsonapi": {
        "version": "1.0",
        "revision": "17"
        },
    "meta": null
    }
```

### Метод edited_message

Метод позволяет клиенту отредактировать своё сообщение.

Пример запроса:

```javascript
{
    "type": "edited_message",
    "data": {
        "message": [{
            "uuid": "858585",
            "text": "Hello!"
            }],
        "user": [{
            "uuid": "1234567",
            "auth_id": "lkds89ds89fd98fd"
            }],
        "meta": null
        },
    "jsonapi": {
        "version": "1.0",
        "revision": "17"
        },
    "meta": null
    }
```

Пример ответа (успех):

```javascript
{
    "type": "edited_message",
    "data": null,
    "errors": {
        "code": 200,
        "status": "OK",
        "time": 1594492370,
        "detail": "successfully"
        },
    "jsonapi": {
        "version": "1.0",
        "revision": "17"
        },
    "meta": null
    }
```

Пример ответа (ошибка):

```javascript
{
    "type": "edited_message",
    "data": null,
    "errors": {
        "code": 401,
        "status": "Unauthorized",
        "time": 1594492370,
        "detail": "Unauthorized"
        },
    "jsonapi": {
        "version": "1.0",
        "revision": "17"
        },
    "meta": null
    }
```

### Метод ping_pong

Метод позволяет определить наличие связи между сервером и клиентом.
При отсутствии ответа сервер удаляет сессию клиента из памяти.

Пример запроса:

```javascript
{
    "type": "ping_pong",
    "data": {
        "user": [{
            "uuid": "1234567",
            "auth_id": "lkds89ds89fd98fd"
            }],
        "meta": null
        },
    "jsonapi": {
        "version": "1.0",
        "revision": "17"
        },
    "meta": null
    }
```

Пример ответа (успех):

```javascript
{
    "type": "ping_pong",
    "data": null,
    "errors": {
        "code": 200,
        "status": "OK",
        "time": 1594492370,
        "detail": "successfully"
        },
    "jsonapi": {
        "version": "1.0",
        "revision": "17"
        },
    "meta": null
    }
```

Пример ответа (ошибка):

```javascript
{
    "type": "ping_pong",
    "data": null,
    "errors": {
        "code": 401,
        "status": "Unauthorized",
        "time": 1594492370,
        "detail": "Unauthorized"
        },
    "jsonapi": {
        "version": "1.0",
        "revision": "17"
        },
    "meta": null
    }
```

### Метод error

В случае если запрос к серверу/клиенту им не распознан должен выдаваться стандартный тип ответа: `error`,
который в себе содержит объект `errors` с описанием возникшей ошибки.

_Примечание:_

_В качестве примера приведен запрос клиента, который не содержит ключа `type`. Такой запрос не пройдёт валидацию сервером и вызовет ошибку с кодом 415 "Unsupported Media Type"_
_В ответ сервер посылает JSON-объект с указанием имени метода `error` и информацией о возникшей ошибке, в поле `errors`._

Пример запроса:

```javascript
{
    "data": {
        "uuid": "1234567",
        "auth_id": "asdfadsfadfggzasd"
        }
}
```

Пример ответа:

```javascript
{
    "type": "error",
    "data": null,
    "errors": {
        "code": 415,
        "status": "Unsupported Media Type",
        "time": 1594492370,
        "detail": "Unsupported data type (no validation passed)"
        },
    "jasonapi": {
        "version": "1.0",
        "revision": "17"
        },
    "meta": null
}
```

## Описание ошибок

Информация о коде состояния запроса передается в поле `errors`. Ниже приведены все варианты кодов состояния запроса.

### Код 200 статус "Ok"

Команда выполнена успешно.

```javascript
"errors": {
    "code": 200,
    "status": "OK",
    "time": 1594492370,
    "detail": "Successfully"
    }
```

### Код 201 статус "Created"

Объект (пользователь) создан.

```javascript
"errors": {
    "code": 201,
    "status": "Created",
    "time": 1594492370,
    "detail": "A new user has been created."
    }
```

### Код 202 статус "Accepted"

Информация переданная вместе с запросом принята.

```javascript
"errors": {
    "code": 202,
    "status": "Accepted",
    "time": 1594492370,
    "detail": "Information is accepted."
    }
```

### Код 206 статус "Partial Content"

Информация выдана частично. Такой статус служит для информирования о том, что запрос сервером выполнен успешно, но объём запрошенных данных больше чем сервер может передать.

```javascript
"errors": {
    "code": 206,
    "status": "Partial Content",
    "time": 1594492370,
    "detail": "Information provided partially."
    }
```

### Код 400 статус "Bad Request"

Запрос не распознан.

```javascript
"errors": {
    "code": 400,
    "status": "Bad Request",
    "time": 1594492370,
    "detail": "Request is not recognized."
    }
```

### Код 401 статус "Unauthorized"

Ошибка авторизации. Неверный логин или пароль.

```javascript
"errors": {
    "code": 401,
    "status": "Unauthorized",
    "time": 1594492370,
    "detail": "Wrong login or password."
    }
```

### Код 403 статус "Forbidden"

Объём запрошенной информации больше чем сервер может выдать.

```javascript
"errors": {
    "code": 403,
    "status": "Forbidden",
    "time": 1594492370,
    "detail": "Forbidden"
    }
```

### Код 404 статус "Not Found"

Не найдена запрашиваемая информация или не найден пользователь.

```javascript
"errors": {
    "code": 404,
    "status": "Not Found",
    "time": 1594492370,
    "detail": "The requested information was not found or the user was not found."
    }
```

### Код 405 статус "Method Not Allowed"

Такой запрос недоступен. Возможно клиент использует старый API.

```javascript
"errors": {
    "code": 405,
    "status": "Method Not Allowed",
    "time": 1594492370,
    "detail": "Such request is not available. Maybe the client uses an old API."
    }
```

### Код 408 статус "Request Timeout"

_Дополнить_

```javascript
"errors": {
    "code": 408,
    "status": "Request Timeout",
    "time": 1594492370,
    "detail": "Request Timeout"
    }
```

### Код 409 статус "Conflict"

Такой пользователь (поток) уже есть на сервере.

```javascript
"errors": {
    "code": 409,
    "status": "Conflict",
    "time": 1594492370,
    "detail": "Such user (flow) is already on the server."
    }
```

### Код 415 статус "Unsupported Media Type"

Неподдерживаемый тип данных (не пройдена валидация).

```javascript
"errors": {
    "code": 415,
    "status": "Unsupported Media Type",
    "time": 1594492370,
    "detail": "Unsupported data type (no validation passed)"
    }
```

### Код 417 статус "Expectation Failed"

_Дополнить_

```javascript
"errors": {
    "code": 417,
    "status": "Expectation Failed",
    "time": 1594492370,
    "detail": "Expectation Failed"
    }
```

### Код 426 статус "Upgrade Required"

_Дополнить_

```javascript
"errors": {
    "code": 426,
    "status": "Upgrade Required",
    "time": 1594492370,
    "detail": "Upgrade Required"
    }
```

### Код 429 статус "Too Many Requests"

Запрошено слишком большое количество данных (например при запросе информации о пользователях)

```javascript
"errors": {
    "code": 429,
    "status": "Too Many Requests",
    "time": 1594492370,
    "detail": "Too much data has been requested"
    }
```

### Код 499 статус "Client Closed Request"

_Дополнить_

```javascript
"errors": {
    "code": 499,
    "status": "Client Closed Request",
    "time": 1594492370,
    "detail": "Client Closed Request"
    }
```

### Код 500 статус "Internal Server Error"

Серверу настала жопа.

```javascript
"errors": {
    "code": 500,
    "status": "Internal Server Error",
    "time": 1594492370,
    "detail": "The server got its ass."
    }
```

### Код 503 статус "Service Unavailable"

_Дополнить_

```javascript
"errors": {
    "code": 503,
    "status": "Service Unavailable",
    "time": 1594492370,
    "detail": "Service Unavailable"
    }
```

### Код 505 статус "Version Not Supported"

Версия протокола не поддерживается.

```javascript
"errors": {
    "code": 505,
    "status": "Version Not Supported",
    "time": 1594492370,
    "detail": "Version Not Supported"
    }
```

### Код 520 статус "Unknown Error"

Неизвестная ошибка. Этот статус получают все исключения `Exception` которые были вызваны ошибками на стороне сервера.

```javascript
"errors": {
    "code": 520,
    "status": "Unknown Error",
    "time": 1594492370,
    "detail": "Unknown Error"
    }
```

### Код 526 статус "Invalid SSL Certificate"

Недействительный сертификат SSL.

```javascript
"errors": {
    "code": 526,
    "status": "Invalid SSL Certificate",
    "time": 1594492370,
    "detail": "Invalid SSL Certificate"
    }
```
