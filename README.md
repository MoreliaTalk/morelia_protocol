# Официальная документация протокола Udav

Актуально на: **25.08.2020**

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
    - [Объект from_user](#объект-from_user)
    - [Объект from_flow](#объект-from_flow)
    - [Объект file](#объект-file)
    - [Объект edited_message](#объект-edited_message)
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
    - [Метод all_flow](#метод-all_flow)
    - [Метод user_info](#метод-user_info)
    - [Метод register_user](#метод-register_user)
    - [Метод authentication](#метод-authentication)
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

Запросы между клиентом и сервером передаются в виде JSON-объекта. В каждом запросе имеется ключ `type` значение которого является именем метода.

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
type | str | Yes | Уникальное имя метода из следующего списка: all_flow, all_messages, authentication, get_update, register_user, send_message, user_info, delete_user, delete_message, edited_message, ping-pong.

### Объект data

В объекте `data` передается основной массив информации. В случае отсутствия данных значение ключа `data` должно быть `null`.

Ключ | Тип | Обязательный | Описание
---- | --- | ------------ | --------
time | int | No | Время на сервере, в секундах со времени началы эпохи (Unix-время).
flow | flow | No | Объект данных в виде массива типа dict.
message | message | No | Объект данных в виде массива типа dict.
user | user | No | Объект данных в виде массива типа dict.
meta | Any | No | Зарезервировано.

### Объект flow

В объекте `flow` передается полная информация о потоке (чате, канале, группе).

Всего существуют три типа потока:

- chat (2 пишут, 2 читают)
- channel (1 пишет, многие читают)
- group (многие пишут, многие читают)

Ключ | Тип | Обязательный | Описание
---- | --- | ------------ | --------
id | int | Yes | Уникальный номер потока.
time | int | No | Время обновления потока, в секундах со времени началы эпохи (Unix-время).
type | str | No | Тип потока.
title | str | No | Персональное имя потока (может быть не уникальным).
info | str | No | Описание потока.

### Объект message

В объекте `message` передается информация о сообщении.

Ключ | Тип | Обязательный | Описание
---- | --- | ------------ | --------
id | int | Yes | Уникальный номер сообщения.
text | str | No | Текст сообщения.
from_user | from_user | No | Объект в ввиде массива типа dict. Информация о пользователе который написал это сообщение.
time | int | Yes | Время когда сообщение было написано, в секундах со времени началы эпохи (Unix-время).
from_flow | from_flow | No | Объект в ввиде массива типа dict. Информация к какому чату принадлежит это сообщение.
file | file | No | Объект в ввиде массива типа dict. Файл-вложение к сообщению (аудио, видео, фото, документ).
emoji | bytes | No | Тип емоджи (в виде файла).
edited_message | edited_message | No | Объект в ввиде массива типа dict. Информация о редактировании сообщения, а так же о дате редактирования.
reply_to | Any | No | Ссылка на цитируемое сообщение.

### Объект from_user

В объекте `from_user` передается информация о пользователе который написал сообщение.

Ключ | Тип | Обязательный | Описание
---- | --- | ------------ | --------
uuid | int | Yes | Уникальный номер пользователя.
username | str | Yes | Имя пользователя.

### Объект from_flow

В объекте `from_flow` передается информация об `id` потока к которому относится `message` (сообщение).

Ключ | Тип | Обязательный | Описание
---- | --- | ------------ | --------
id | int | Yes | Уникальный номер потока.
type | str | No | Тип потока.

### Объект file

В объекте `file` передаются файлы, которые пользователь прикрепил к сообщению.

Ключ | Тип | Обязательный | Описание
---- | --- | ------------ | --------
picture | bytes | No | Изображение.
video | bytes | No | Видео.
audio | bytes | No | Аудио.
document | bytes | No | Документ.

### Объект edited_message

В объекте `edited_message` передается информация об исправлении сообщения, а так же дата последнего редактирования.

Ключ | Тип | Обязательный | Описание
---- | --- | ------------ | --------
time | int | Yes | Время когда пользователь последний раз исправил сообщение, в секундах со времени началы эпохи (Unix-время).
status | bool | Yes | Статус сообщения (исправлено или нет).

### Объект user

В объекте `user` передается информация о пользователе (настройки пользователя).

Ключ | Тип | Обязательный | Описание
---- | --- | ------------ | --------
uuid | int | No | Уникальный номер пользователя.
bio | str | No | Информация о пользователе.
avatar | bytes | No | Изображение пользователя.
password | str | No | Пароль пользователя.
login | str | No | Логин пользователя.
is_bot | bool | No | Указывает на тип пользователя (бот или человек).
auth_id | str | No | Хэш пароля.
email | EmailStr | No | Контактная информация (адрес почты) пользователя.
username | str | No | Имя пользователя (не уникальное).

### Объект errors

В объекте `errors` передается информация о результате выполнения запроса. Не может быть пустым.
Коды ошибок (и их статусы) соответствуют кодам протокола [HTTP](https://ru.wikipedia.org/wiki/%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA_%D0%BA%D0%BE%D0%B4%D0%BE%D0%B2_%D1%81%D0%BE%D1%81%D1%82%D0%BE%D1%8F%D0%BD%D0%B8%D1%8F_HTTP). Значения ключа `detail` предназначен для расширенного пояснения статуса выполнения запроса.

Ключ | Тип | Обязательный | Описание
---- | --- | ------------ | --------
code | int | Yes | Код ошибки.
status | str | Yes | Статус ошибки.
time | int | Yes | Время когда произошла ошибка, в секундах со времени началы эпохи (Unix-время).
detail | str | Yes | Описание ошибки.

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
      "flow": {
        "id": 1254,
        "time": 1594492370,
        "type": "chat",
        "title": "Name Chat",
        "info": "Info about this chat"
        },
        "message": {
        "id": 1,
        "text": "some text...",
        "from_user": {
          "uuid": 1254,
          "username": "Vasya"
          },
        "time": 1594492370,
        "from_flow": {
          "id": 123655455,
          "type": "chat"
          },
        "file": {
          "picture": "jkfikdkdsd",
          "video": "sdfsdfsdf",
          "audio": "fgfsdfsdfsdf",
          "document": "fghsfghsfgh"
          },
        "emoji": "sfdfsdfsdf",
        "edited_message": {
          "time": 1594492370,
          "status": true
          },
        "reply_to": null
        },
      "user": {
        "uuid": 5855,
        "login": "username1",
        "password": "lksdjflksjfsd",
        "username": "Vasya",
        "is_bot": true,
        "auth_id": "4646hjgjhg64",
        "email": "querty@querty.com",
        "avatar": "fffdddddd",
        "bio": "My bio"
        },
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
  "required": [
    "type",
    "jsonapi"
  ],
  "definitions": {
    "Flow": {
      "title": "List of chat rooms with their description and type",
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
      },
      "required": [
        "id"
      ]
    },
    "MessageFromUser": {
      "title": "Information about forwarded message user",
      "type": "object",
      "properties": {
        "uuid": {
          "title": "Uuid",
          "type": "integer"
        },
        "username": {
          "title": "Username",
          "type": "string"
        }
      },
      "required": [
        "uuid",
        "username"
      ]
    },
    "FromFlow": {
      "title": "Information from chat id",
      "type": "object",
      "properties": {
        "id": {
          "title": "Id",
          "type": "integer"
        }
      },
      "required": [
        "id"
      ]
    },
    "File": {
      "title": "Files attached to the message",
      "type": "object",
      "properties": {
        "picture": {
          "title": "Picture",
          "type": "string",
          "format": "binary"
        },
        "video": {
          "title": "Video",
          "type": "string",
          "format": "binary"
        },
        "audio": {
          "title": "Audio",
          "type": "string",
          "format": "binary"
        },
        "document": {
          "title": "Document",
          "type": "string",
          "format": "binary"
        }
      }
    },
    "EditedMessage": {
      "title": "Time of editing the message",
      "type": "object",
      "properties": {
        "time": {
          "title": "Time",
          "type": "integer"
        },
        "status": {
          "title": "Status",
          "type": "boolean"
        }
      },
      "required": [
        "time",
        "status"
      ]
    },
    "Message": {
      "title": "Message options",
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
        "from_user": {
          "$ref": "#/definitions/MessageFromUser"
        },
        "time": {
          "title": "Time",
          "type": "integer"
        },
        "from_flow": {
          "$ref": "#/definitions/FromFlow"
        },
        "file": {
          "$ref": "#/definitions/File"
        },
        "emoji": {
          "title": "Emoji",
          "type": "string",
          "format": "binary"
        },
        "edited": {
          "$ref": "#/definitions/EditedMessage"
        },
        "reply_to": {
          "title": "Reply To"
        }
      },
      "required": [
        "id",
        "time"
      ]
    },
    "User": {
      "title": "User information",
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
          "$ref": "#/definitions/Flow"
        },
        "message": {
          "$ref": "#/definitions/Message"
        },
        "user": {
          "$ref": "#/definitions/User"
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
      },
      "required": [
        "code",
        "status",
        "time",
        "detail"
      ]
    },
    "Version": {
      "title": "Protocol version",
      "type": "object",
      "properties": {
        "version": {
          "title": "Version",
          "type": "number"
        }
      },
      "required": [
        "version"
      ]
    }
  }
}
```

## Описание методов

Имя метода передается как значение ключа `type` внутри JSON-объекта.
Передача имени метода происходит как при запросе, так и при ответе. Ниже описаны примеры запросов и ответы на них.

- запрос в котором указан неподдерживаемый тип метода всегда вернёт ошибку _405 Method Not Allowed_.
- запрос в котором не будет указан метода всегда вернёт ошибку _400 Bad Request_.

### Метод get_update

Позволяет получить от сервера обновление информации (сообщений, чатов, пользовательских данных) за период.

Пример запроса:

```javascript
{
  "type": "get_update",
  "data": {
    "time": 1594492370,
    "flow": {
      "id": 123
      },
    "user": {
      "uuid": 111111111,
      "auth_id": "dks7sd9f6g4fg67vb78g65"
      },
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
    "time": 1594492370,
    "flow": {
      "id": 1254,
      "time": 1594492370,
      "type": "chat",
      "title": "Name Chat",
      "info": "Info about this chat"
      },
    "message": {
      "id": 1,
      "text": "some text...",
      "from_user": {
        "uuid": 1254,
        "username": "Vasya"
        },
        "time": 1594492370,
        "from_flow": {
          "id": 123655455,
          "type": "chat"
          },
        "file": {
          "picture": "jkfikdkdsd",
          "video": "sdfsdfsdf",
          "audio": "fgfsdfsdfsdf",
          "document": "adgdfhfgth"
          },
        "emoji": "sfdfsdfsdf",
        "edited_message": {
          "time": 1594492370,
          "status": true
          },
        "reply_to": null
        },
    "user": {
      "uuid": 5855,
      "login": "username1",
      "password": "lksdjflksjfsd",
      "username": "Vasya",
      "is_bot": true,
      "auth_id": "464645646464",
      "email": "querty@querty.com",
      "avatar": "fffdddddd",
      "bio": "My bio"
      },
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

Метод позволяет отправить сообщение другому клиенту. `flow` может быть любой, не только `chat`.

Пример запроса:

```javascript
{
  "type": "send_message",
  "data": {
    "flow": {
      "id": 123,
      "time": 1594492370,
      "type": "chat"
      },
    "message": {
      "id": 858585,
      "text": "Hello!",
      "from_user": {
        "uuid": 111111111,
        "username": "User"
        },
      "time": 1594492370,
      "from_flow": {
        "id": 5656565656,
        "type": "chat"
        },
      "file": {
        "picture": "jkfikdkdsd",
        "video": "sdfsdfsdf",
        "audio": "fgfsdfsdfsdf",
        "document": "adgdfhfgth"
        },
      "emoji": "sfdfsdfsdf",
      "edited_message": {
        "time": 1594492370,
        "status": true
        },
      "reply_to": null
    },
    "user": {
      "uuid": 111111111,
      "auth_id": "dks7sd9f6g4fg67vb78g65",
      },
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
  "data": {
    "time": 1594492370,
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

Метод позволяет получить все сообщения за период с начала времени `time` по настоящее время.

Пример запроса:

```javascript
{
  "type": "all_messages",
  "data": {
    "time": 1594492370,
    "user": {
      "uuid": 111111111,
      "auth_id": "dks7sd9f6g4fg67vb78g65"
      },
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
    "time": 1594492370,
    "user": {
      "uuid": 556565656,
      "auth_id": "jkds78dsids89ds89sd"
      }
    "message": {
      "id": 1,
      "text": "some text...",
      "from_user": {
        "uuid": 1254,
        "username": "Vasya"
        },
      "time": 1594492370,
      "from_flow": {
        "id": 123655455,
        "type": "chat"
        },
        "file": {
          "picture": "jkfikdkdsd",
          "video": "sdfsdfsdf",
          "audio": "fgfsdfsdfsdf",
          "document": "adgdfhfgth"
          },
        "emoji": "sfdfsdfsdf",
        "edited_message": {
            "time": 1594492370,
            "status": true
            },
        "reply_to": null
        },
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

### Метод all_flow

Метод позволяет получить от сервера перечень и информацию обо всех потоках.

Пример запроса:

```javascript
{
  "type": "all_flow",
  "data": {
    "user": {
      "uuid": 111111111,
      "auth_id": "dks7sd9f6g4fg67vb78g65"
      },
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
    "time": 1594492370,
    "user": {
      "id": 556565656,
      "auth_id": "jkds78dsids89ds89sd"
       },
    "flow": {
      "id": 5655,
      "time": 1594492370,
      "type": "chat",
      "title": "Some chat",
      "info": "Info from some chat"
      },
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
    "user": {
      "uuid": 111111111,
      "auth_id": "dks7sd9f6g4fg67vb78g65"
      },
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
    "time": 1594492370,
    "user": {
      "uuid": 5855,
      "login": "username1",
      "password": "lksdjflksjfsd",
      "username": "Vasya",
      "is_bot": true,
      "auth_id": "464645646464",
      "email": "querty@querty.com",
      "avatar": "fffdddddd",
      "bio": "My bio"
      },
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
    "user": {
      "password": "ds45ds45fd45fd",
      "login": "User",
      "email": "querty@querty.com",
      "username": "User1"
      },
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
    "time": 1594492370,
    "user": {
      "uuid": 5654665416541,
      "auth_id": "lkds89ds89fd98fd"
      },
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

### Метод authentication

Метод позволяет клиенту пройти аутентификацию на сервере.

Пример запроса:

```javascript
{
  "type": "auth",
  "data": {
    "user": {
      "password": "ds45ds45fd45fd",
      "login": "User"
      },
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
    "time": 1594492370,
    "user": {
      "uuid": 5654665416541,
      "auth_id": "lkds89ds89fd98fd"
      },
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

Метод позволяет клиенту удалить пользователя.

Пример запроса:

```javascript
{
  "type": "delete_user",
  "data": {
    "user": {
      "password": "ds45ds45fd45fd",
      "login": "User"
      },
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
  "data": {
    "user": {
      "uuid": 5345634567354
      "login": "User"
      },
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

Метод позволяет клиенту удалить своё сообщение.

Пример запроса:

```javascript
{
  "type": "delete_message",
  "data": {
    "message": {
      "id": 858585,
      "time": 1594492370
      },
    "user": {
      "uuid": 5345634567354,
      "auth_id": "lkds89ds89fd98fd"
      },
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
      "message": {
        "id": 858585,
        "text": "Hello!",
        "time": 1594492370
        },
      "user": {
        "uuid": 5345634567354,
        "auth_id": "lkds89ds89fd98fd"
        },
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
    "user": {
      "uuid": 5345634567354,
      "auth_id": "lkds89ds89fd98fd"
      },
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
  "detail": "successfully"
  }
```

### Код 201 статус "Created"

Объект (пользователь) создан.

```javascript
"errors": {
  "code": 201,
  "status": "Created",
  "time": 1594492370,
  "detail": "Created"
  }
```

### Код 202 статус "Accepted"

Информация переданная вместе с запросом принята.

```javascript
"errors": {
  "code": 202,
  "status": "Accepted",
  "time": 1594492370,
  "detail": "Accepted"
  }
```

### Код 400 статус "Bad Request"

_Дополнить_

```javascript
"errors": {
  "code": 400,
  "status": "Bad Request",
  "time": 1594492370,
  "detail": "Bad Request"
  }
```

### Код 401 статус "Unauthorized"

Ошибка авторизации. Неверный логин или пароль.

```javascript
"errors": {
  "code": 401,
  "status": "Unauthorized",
  "time": 1594492370,
  "detail": "Unauthorized"
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
  "detail": "Not Found"
  }
```

### Код 405 статус "Method Not Allowed"

Такой запрос недоступен. Возможно клиент использует старый API.

```javascript
"errors": {
  "code": 405,
  "status": "Method Not Allowed",
  "time": 1594492370,
  "detail": "Method Not Allowed"
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

### Код 415 статус "Unsupported Media Type"

Неподдерживаемый тип данных (не пройдена валидация).

```javascript
"errors": {
  "code": 415,
  "status": "Unsupported Media Type",
  "time": 1594492370,
  "detail": "Unsupported Media Type"
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
  "detail": "Internal Server Error"
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

Неизвестная ошибка. Этот статус получают в том числе все исключения.

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
