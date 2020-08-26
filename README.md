# Официальная документация протокола MoreliaTalk Network

Актуально на: **23.08.2020**

Версия протокола: **1.0** Редакция протокола: **1.15**

MoreliaTalk protocol создан для унификации взаимодействия между клиентом и сервером в MoreliaTalk Network.
Интерфейс взаимодействия реализован через ВебСокеты, путём отправки JSON-объекта. Значение первого поля `type` является наименованием метода.

Содержание:

- [Официальная документация протокола MoreliaTalk Network](#официальная-документация-протокола-moreliatalk-network)
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
    - [Код 200 статус 'Ok'](#код-200-статус-ok)
    - [Код 201 статус 'Created'](#код-201-статус-created)
    - [Код 202 статус 'Accepted'](#код-202-статус-accepted)
    - [Код 400 статус 'Bad Request'](#код-400-статус-bad-request)
    - [Код 401 статус 'Unauthorized'](#код-401-статус-unauthorized)
    - [Код 403 статус 'Forbidden'](#код-403-статус-forbidden)
    - [Код 404 статус 'Not Found'](#код-404-статус-not-found)
    - [Код 405 статус 'Method Not Allowed'](#код-405-статус-method-not-allowed)
    - [Код 408 статус 'Request Timeout'](#код-408-статус-request-timeout)
    - [Код 415 статус 'Unsupported Media Type'](#код-415-статус-unsupported-media-type)
    - [Код 417 статус 'Expectation Failed'](#код-417-статус-expectation-failed)
    - [Код 426 статус 'Upgrade Required'](#код-426-статус-upgrade-required)
    - [Код 429 статус 'Too Many Requests'](#код-429-статус-too-many-requests)
    - [Код 499 статус 'Client Closed Request'](#код-499-статус-client-closed-request)
    - [Код 500 статус 'Internal Server Error'](#код-500-статус-internal-server-error)
    - [Код 503 статус 'Service Unavailable'](#код-503-статус-service-unavailable)
    - [Код 520 статус 'Unknown Error'](#код-520-статус-unknown-error)
    - [Код 526 статус 'Invalid SSL Certificate'](#код-526-статус-invalid-ssl-certificate)

## Описание API

Запросы между клиентом и сервером передаются в виде JSON-объекта. Запрос в котором указан неподдерживаемый тип метода всегда вернёт ошибку _400 Bad Request_.

- Первая пара _ключ:значение_ (объект `Type`) устанавливает тип метода. Клиент/сервер обрабатывают запрос в соответсвии с типом метода. Не может быть пустым.
- Вторая пара _ключ:значение_ (объект `Data`) передает массив данных соответствующих запросу. В случае отсутствия данных значение поля `None`.
- Третья пара _ключ:значение_ (объект `Errors`) передает информацию о статусе выполенения запроса, коды статусов соответствуют кодам протокола HTTP. Не может быть пустым.
- Четвёртая пара _ключ:значение_ (объект `Jsonapi`) передает информацию об используемом протоколе. Не может быть пустым.
- Пятая пара _ключ:значение_ (объект `Meta`) резервная, для дальнейшего расширения протокола. В случае отсутствия данных значение поля `None`.

Ниже описаны все возможные поля JSON-объекта.

### Объект type

В объекте Type передается тип метода. Не может быть пустым.

Ключ | Тип | Обязательный | Описание
---- | --- | ------------ | --------
type | str | Yes | Уникальное имя метода из следующего списка: all_flow, all_messages, authentication, get_update, register_user, send_message, user_info, delete_user, delete_message, edited_message, ping-pong.

### Объект data

В объекте Data передается основной массив информации. В случае отсутствия данных значение поля `None`.

Ключ | Тип | Обязательный | Описание
---- | --- | ------------ | --------
time | int | Yes | Время на сервере, в секундах со времени началы эпохи (Unix-время).
flow | flow | No | Объект данных в виде массива типа dict.
message | message | No | Объект данных в виде массива типа dict.
user | user | No | Объект данных в виде массива типа dict.
meta | Any | No | Зарезервировано.

### Объект flow

В объекте Flow передается полная информация о потоке (чате, канале, группе).
Всего существуют три типа потока:

- chat (2 пишут, 2 читают)
- channel (1 пишет, многие читают)
- group (многие пишут, многие читают)

Ключ | Тип | Обязательный | Описание
---- | --- | ------------ | --------
id | int | Yes | Уникальный номер потока.
time | int | Yes | Время обновления потока, в секундах со времени началы эпохи (Unix-время).
type | str | Yes | Тип потока.
title | str | Yes | Персональное имя потока (может быть не уникальным).
info | str | No | Описание потока.

### Объект message

В объекте message передается информация о сообщении.

Ключ | Тип | Обязательный | Описание
---- | --- | ------------ | --------
id | int | Yes | Уникальный номер сообщения.
text | str | Yes | Текст сообщения.
from_user | from_user | Yes | Объект в ввиде массива типа dict. Информация о пользователе который написал это сообщение.
time | int | Yes | Время когда сообщение было написано, в секундах со времени началы эпохи (Unix-время).
from_flow | from_flow | Yes | Объект в ввиде массива типа dict. Информация к какому чату принадлежит это сообщение.
file | file | No | Объект в ввиде массива типа dict. Файл-вложение к сообщению (аудио, видео, фото, документ).
emoji | bytes | No | Тип емоджи (в виде файла).
edited_message | edited_message | No | Объект в ввиде массива типа dict. Информация о редактировании сообщения, а так же о дате редактирования.
reply_to | Any | No | Ссылка на цитируемое сообщение.

### Объект from_user

В объекте from_user передается информация о пользователе который написал сообщение.

Ключ | Тип | Обязательный | Описание
---- | --- | ------------ | --------
uuid | int | Yes | Уникальный номер пользователя.
username | str | Yes | Имя пользователя.

### Объект from_flow

В объекте from_flow передается информация об id потока к которому относится message (сообщение).

Ключ | Тип | Обязательный | Описание
---- | --- | ------------ | --------
id | int | Yes | Уникальный номер потока.
type | str | Yes | Тип потока.

### Объект file

В объекте file передаются файлы, которые пользователь прикрепил к сообщению.

Ключ | Тип | Обязательный | Описание
---- | --- | ------------ | --------
picture | bytes | No | Изображение.
video | bytes | No | Видео.
audio | bytes | No | Аудио.
document | bytes | No | Документ.

### Объект edited_message

В объекте edited_message передается информация об исправлении сообщения, а так же дата последнего редактирования.

Ключ | Тип | Обязательный | Описание
---- | --- | ------------ | --------
time | int | Yes | Время когда пользователь последний раз исправил сообщение, в секундах со времени началы эпохи (Unix-время).
status | bool | Yes | Статус сообщения (исправлено или нет).

### Объект user

В объекте user передается информация о пользователе (настройки пользователя).

Ключ | Тип | Обязательный | Описание
---- | --- | ------------ | --------
uuid | int | Yes | Уникальный номер пользователя.
bio | str | No | Информация о пользователе.
avatar | bytes | No | Изображение пользователя.
password | str | Yes | Пароль пользователя.
login | str | Yes | Логин пользователя.
is_bot | bool | Yes | Указывает на тип пользователя (бот или человек).
auth_id | str | Yes | Хэш пароля.
email | EmailStr | Yes | Контактная информация (адрес почты) пользователя.
username | str | Yes | Имя пользователя (не уникальное).

### Объект errors

В объекте errors передается информация о результате выполнения запроса.
Коды ошибок (и их статусы) соответствуют кодам протокола HTTP.
Значения ключа `detail` поясняет статус указанный в ключе `status`. Не может быть пустым.

Ключ | Тип | Обязательный | Описание
---- | --- | ------------ | --------
code | int | Yes | Код ошибки.
status | str | Yes | Статус ошибки.
time | int | Yes | Время когда произошла ошибка, в секундах со времени началы эпохи (Unix-время).
detail | str | Yes | Описание ошибки.

### Объект jsonapi

В объекте jsonapi передается версия протокола. Не может быть пустым.

Ключ | Тип | Обязательный | Описание
---- | --- | ------------ | --------
version | str | Yes | Версия протокола.

### Объект meta

Объект meta зарезервирован. В случае отсутствия данных значение поля `None`.

Ключ | Тип | Обязательный | Описание
---- | --- | ------------ | --------
meta | Any | No | Зарезервировано.

### Пример JSON-объекта

Содержание JSON-объекта в виде python dict содержащем все используемые поля.

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

### Схема валидации

"Эталонная" схема валидации данных. Используется для валидации запросов и ответов.

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
          "type": "number"
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
        "id": {
          "title": "Id",
          "type": "integer"
        },
        "username": {
          "title": "Username",
          "type": "string"
        }
      },
      "required": [
        "id",
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
        },
        "type": {
          "title": "Type",
          "type": "string"
        }
      },
      "required": [
        "id",
        "type"
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
          "type": "number"
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
          "type": "number"
        },
        "from_flow": {
          "$ref": "#/definitions/FromChat"
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
          "title": "uuid",
          "type": "integer"
        },
        "login": {
          "title": "Login",
          "type": "string"
        },
        "password": {
          "title": "Password",
          "type": "string"
        },
        "username": {
          "title": "Username",
          "type": "string"
        },
        "is_bot": {
          "title": "Is Bot",
          "type": "boolean"
        },
        "auth_id": {
          "title": "Auth Id",
          "type": "integer"
        },
        "email": {
          "title": "Email",
          "type": "string",
          "format": "email"
        },
        "avatar": {
          "title": "Avatar",
          "type": "string",
          "format": "binary"
        },
        "bio": {
          "title": "Bio",
          "type": "string"
        }
      },
      "required": [
        "uuid",
        "auth_id"
      ]
    },
    "Data": {
      "title": "Main data-object",
      "type": "object",
      "properties": {
        "time": {
          "title": "Time",
          "type": "number"
        },
        "chat": {
          "$ref": "#/definitions/Chat"
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
        "id": {
          "title": "Id",
          "type": "integer"
        },
        "time": {
          "title": "Time",
          "type": "number"
        },
        "status": {
          "title": "Status",
          "type": "string"
        },
        "code": {
          "title": "Code",
          "type": "integer"
        },
        "detail": {
          "title": "Detail",
          "type": "string"
        }
      },
      "required": [
        "id",
        "time",
        "status",
        "code",
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
Передача имени метода происходит как при запросе, так и при ответе.
Ниже описаны примеры запросов и ответы на них.
Запрос в котором указан неподдерживаемый тип метода всегда вернёт ошибку _400 Bad Request_.

### Метод get_update

Позволяет получить от сервера обновление информации (сообщений, чатов, пользовательских данных) за период.

Пример запроса:

```python
{
  'type': 'get_update',
  'data': {
    'time': 1594492370,
    'flow': {
      'id': 123
      },
    'user': {
      'uuid': 111111111,
      'auth_id': 'dks7sd9f6g4fg67vb78g65'
      },
    'meta': None
    },
  'jsonapi': {
    'version': '1.0'
    },
  'meta': None
  }
```

Пример ответа (успех):

```python
{
  'type': 'get_update',
  'data': {
    'time': 1594492370,
    'flow': {
      'id': 1254,
      'time': 1594492370,
      'type': 'chat',
      'title': 'Name Chat',
      'info': 'Info about this chat'
      },
    'message': {
      'id': 1,
      'text': 'some text...',
      'from_user': {
        'uuid': 1254,
        'username': 'Vasya'
        },
        'time': 1594492370,
        'from_flow': {
          'id': 123655455,
          'type': 'chat'
          },
        'file': {
          'picture': 'jkfikdkdsd',
          'video': 'sdfsdfsdf',
          'audio': 'fgfsdfsdfsdf',
          'document': 'adgdfhfgth'
          },
        'emoji': 'sfdfsdfsdf',
        'edited_message': {
          'time': 1594492370,
          'status': True
          },
        'reply_to': None
        },
    'user': {
      'uuid': 5855,
      'login': 'username1',
      'password': 'lksdjflksjfsd',
      'username': 'Vasya',
      'is_bot': True,
      'auth_id': '464645646464',
      'email': 'querty@querty.com',
      'avatar': 'fffdddddd',
      'bio': 'My bio'
      },
    'meta': None
    },
  'errors': {
    'code': 200,
    'status': 'OK',
    'time': 1594492370,
    'detail': 'successfully'
    },
  'jsonapi': {
    'version': '1.0'
    },
  'meta': None
    }
```

Пример ответа (ошибка):

```python
{
  'type': 'get_update',
  'data': None,
  'errors': {
    'code': 401,
    'status': 'Unauthorized',
    'time': 1594492370,
    'detail': 'Unauthorized'
    },
  'jsonapi': {
    'version': '1.0'
    },
  'meta': None
  }
```

### Метод send_message

Метод позволяет отправить сообщение другому клиенту. `Flow` может быть любой, не только `chat`.

Пример запроса:

```python
{
  'type': 'send_message',
  'data': {
    'flow': {
      'id': 123,
      'time': 1594492370,
      'type': 'chat'
      },
    'message': {
      'id': 858585,
      'text': 'Hello!',
      'from_user': {
        'uuid': 111111111,
        'username': 'User'
        },
      'time': 1594492370,
      'from_flow': {
        'id': 5656565656,
        'type': 'chat'
        },
      'file': {
        'picture': 'jkfikdkdsd',
        'video': 'sdfsdfsdf',
        'audio': 'fgfsdfsdfsdf',
        'document': 'adgdfhfgth'
        },
      'emoji': 'sfdfsdfsdf',
      'edited_message': {
        'time': 1594492370,
        'status': True
        },
      'reply_to': None
    },
    'user': {
      'uuid': 111111111,
      'auth_id': 'dks7sd9f6g4fg67vb78g65',
      },
    'meta': None
    },
  'jsonapi': {
    'version': '1.0'
    },
  'meta': None
  }
```

Пример ответа (успех):

```python
{
  'type': 'send_message',
  'data': {
    'time': 1594492370,
    'meta': None
    },
  'errors': {
    'code': 200,
    'status': 'OK',
    'time': 1594492370,
    'detail': 'successfully'
    },
  'jsonapi': {
    'version': '1.0'
    },
  'meta': None
  }
```

Пример ответа (ошибка):

```python
{
  'type': 'send_message',
  'data': None,
  'errors': {
    'code': 401,
    'status': 'Unauthorized',
    'time': 1594492370,
    'detail': 'Unauthorized'
    },
  'jsonapi': {
    'version': '1.0'
    },
  'meta': None
  }
```

### Метод all_messages

Метод позволяет получить все сообщения за период с начала времени `time` по настоящее время.

Пример запроса:

```python
{
  'type': 'all_messages',
  'data': {
    'time': 1594492370,
    'user': {
      'uuid': 111111111,
      'auth_id': 'dks7sd9f6g4fg67vb78g65'
      },
    'meta': None
    },
  'jsonapi': {
    'version': '1.0'
    },
  'meta': None
  }
```

Пример ответа (успех):

```python
{
  'type': 'all_messages',
  'data': {
    'time': 1594492370,
    'user': {
      'uuid': 556565656,
      'auth_id': 'jkds78dsids89ds89sd'
      }
    'message': {
      'id': 1,
      'text': 'some text...',
      'from_user': {
        'uuid': 1254,
        'username': 'Vasya'
        },
      'time': 1594492370,
      'from_flow': {
        'id': 123655455,
        'type': 'chat'
        },
        'file': {
          'picture': 'jkfikdkdsd',
          'video': 'sdfsdfsdf',
          'audio': 'fgfsdfsdfsdf',
          'document': 'adgdfhfgth'
          },
        'emoji': 'sfdfsdfsdf',
        'edited_message': {
            'time': 1594492370,
            'status': True
            },
        'reply_to': None
        },
      'meta': None
      },
  'errors': {
    'code': 200,
    'status': 'OK',
    'time': 1594492370,
    'detail': 'successfully'
    },
  'jsonapi': {
    'version': '1.0'
    },
  'meta': None
  }
```

Пример ответа (ошибка):

```python
{
  'type': 'all_message',
  'data': None,
  'errors': {
    'code': 401,
    'status': 'Unauthorized',
    'time': 1594492370,
    'detail': 'Unauthorized'
    },
  'jsonapi': {
    'version': '1.0'
    },
  'meta': None
  }
```

### Метод all_flow

Метод позволяет получить от сервера перечень и информацию обо всех потоках.

Пример запроса:

```python
{
  'type': 'all_flow',
  'data': {
    'user': {
      'uuid': 111111111,
      'auth_id': 'dks7sd9f6g4fg67vb78g65'
      },
  'meta': None
  },
  'jsonapi': {
    'version': '1.0'
    },
  'meta': None
  }
```

Пример ответа (успех):

```python
{
  'type': 'all_flow',
  'data': {
    'time': 1594492370,
    'user': {
      'id': 556565656,
      'auth_id': 'jkds78dsids89ds89sd'
       },
    'flow': {
      'id': 5655,
      'time': 1594492370,
      'type': 'chat',
      'title': 'Some chat',
      'info': 'Info from some chat'
      },
    'meta': None
    },
  'errors': {
    'code': 200,
    'status': 'OK',
    'time': 1594492370,
    'detail': 'successfully'
    },
  'jsonapi': {
    'version': '1.0'
    },
  'meta': None
  }
```

Пример ответа (ошибка):

```python
{
  'type': 'all_flow',
  'data': None,
  'errors': {
    'code': 401,
    'status': 'Unauthorized',
    'time': 1594492370,
    'detail': 'Unauthorized'
    },
  'jsonapi': {
    'version': '1.0'
    },
  'meta': None
  }
```

### Метод user_info

Метод позволяет клиенту получить от сервера информацию о своих настройках.

Пример запроса:

```python
{
  'type': 'user_info',
  'data': {
    'user': {
      'uuid': 111111111,
      'auth_id': 'dks7sd9f6g4fg67vb78g65'
      },
    'meta': None
    },
  'jsonapi': {
    'version': '1.0'
    },
  'meta': None
  }
```

Пример ответа:

```python
{
  'type': 'user_info',
  'data': {
    'time': 1594492370,
    'user': {
      'uuid': 5855,
      'login': 'username1',
      'password': 'lksdjflksjfsd',
      'username': 'Vasya',
      'is_bot': True,
      'auth_id': '464645646464',
      'email': 'querty@querty.com',
      'avatar': 'fffdddddd',
      'bio': 'My bio'
      },
    'meta': None
    },
  'errors': {
    'code': 200,
    'status': 'OK',
    'time': 1594492370,
    'detail': 'successfully'
    },
  'jsonapi': {
    'version': '1.0'
    },
  'meta': None
  }
```

Пример ответа (ошибка):

```python
{
  'type': 'user_info',
  'data': None,
  'errors': {
    'code': 401,
    'status': 'Unauthorized',
    'time': 1594492370,
    'detail': 'Unauthorized'
    },
  'jsonapi': {
    'version': '1.0'
    },
  'meta': None
  }
```

### Метод register_user

Метод позволяет зарегистрировать нового пользователя.

Пример запроса:

```python
{
  'type': 'register_user',
  'data': {
    'user': {
      'password': 'ds45ds45fd45fd',
      'login': 'User',
      'email': 'querty@querty.com',
      'username': 'User1'
      },
    'meta': None
    },
  'jsonapi': {
    'version': '1.0'
    },
  'meta': None
  }
```

Пример ответа (успех):

```python
{
  'type': 'register_user',
  'data': {
    'time': 1594492370,
    'user': {
      'uuid': 5654665416541,
      'auth_id': 'lkds89ds89fd98fd'
      },
    'meta': None
    },
  'errors': {
    'code': 200,
    'status': 'OK',
    'time': 1594492370,
    'detail': 'successfully'
    },
  'jsonapi': {
    'version': '1.0'
    },
  'meta': None
  }
```

Пример ответа (ошибка):

```python
{
  'type': 'register_user',
  'data': None,
  'errors': {
    'code': 400,
    'status': 'Bad Request',
    'time': 1594492370,
    'detail': 'Bad Request'
    },
  'jsonapi': {
    'version': '1.0'
    },
  'meta': None
  }
```

### Метод authentication

Метод позволяет клиенту пройти аутентификацию на сервере.

Пример запроса:

```python
{
  'type': 'auth',
  'data': {
    'user': {
      'password': 'ds45ds45fd45fd',
      'login': 'User'
      },
    'meta': None
    },
    'jsonapi': {
      'version': '1.0'
      },
  'meta': None
  }
```

Пример ответа (успех):

```python
{
  'type': 'auth',
  'data': {
    'time': 1594492370,
    'user': {
      'uuid': 5654665416541,
      'auth_id': 'lkds89ds89fd98fd'
      },
    'meta': None
    },
  'errors': {
    'code': 200,
    'status': 'OK',
    'time': 1594492370,
    'detail': 'successfully'
    },
  'jsonapi': {
    'version': '1.0'
    },
  'meta': None
  }
```

Пример ответа (ошибка):

```python
{
  'type': 'auth',
  'data': None,
  'errors': {
    'code': 401,
    'status': 'Unauthorized',
    'time': 1594492370,
    'detail': 'Unauthorized'
    },
  'jsonapi': {
    'version': '1.0'
    },
  'meta': None
  }
```

### Метод delete_user

Метод позволяет клиенту удалить пользователя.

Пример запроса:

```python
{
  'type': 'delete_user',
  'data': {
    'user': {
      'password': 'ds45ds45fd45fd',
      'login': 'User'
      },
    'meta': None
    },
  'jsonapi': {
    'version': '1.0'
    },
  'meta': None
  }
```

Пример ответа (успех):

```python
{
  'type': 'delete_user',
  'data': {
    'user': {
      'uuid': 5345634567354
      'login': 'User'
      },
    'meta': None
      },
    'errors': {
      'code': 200,
      'status': 'OK',
      'time': 1594492370,
      'detail': 'successfully'
      },
  'jsonapi': {
    'version': '1.0'
    },
  'meta': None
  }
```

Пример ответа (ошибка):

```python
{
  'type': 'delete_user',
  'data': None,
  'errors': {
    'code': 401,
    'status': 'Unauthorized',
    'time': 1594492370,
    'detail': 'Unauthorized'
    },
  'jsonapi': {
    'version': '1.0'
    },
  'meta': None
  }
```

### Метод delete_message

Метод позволяет клиенту удалить своё сообщение.

Пример запроса:

```python
{
  'type': 'delete_message',
  'data': {
    'message': {
      'id': 858585,
      'time': 1594492370
      },
    'user': {
      'uuid': 5345634567354,
      'auth_id': 'lkds89ds89fd98fd'
      },
    'meta': None
    },
  'jsonapi': {
    'version': '1.0'
    },
  'meta': None
  }
```

Пример ответа (успех):

```python
{
  'type': 'delete_message',
  'data': None,
  'errors': {
    'code': 200,
    'status': 'OK',
    'time': 1594492370,
    'detail': 'successfully'
    },
  'jsonapi': {
    'version': '1.0'
    },
  'meta': None
  }
```

Пример ответа (ошибка):

```python
{
  'type': 'delete_message',
  'data': None,
  'errors': {
    'code': 401,
    'status': 'Unauthorized',
    'time': 1594492370,
    'detail': 'Unauthorized'
    },
  'jsonapi': {
    'version': '1.0'
    },
  'meta': None
  }
```

### Метод edited_message

Метод позволяет клиенту отредактировать своё сообщение.

Пример запроса:

```python
{
  'type': 'edited_message',
  'data': {
      'message': {
        'id': 858585,
        'text': 'Hello!',
        'time': 1594492370
        },
      'user': {
        'uuid': 5345634567354,
        'auth_id': 'lkds89ds89fd98fd'
        },
      'meta': None
      },
  'jsonapi': {
    'version': '1.0'
    },
  'meta': None
  }
```

Пример ответа (успех):

```python
{
  'type': 'edited_message',
  'data': None,
  'errors': {
    'code': 200,
    'status': 'OK',
    'time': 1594492370,
    'detail': 'successfully'
    },
  'jsonapi': {
      'version': '1.0'
      },
  'meta': None
  }
```

Пример ответа (ошибка):

```python
{
  'type': 'edited_message',
  'data': None,
  'errors': {
    'code': 401,
    'status': 'Unauthorized',
    'time': 1594492370,
    'detail': 'Unauthorized'
    },
  'jsonapi': {
    'version': '1.0'
    },
  'meta': None
  }
```

### Метод ping-pong

Метод позволяет определить наличие связи между сервером и клиентом. При отсутствии ответа сервер удаляет сессию клиента из памяти.

Пример запроса:

```python
{
  'type': 'ping-pong',
  'data': {
    'user': {
      'uuid': 5345634567354,
      'auth_id': 'lkds89ds89fd98fd'
      },
    'meta': None
    },
  'jsonapi': {
    'version': '1.0'
    },
  'meta': None
  }
```

Пример ответа (успех):

```python
{
  'type': 'ping-pong',
  'data': None,
  'errors': {
    'code': 200,
    'status': 'OK',
    'time': 1594492370,
    'detail': 'successfully'
    },
  'jsonapi': {
    'version': '1.0'
    },
  'meta': None
  }
```

Пример ответа (ошибка):

```python
{
  'type': 'ping-pong',
  'data': None,
  'errors': {
    'code': 401,
    'status': 'Unauthorized',
    'time': 1594492370,
    'detail': 'Unauthorized'
    },
  'jsonapi': {
    'version': '1.0'
    },
  'meta': None
  }
```

### Метод error

В случае если запрос к серверу/клиенту им не распознан должен выдаваться стандартный тип ответа: `error`, который в себе содержит объект `errors` с описанием возникшей ошибки.

_В качестве примера приведен запрос клиента, без передачи ключа `type` и его значения. В ответ сервер посылает JSON-объект с указанием имени метода `error` и информацией о возникшей ошибке, в поле `errors`._

Пример запроса:

```python
{
  'data': {
    'uuid': 45654645,
    'auth_id': 'asdfadsfadfggzasd'
  }
}
```

Пример ответа:

```python
{
  'type': "error",
  'data': None,
  'errors': {
    'code': 400,
    'status': 'Bad Request',
    'time': 1594492370,
    'detail': 'Bad Request'
  },
  'jasonapi': {
    'version': '1.0'
  },
  'meta': None
}
```

## Описание ошибок

Информация о коде состояния запроса передается в поле `Errors`. Ниже приведены все варианты кодов состояния запроса.

### Код 200 статус 'Ok'

Команда выполнена успешно.

```python
'errors': {
  'code': 200,
  'status': 'OK',
  'time': 1594492370,
  'detail': 'successfully'
  }
```

### Код 201 статус 'Created'

Объект (пользователь) создан.

```python
'errors': {
  'code': 201,
  'status': 'Created',
  'time': 1594492370,
  'detail': 'Created'
  }
```

### Код 202 статус 'Accepted'

Информация переданная вместе с запросом принята.

```python
'errors': {
  'code': 202,
  'status': 'Accepted',
  'time': 1594492370,
  'detail': 'Accepted'
  }
```

### Код 400 статус 'Bad Request'

_Дополнить_

```python
'errors': {
  'code': 400,
  'status': 'Bad Request',
  'time': 1594492370,
  'detail': 'Bad Request'
  }
```

### Код 401 статус 'Unauthorized'

Ошибка авторизации. Неверный логин или пароль.

```python
'errors': {
  'code': 401,
  'status': 'Unauthorized',
  'time': 1594492370,
  'detail': 'Unauthorized'
  }
```

### Код 403 статус 'Forbidden'

_Дополнить_

```python
'errors': {
  'code': 403,
  'status': 'Forbidden',
  'time': 1594492370,
  'detail': 'Forbidden'
  }
```

### Код 404 статус 'Not Found'

Не найдена запрашиваемая информация или не найден пользователь.

```python
'errors': {
  'code': 404,
  'status': 'Not Found',
  'time': 1594492370,
  'detail': 'Not Found'
  }
```

### Код 405 статус 'Method Not Allowed'

Такой запрос недоступен. Возможно клиент использует старый API.

```python
'errors': {
  'code': 405,
  'status': 'Method Not Allowed',
  'time': 1594492370,
  'detail': 'Method Not Allowed'
  }
```

### Код 408 статус 'Request Timeout'

_Дополнить_

```python
'errors': {
  'code': 408,
  'status': 'Request Timeout',
  'time': 1594492370,
  'detail': 'Request Timeout'
  }
```

### Код 415 статус 'Unsupported Media Type'

Неподдерживаемый тип данных (не пройдена валидация).

```python
'errors': {
  'code': 415,
  'status': 'Unsupported Media Type',
  'time': 1594492370,
  'detail': 'Unsupported Media Type'
  }
```

### Код 417 статус 'Expectation Failed'

_Дополнить_

```python
'errors': {
  'code': 417,
  'status': 'Expectation Failed',
  'time': 1594492370,
  'detail': 'Expectation Failed'
  }
```

### Код 426 статус 'Upgrade Required'

_Дополнить_

```python
'errors': {
  'code': 426,
  'status': 'Upgrade Required',
  'time': 1594492370,
  'detail': 'Upgrade Required'
  }
```

### Код 429 статус 'Too Many Requests'

_Дополнить_

```python
'errors': {
  'code': 429,
  'status': 'Too Many Requests',
  'time': 1594492370,
  'detail': 'Too Many Requests'
  }
```

### Код 499 статус 'Client Closed Request'

_Дополнить_

```python
'errors': {
  'code': 499,
  'status': 'Client Closed Request',
  'time': 1594492370,
  'detail': 'Client Closed Request'
  }
```

### Код 500 статус 'Internal Server Error'

Серверу настала жопа.

```python
'errors': {
  'code': 500,
  'status': 'Internal Server Error',
  'time': 1594492370,
  'detail': 'Internal Server Error'
  }
```

### Код 503 статус 'Service Unavailable'

_Дополнить_

```python
'errors': {
  'code': 503,
  'status': 'Service Unavailable',
  'time': 1594492370,
  'detail': 'Service Unavailable'
  }
```

### Код 520 статус 'Unknown Error'

Неизвестная ошибка. Этот статус получают в том числе все исключения.

```python
'errors': {
  'code': 520,
  'status': 'Unknown Error',
  'time': 1594492370,
  'detail': 'Unknown Error'
  }
```


### Код 526 статус 'Invalid SSL Certificate'

Недействительный сертификат SSL.

```python
'errors': {
  'code': 526,
  'status': 'Invalid SSL Certificate',
  'time': 1594492370,
  'detail': 'Invalid SSL Certificate'
  }
```
