# Официальная документация протокола Udav

Актуально на: **05.09.2020**

Версия протокола: **1.0** Редакция протокола: **1.15**

Udav (MoreliaTalk protocol) создан для унификации взаимодействия между клиентом и сервером в MoreliaTalk Network.
Интерфейс взаимодействия реализован через вебсокеты. Приложения общаются между собой путём отправки JSON-файла.

Содержание:

- [Официальная документация протокола Udav](#официальная-документация-протокола-Udav)
  - [Описание API](#описание-api)
    - [Объект type](#объект-type)
    - [Объект data](#объект-data)
    - [Объект flow](#объект-flow)
    - [Объект message](#объект-message)
    - [Объект user](#объект-user)
    - [Объект errors](#объект-errors)
    - [Объект jsonapi](#объект-jsonapi)
    - [Объект meta](#объект-meta)
  - [Пример JSON-объекта](#пример-json-объекта)
  - [Схема валидации](#схема-валидации)
  - [Описание методов](#описание-методов)
    - [Метод get_update](#метод-get_update)
    - [Метод send_message](#метод-send_message)
    - [Метод all_messages](#метод-all_messages)
    - [Метод add_flow](#метод-add_flow)
    - [Метод all_flow](#метод-all_flow)
    - [Метод user_info](#метод-user_info)
    - [Метод register_user](#метод-register_user)
    - [Метод authentication](#метод-authentification)
    - [Метод delete_user](#метод-delete_user)
    - [Метод delete_message](#метод-delete_message)
    - [Метод edited_message](#метод-edited_message)
    - [Метод ping-pong](#метод-ping-pong)
    - [Метод error](#метод-error)
  - [Описание ошибок](#описание-ошибок)
    - [Код 200 статус "Ok"](#код-200-статус-ok)
    - [Код 201 статус "Created"](#код-201-статус-created)
    - [Код 202 статус "Accepted"](#код-202-статус-accepted)
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

- Первая пара _ключ:значение_ (объект `type`) устанавливает тип метода. Клиент/сервер обрабатывают запрос в соответсвии с именем метода. Значение ключа не может быть пустым или `null`.
- Вторая пара _ключ:значение_ (объект `data`) передает массив данных соответствующих запросу. В случае отсутствия данных, значение ключа `null`.
- Третья пара _ключ:значение_ (объект `errors`) передает информацию о статусе выполенения запроса. Значение ключа не может быть пустым или `null`.
- Четвёртая пара _ключ:значение_ (объект `jsonapi`) передает информацию об используемом протоколе. Значение ключа не может быть пустым или `null`.
- Пятая пара _ключ:значение_ (объект `meta`) резервная, для дальнейшего расширения протокола. В случае отсутствия данных, значение поля `null`.

Ниже описаны все возможные поля JSON-объекта.

### Объект type

В объекте `type` передается тип метода. Значение ключа `type` не может быть пустым или `null`.

Ключ | Тип | Обязательный | Описание
---- | --- | ------------ | --------
type | str | Yes | Уникальное имя метода из следующего списка: all_flow, add_flow, all_messages, authentication, get_update, register_user, send_message, user_info, delete_user, delete_message, edited_message, ping-pong.

### Объект data

В объекте `data` передается основной массив информации. В случае отсутствия данных значение ключа `data` должно быть `null`.

Ключ | Тип | Обязательный | Описание
---- | --- | ------------ | --------
time | int | No | Время, в секундах со времени началы эпохи (Unix-время). Используется в поисковых запросах.
flow | flow | No | Объект данных в виде словаря или списка содержащего словарь. Информация о потоке.
message | message | No | Объект данных в виде словаря или списка содержащего словарь. Информация о сообщении.
user | user | No | Объект данных в виде словаря или списка содержащего словарь. Информация о пользователе.
meta | Any | No | Зарезервировано. По умолчанию значение `null`.

### Объект flow

В объекте `flow` передается полная информация о потоке (чате, канале, группе).

Всего существуют три типа потока:

- chat (2 пишут, 2 читают)
- channel (1 пишет, многие читают)
- group (многие пишут, многие читают)

Ключ | Тип | Обязательный | Описание
---- | --- | ------------ | --------
id | int | Yes | Уникальный номер потока.
time | int | No | Время создания потока, в секундах со времени начала эпохи (Unix-время).
type | str | No | Тип потока.
title | str | No | Персональное имя потока (может быть не уникальным).
info | str | No | Описание потока.

### Объект message

В объекте `message` передается информация о сообщении.

Ключ | Тип | Обязательный | Описание
---- | --- | ------------ | --------
id | int | Yes | Уникальный номер сообщения.
text | str | No | Текст сообщения.
from_user_uuid | int | No | Уникальный номер пользователя который написал сообщение.
from_flow_id | int | No | Уникальный номер потока которому принадлежит сообщение.
time | int | No | Время когда сообщение было написано, в секундах со времени началы эпохи (Unix-время).
file_picture | bytes | No | Файл-вложение к сообщению (фото).
file_video | bytes | No | Объект данных в виде списка содержащего словарь. Файл-вложение к сообщению (видео).
file_audio | bytes | No | Объект данных в виде списка содержащего словарь. Файл-вложение к сообщению (аудио).
file_document | bytes | No | Объект данных в виде списка содержащего словарь. Файл-вложение к сообщению (документ).
emoji | bytes | No | Тип емоджи (в виде файла).
edited_time | int | No | Время когда пользователь последний раз исправил сообщение, в секундах со времени началы эпохи (Unix-время).
edited_status | bool | No | Статус сообщения (исправлено или нет).

### Объект user

В объекте `user` передается информация о пользователе, а так же его настройки.

Ключ | Тип | Обязательный | Описание
---- | --- | ------------ | --------
uuid | int | No | Уникальный номер пользователя. Выдается сервером после аутентификации.
login | str | No | Логин пользователя.
username | str | No | Отображаемое имя пользователя.
bio | str | No | Информация о пользователе.
avatar | bytes | No | Изображение пользователя.
password | str | No | Пароль пользователя.
salt | str | No | Соль. Ключевое слово подмешиваемое к паролю при создании Хэш-пароля.
key | str | No | Дополнительный ключ для генерации хэш-пароля.
is_bot | bool | No | Указывает на тип пользователя (бот или человек).
auth_id | str | No | Токен аутентификации.
email | EmailStr | No | Адрес почты пользователя.
time_created | int | No | Дата и время создания пользователя.

### Объект errors

В объекте `errors` передается информация о результате выполнения запроса. Не может быть пустым.
Коды ошибок (и их статусы) соответствуют кодам протокола [HTTP](https://ru.wikipedia.org/wiki/%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA_%D0%BA%D0%BE%D0%B4%D0%BE%D0%B2_%D1%81%D0%BE%D1%81%D1%82%D0%BE%D1%8F%D0%BD%D0%B8%D1%8F_HTTP). Значения ключа `detail` предназначено для подробного разъяснения статуса выполнения запроса.

Ключ | Тип | Обязательный | Описание
---- | --- | ------------ | --------
code | int | Yes | Код ошибки.
status | str | Yes | Статус ошибки.
time | int | Yes | Время когда произошла ошибка, в секундах со времени началы эпохи (Unix-время).
detail | str | Yes | Подробное описание ошибки.

### Объект jsonapi

В объекте `jsonapi` передается версия протокола. Не может быть пустым.

Ключ | Тип | Обязательный | Описание
---- | --- | ------------ | --------
version | str | Yes | Версия протокола.

### Объект meta

Объект `meta` зарезервирован. В случае отсутствия данных значение поля `null`.

Ключ | Тип | Обязательный | Описание
---- | --- | ------------ | --------
meta | Any | No | Зарезервировано.

## Пример JSON-объекта

Содержание JSON-объекта, используются все возможные поля.

```javascript
{
    "type": "user_info",
        "data": {
            "time": 1594492370,
            "flow": [{
                "id": 1254,
                "time": 1594492370,
                "type": "chat",
                "title": "Name Chat",
                "info": "Info about this chat"
                },
                {...}],
            "message": [{
                "id": 1,
                "text": "some text...",
                "from_user_uuid": 1254,
                "time": 1594492370,
                "from_flow_id": 123655455,
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
                "uuid": 5855,
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
            "version": "1.0"
            },
        "meta": null
        }
```

## Схема валидации

Схема валидации данных. Эта схема используется сервером для валидации запросов от клиентов.

```python
{
  "title": "MoreliaTalk protocol v1.0",
  "type": "object",
  "properties": {
    "type": {
      "title": "Type",
      "type": "string"
    },
    "data": {
      "$ref": "#/definitions/Data"
    },
    "errors": {
      "$ref": "#/definitions/Errors"
    },
    "jsonapi": {
      "$ref": "#/definitions/Version"
    },
    "meta": {
      "title": "Meta"
    }
  },
  "definitions": {
    "Flow": {
      "title": "List of flow with description and type",
      "type": "object",
      "properties": {
        "id": {
          "title": "Id",
          "type": "integer"
        },
        "time": {
          "title": "Time",
          "type": "integer"
        },
        "type": {
          "title": "Type",
          "type": "string"
        },
        "title": {
          "title": "Title",
          "type": "string"
        },
        "info": {
          "title": "Info",
          "type": "string"
        }
      }
    },
    "Message": {
      "title": "List of message information",
      "type": "object",
      "properties": {
        "id": {
          "title": "Id",
          "type": "integer"
        },
        "text": {
          "title": "Text",
          "type": "string"
        },
        "from_user_uuid": {
          "title": "From User Uuid",
          "type": "integer"
        },
        "time": {
          "title": "Time",
          "type": "integer"
        },
        "from_flow_id": {
          "title": "From Flow Id",
          "type": "integer"
        },
        "file_picture": {
          "title": "File Picture",
          "type": "string",
          "format": "binary"
        },
        "file_video": {
          "title": "File Video",
          "type": "string",
          "format": "binary"
        },
        "file_audio": {
          "title": "File Audio",
          "type": "string",
          "format": "binary"
        },
        "file_document": {
          "title": "File Document",
          "type": "string",
          "format": "binary"
        },
        "emoji": {
          "title": "Emoji",
          "type": "string",
          "format": "binary"
        },
        "edited_time": {
          "title": "Edited Time",
          "type": "integer"
        },
        "edited_status": {
          "title": "Edited Status",
          "type": "boolean"
        }
      }
    },
    "User": {
      "title": "List of user information",
      "type": "object",
      "properties": {
        "uuid": {
          "title": "Uuid",
          "type": "integer"
        },
        "bio": {
          "title": "Bio",
          "type": "string"
        },
        "avatar": {
          "title": "Avatar",
          "type": "string",
          "format": "binary"
        },
        "password": {
          "title": "Password",
          "type": "string"
        },
        "login": {
          "title": "Login",
          "type": "string"
        },
        "is_bot": {
          "title": "Is Bot",
          "type": "boolean"
        },
        "auth_id": {
          "title": "Auth Id",
          "type": "string"
        },
        "email": {
          "title": "Email",
          "type": "string",
          "format": "email"
        },
        "username": {
          "title": "Username",
          "type": "string"
        },
        "time_created": {
            "title": "Time created",
            "type": "integer"
        }
      }
    },
    "Data": {
      "title": "Main data-object",
      "type": "object",
      "properties": {
        "time": {
          "title": "Time",
          "type": "integer"
        },
        "flow": {
          "title": "Flow",
          "anyOf": [
            {
              "type": "array",
              "items": {
                "$ref": "#/definitions/Flow"
              }
            },
            {
              "$ref": "#/definitions/Flow"
            }
          ]
        },
        "message": {
          "title": "Message",
          "anyOf": [
            {
              "type": "array",
              "items": {
                "$ref": "#/definitions/Message"
              }
            },
            {
              "$ref": "#/definitions/Message"
            }
          ]
        },
        "user": {
          "title": "User",
          "anyOf": [
            {
              "type": "array",
              "items": {
                "$ref": "#/definitions/User"
              }
            },
            {
              "$ref": "#/definitions/User"
            }
          ]
        },
        "meta": {
          "title": "Meta"
        }
      }
    },
    "Errors": {
      "title": "Error information and statuses of request processing",
      "type": "object",
      "properties": {
        "code": {
          "title": "Code",
          "type": "integer"
        },
        "status": {
          "title": "Status",
          "type": "string"
        },
        "time": {
          "title": "Time",
          "type": "integer"
        },
        "detail": {
          "title": "Detail",
          "type": "string"
        }
      }
    },
    "Version": {
      "title": "Protocol version",
      "type": "object",
      "properties": {
        "version": {
          "title": "Version",
          "type": "string"
        }
      }
    }
  }
}
```

## Описание методов

Имя метода передается как значение ключа `type` внутри JSON-объекта.
Передача имени метода происходит как при запросе, так и при ответе. Ниже описаны примеры запросов и ответы на них.

_Примечание:_

- запрос в котором указан неподдерживаемый тип метода всегда вернёт ошибку _405 Method Not Allowed_.
- запрос в котором не будет указан метод всегда вернёт ошибку _400 Bad Request_.

### Метод get_update

Позволяет получить от сервера обновление общедоступной информации (сообщений, чатов, пользовательских данных) за период от времени time до текущего времени.

Пример запроса:

```javascript
{
    "type": "get_update",
    "data": {
        "time": 1594492370,
        "user": [{
            "uuid": 111111111,
            "auth_id": "dks7sd9f6g4fg67vb78g65"
            }],
        "meta": null
        },
    "jsonapi": {
        "version": "1.0"
        },
    "meta": null
    }
```

Пример ответа (успех):

```javascript
{
    "type": "get_update",
    "data": {
        "flow": [{
            "id": 1254,
            "time": 1594492370,
            "type": "chat",
            "title": "Name Chat",
            "info": "Info about this chat"
            },
            {
            "id": 1236,
            "time": 1594492370,
            "type": "group",
            "title": "Name group",
            "info": "Info about this group"
            },
            {...}],
        "message": [{
            "id": 1,
            "text": "some text...",
            "from_user_uuid": 1254,
            "time": 1594492370,
            "from_flow_id": 123655455,
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
            "uuid": 5855,
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
        "version": "1.0"
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
        "version": "1.0"
        },
    "meta": null
    }
```

### Метод send_message

Метод позволяет отправить сообщение в поток `flow`.

Пример запроса:

```javascript
{
    "type": "send_message",
    "data": {
        "flow": [{
            "id": 123
            }],
        "message": [{
            "text": "Hello!",
            "file": {
                "picture": "jkfikdkdsd",
                "video": "sdfsdfsdf",
                "audio": "fgfsdfsdfsdf",
                "document": "adgdfhfgth"
                },
            "emoji": "sfdfsdfsdf"
            ]},
        "user": [{
            "uuid": 111111111,
            "auth_id": "dks7sd9f6g4fg67vb78g65",
            }],
        "meta": null
        },
    "jsonapi": {
        "version": "1.0"
        },
    "meta": null
    }
```

Пример ответа (успех):

```javascript
{
    "type": "send_message",
    "data": null,
    "errors": {
        "code": 200,
        "status": "OK",
        "time": 1594492370,
        "detail": "successfully"
        },
    "jsonapi": {
        "version": "1.0"
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
        "version": "1.0"
        },
    "meta": null
    }
```

### Метод all_messages

Метод позволяет получить все сообщения в потоке `flow`, за период с начала времени `time` по настоящее время.

Пример запроса:

```javascript
{
    "type": "all_messages",
    "data": {
        "time": 1594492370,
        "flow": [{
            "id": 123
            }],
        "user": [{
            "uuid": 111111111,
            "auth_id": "dks7sd9f6g4fg67vb78g65"
            }],
        "meta": null
        },
    "jsonapi": {
        "version": "1.0"
        },
    "meta": null
    }
```

Пример ответа (успех):

```javascript
{
    "type": "all_messages",
    "data": {
        "flow": [{
            "id": 123
            }],
        "message": [{
            "id": 1,
            "text": "some text...",
            "from_user_uuid": 1254,
            "time": 1594492370,
            "from_flow_id": 123655455,
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
        "version": "1.0"
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
        "version": "1.0"
        },
    "meta": null
    }
```

### Метод add_flow

Метод позволяет создать новый поток `flow`.

Пример запроса:

```javascript
{
    "type": "add_flow",
    "data": {
        "flow": [{
            "type": "chat",
            "title": "title",
            "info": "info"
            }],
        "user": [{
            "uuid": 123456,
            "auth_id": "auth_id"
            }],
        "meta": null
        },
    "jsonapi": {
        "version": "1.0"
        },
    "meta": null
    }
```

Пример ответа (успех):

```javascript
{
    "type": "add_flow",
    "data": {
        "flow": [{
            "id": 5655,
            "time": 1594492370,
            "type": "chat",
            "title": "title",
            "info": "info"
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
        "version": "1.0"
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
        "version": "1.0"
        },
    "meta": null
    }
```

### Метод all_flow

Метод позволяет получить от сервера перечень всех потоков `flow` которые зарегистрированы на сервере. Помимо списка потоков сервер выдаёт по каждому из них всю информацию.

Пример запроса:

```javascript
{
    "type": "all_flow",
    "data": {
        "user": [{
            "uuid": 111111111,
            "auth_id": "dks7sd9f6g4fg67vb78g65"
            }],
        "meta": null
        },
    "jsonapi": {
        "version": "1.0"
        },
    "meta": null
    }
```

Пример ответа (успех):

```javascript
{
    "type": "all_flow",
    "data": {
        "flow": [{
            "id": 5655,
            "time": 1594492370,
            "type": "chat",
            "title": "Some chat",
            "info": "Info from some chat"
            },
            {
            "id": 123,
            "time": 1594492365,
            "type": "group",
            "title": "Some group",
            "info": "Info from some group"
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
        "version": "1.0"
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
        "version": "1.0"
        },
    "meta": null
    }
```

### Метод user_info

Метод позволяет клиенту получить от сервера информацию о своих настройках.

Пример запроса:

```javascript
{
    "type": "user_info",
    "data": {
        "user": [{
            "uuid": 111111111,
            "auth_id": "dks7sd9f6g4fg67vb78g65"
            }],
        "meta": null
        },
    "jsonapi": {
        "version": "1.0"
        },
    "meta": null
    }
```

Пример ответа:

```javascript
{
    "type": "user_info",
    "data": {
        "user": [{
            "uuid": 5855,
            "login": "username1",
            "password": "lksdjflksjfsd",
            "salt": "salt",
            "key": "key"
            "username": "Vasya",
            "is_bot": true,
            "auth_id": "dfhdfghdfghdfgh",
            "email": "querty@querty.com",
            "avatar": "fffdddddd",
            "bio": "My bio",
            "time_created": 46655456655
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
        "version": "1.0"
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
        "version": "1.0"
        },
    "meta": null
    }
```

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
        "version": "1.0"
        },
    "meta": null
    }
```

Пример ответа (успех):

```javascript
{
    "type": "register_user",
    "data": {
        "user": [{
            "uuid": 5654665416541,
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
        "version": "1.0"
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
        "code": 400,
        "status": "Bad Request",
        "time": 1594492370,
        "detail": "Bad Request"
        },
    "jsonapi": {
        "version": "1.0"
        },
    "meta": null
    }
```

### Метод authentification

Метод позволяет клиенту пройти аутентификацию на сервере.

Пример запроса:

```javascript
{
    "type": "auth",
    "data": {
        "user": [{
            "password": "ds45ds45fd45fd",
            "login": "User"
            }],
        "meta": null
        },
    "jsonapi": {
        "version": "1.0"
        },
    "meta": null
    }
```

Пример ответа (успех):

```javascript
{
    "type": "auth",
    "data": {
        "user": [{
            "uuid": 5654665416541,
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
        "version": "1.0"
        },
    "meta": null
    }
```

Пример ответа (ошибка):

```javascript
{
    "type": "auth",
    "data": null,
    "errors": {
        "code": 401,
        "status": "Unauthorized",
        "time": 1594492370,
        "detail": "Unauthorized"
        },
    "jsonapi": {
        "version": "1.0"
        },
    "meta": null
    }
```

### Метод delete_user

Метод позволяет клиенту удалить пользователя. При этом, сервер не удаляет запись о пользователе из БД, а делает замену следующим образом:

- содержимое полей login и username заменяется на "User deteted";
- содержимое полей: username, salt, key, auth_id, bio заменяется на "deleted";
- содержимое полей avatar и email заменяется на пустое значение "";
- содержимоле поля password и auth_id заменяется на сгенерированный рандомный хэш.

Пример запроса:

```javascript
{
    "type": "delete_user",
    "data": {
        "user": [{
            "uuid": 123456,
            "password": "ds45ds45fd45fd",
            "salt": "salt",
            "key": "key",
            "login": "User",
            "auth_id": "jkfdjkfdjkf"
            }],
        "meta": null
        },
    "jsonapi": {
        "version": "1.0"
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
        "version": "1.0"
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
        "version": "1.0"
        },
    "meta": null
    }
```

### Метод delete_message

Метод позволяет клиенту удалить своё сообщение. При удалении сообщения вместо оригинального текста сообщения в поле "text" базы данных записывается новое значение "Message deleted."

Пример запроса:

```javascript
{
    "type": "delete_message",
    "data": {
        "message": [{
            "id": 858585,
            "text": "Message deleted."
            }],
        "user": [{
            "uuid": 5345634567354,
            "auth_id": "lkds89ds89fd98fd"
            }],
        "meta": null
        },
    "jsonapi": {
        "version": "1.0"
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
        "version": "1.0"
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
        "version": "1.0"
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
            "id": 858585,
            "text": "Hello!"
            }],
        "user": [{
            "uuid": 5345634567354,
            "auth_id": "lkds89ds89fd98fd"
            }],
        "meta": null
        },
    "jsonapi": {
        "version": "1.0"
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
        "version": "1.0"
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
        "version": "1.0"
        },
    "meta": null
    }
```

### Метод ping-pong

Метод позволяет определить наличие связи между сервером и клиентом.
При отсутствии ответа сервер удаляет сессию клиента из памяти.

Пример запроса:

```javascript
{
    "type": "ping-pong",
    "data": {
        "user": [{
            "uuid": 5345634567354,
            "auth_id": "lkds89ds89fd98fd"
            }],
        "meta": null
        },
    "jsonapi": {
        "version": "1.0"
        },
    "meta": null
    }
```

Пример ответа (успех):

```javascript
{
    "type": "ping-pong",
    "data": null,
    "errors": {
        "code": 200,
        "status": "OK",
        "time": 1594492370,
        "detail": "successfully"
        },
    "jsonapi": {
        "version": "1.0"
        },
    "meta": null
    }
```

Пример ответа (ошибка):

```javascript
{
    "type": "ping-pong",
    "data": null,
    "errors": {
        "code": 401,
        "status": "Unauthorized",
        "time": 1594492370,
        "detail": "Unauthorized"
        },
    "jsonapi": {
        "version": "1.0"
        },
    "meta": null
    }
```

### Метод error

В случае если запрос к серверу/клиенту им не распознан должен выдаваться стандартный тип ответа: `error`,
который в себе содержит объект `errors` с описанием возникшей ошибки.

_Примечание:_

_В качестве примера приведен запрос клиента, без передачи ключа `type` и его значения._
_В ответ сервер посылает JSON-объект с указанием имени метода `error` и информацией о возникшей ошибке, в поле `errors`._

Пример запроса:

```javascript
{
    "data": {
        "uuid": 45654645,
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
        "code": 400,
        "status": "Bad Request",
        "time": 1594492370,
        "detail": "Bad Request"
        },
    "jasonapi": {
        "version": "1.0"
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

_Дополнить_

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
    "detail": "Unsupported data type (no validation passed)."
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

_Дополнить_

```javascript
"errors": {
    "code": 429,
    "status": "Too Many Requests",
    "time": 1594492370,
    "detail": "Too Many Requests"
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

### Код 520 статус "Unknown Error"

Неизвестная ошибка. Этот статус получают в том числе все исключения `Exception`.

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
