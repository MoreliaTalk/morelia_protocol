# Официальная документация протокола MoreliaTalk Network

Актуально на: **24.07.2020**

Версия протокола: **1.0**

MoreliaTalk protocol создан для унификации взаимодействия между клиентом и сервером, используется в MoreliaTalk Network.
Интерфейс взаимодействия реализован через ВебСокеты, путём отправки JSON-объекта. Значение первого поля JSON-объекта является именем метода.

Содержание:

* [Описание API](#%D0%BE%D0%BF%D0%B8%D1%81%D0%B0%D0%BD%D0%B8%D0%B5-api)
  * [Объект type](#%D0%BE%D0%B1%D1%8A%D0%B5%D0%BA%D1%82-type)
  * [Объект data](#%D0%BE%D0%B1%D1%8A%D0%B5%D0%BA%D1%82-data)
  * [Объект chat](#%D0%BE%D0%B1%D1%8A%D0%B5%D0%BA%D1%82-chat)
  * [Объект message](#%D0%BE%D0%B1%D1%8A%D0%B5%D0%BA%D1%82-message)
  * [Объект from_user](#%D0%BE%D0%B1%D1%8A%D0%B5%D0%BA%D1%82-from_user)
  * [Объект from_flow](#%D0%BE%D0%B1%D1%8A%D0%B5%D0%BA%D1%82-from_flow)
  * [Объект file](#%D0%BE%D0%B1%D1%8A%D0%B5%D0%BA%D1%82-file)
  * [Объект edited_message](#%D0%BE%D0%B1%D1%8A%D0%B5%D0%BA%D1%82-edited_message)
  * [Объект user](#%D0%BE%D0%B1%D1%8A%D0%B5%D0%BA%D1%82-user)
  * [Объект errors](#%D0%BE%D0%B1%D1%8A%D0%B5%D0%BA%D1%82-errors)
  * [Объект jsonapi](#%D0%BE%D0%B1%D1%8A%D0%B5%D0%BA%D1%82-jsonapi)
  * [Объект meta](#%D0%BE%D0%B1%D1%8A%D0%B5%D0%BA%D1%82-meta)
* [Пример JSON-объекта](#%D0%BF%D1%80%D0%B8%D0%BC%D0%B5%D1%80-json-%D0%BE%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%D0%B0)
* [Схема валидации](#%D1%81%D1%85%D0%B5%D0%BC%D0%B0-%D0%B2%D0%B0%D0%BB%D0%B8%D0%B4%D0%B0%D1%86%D0%B8%D0%B8)
* [Описание методов](#%D0%BE%D0%BF%D0%B8%D1%81%D0%B0%D0%BD%D0%B8%D0%B5-%D0%BC%D0%B5%D1%82%D0%BE%D0%B4%D0%BE%D0%B2)
  * [Метод get_update](#%D0%BC%D0%B5%D1%82%D0%BE%D0%B4-get_update)
  * [Метод send_message](#%D0%BC%D0%B5%D1%82%D0%BE%D0%B4-send_message)
  * [Метод all_messages](#%D0%BC%D0%B5%D1%82%D0%BE%D0%B4-all_messages)
  * [Метод all_flow](#%D0%BC%D0%B5%D1%82%D0%BE%D0%B4-all_flow)
  * [Метод user_info](#%D0%BC%D0%B5%D1%82%D0%BE%D0%B4-user_info)
  * [Метод register_user](#%D0%BC%D0%B5%D1%82%D0%BE%D0%B4-register_user)
  * [Метод authentication](#%D0%BC%D0%B5%D1%82%D0%BE%D0%B4-authentication)
  * [Метод delete_user](#%D0%BC%D0%B5%D1%82%D0%BE%D0%B4-delete_user)
  * [Метод delete_message](#%D0%9C%D0%B5%D1%82%D0%BE%D0%B4-delete_message)
  * [Метод edited_message](#%D0%9C%D0%B5%D1%82%D0%BE%D0%B4-edited_message)
* [Описание ошибок](#%D0%9E%D0%BF%D0%B8%D1%81%D0%B0%D0%BD%D0%B8%D0%B5-%D0%BE%D1%88%D0%B8%D0%B1%D0%BE%D0%BA)
  * [Код 200 статус 'Ok'](#%D0%9A%D0%BE%D0%B4-200-%D1%81%D1%82%D0%B0%D1%82%D1%83%D1%81-%27Ok%27)
  * [Код 400 статус 'Bad Request'](#%D0%9A%D0%BE%D0%B4-400-%D1%81%D1%82%D0%B0%D1%82%D1%83%D1%81-%27Bad-Request%27)

## Описание API

Запросы между клиентом и сервером передаются в виде JSON-объекта. Запрос в котором указан неподдерживаемый тип метода всегда вернёт ошибку _400 Bad Request_.

* Первая пара _ключ:значение_ (объект `Type`) устанавливает тип метода. Клиент/сервер обрабатывают запрос в соответсвии с типом метода.
* Вторая пара _ключ:значение_ (объект `Data`) передает массив данных соответствующих запросу.
* Третья пара _ключ:значение_ (объект `JSONapi`) передает информацию о статусе выполенения запроса, коды статусов соответствуют кодам протокола HTTP.
* Четвёртая пара _ключ:значение_ (объект `JSONapi`) передает информацию об используемом протоколе.
* Пятая пара _ключ:значение_ (объект `Meta`) резервная, для дальнейшего расширения протокола.

Ниже перечислены все возможные поля JSON-объекта.

### Объект type

В объекте Type передается тип метода.

Ключ | Тип | Обязательный | Описание
---- | --- | ------------ | --------
type | str | Yes | Уникальное имя метода из следующего списка: all_flow, all_messages, authentication, get_update, register_user, send_message, user_info, delete_user.

### Объект data

В объекте Data передается основной массив информации.

Ключ | Тип | Обязательный | Описание
---- | --- | ------------ | --------
time | float | Yes | Время на сервере, в секунда со времени началы эпохи (Unix-время).
chat | chat | No | Объект данных в виде массива типа dict.
message | message | No | Объект данных в виде массива типа dict.
user | user | No | Объект данных в виде массива типа dict.
meta | str | No | Зарезервировано.

### Объект flow

В объекте Flow передается полная информация о потоке (чате, канале, группе).
Всего существуют три типа потока:

* chat (2 пишут, 2 читают)
* channel (1 пишет, многие читают)
* group (многие пишут, многие читают)

Ключ | Тип | Обязательный | Описание
---- | --- | ------------ | --------
id | int | Yes | Уникальный номер чата.
time | float | Yes | Время обновления чата.
type | str | Yes | Тип потока.
title | str | Yes | Персональное имя чата (может быть не уникальным).
info | str | No | Описание чата.

### Объект message

В объекте message передается информация о сообщении.

Ключ | Тип | Обязательный | Описание
---- | --- | ------------ | --------
id | int | Yes | Уникальный номер сообщения.
text | str | Yes | Текст сообщения.
from_user | from_user | Yes | Объект в ввиде массива типа dict. Информация о пользователе который написал это сообщение.
time | float | Yes | Время когда сообщение было написано.
from_flow | from_flow | Yes | Объект в ввиде массива типа dict. Информация к какому чату принадлежит это сообщение.
file | file | No | Объект в ввиде массива типа dict. Файл-вложение к сообщению (аудио, видео, фото, документ).
emoji | bytes | No | Тип емоджи (в виде файла).
edited_message | edited_message | No | Объект в ввиде массива типа dict. Информация о редактировании сообщения, а так же о дате редактирования.
reply_to | Any | No | Ссылка на цитируемое сообщение.

### Объект from_user

В объекте from_user передается информация о пользователе который написал сообщение.

Ключ | Тип | Обязательный | Описание
---- | --- | ------------ | --------
id | int | Yes | Уникальный номер пользователя.
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
time | float | Yes | Время когда пользователь последний раз исправил сообщение.
status | bool | Yes | Статус сообщения (исправлено или нет).

### Объект user

В объекте user передается информация о пользователе (настройки пользователя).

Ключ | Тип | Обязательный | Описание
---- | --- | ------------ | --------
id | int | Yes | Уникальный номер пользователя.
bio | str | No | Информация о пользователе.
avatar | bytes | No | Изображение пользователя.
password | str | Yes | Пароль пользователя.
login | str | Yes | Логин пользователя.
is_bot | bool | Yes | Указывает на тип пользователя (бот или человек).
auth_id | bytes | Yes | Хэш пароля.
email | EmailStr | Yes | Контактная информация (адрес почты) пользователя.
username | str | Yes | Имя пользователя (не уникальное).

### Объект errors

В объекте errors передается информация о результате выполнения запроса.
Коды ошибок (и их значения) соответствуют кодам протокола HTTP.

Ключ | Тип | Обязательный | Описание
---- | --- | ------------ | --------
id | int | Yes | Уникальный номер ошибки
time | float | Yes | Время когда произошла ошибка
status | str | Yes | Статус ошибки.
code | int | Yes | Код ошибки.
detail | str | Yes | Описание ошибки.

### Объект jsonapi

В объекте jsonapi передается версия протокола.

Ключ | Тип | Обязательный | Описание
---- | --- | ------------ | --------
version | float | Yes | Версия протокола.

### Объект meta

Объект meta зарезервирован.

Ключ | Тип | Обязательный | Описание
---- | --- | ------------ | --------
meta | Any | No | Зарезервировано.

### Пример JSON-объекта

Содержание JSON-объекта в виде python dict содержащем все используемые поля.

```python
{
    'type': 'user_info',
    'data': {
        'time': 1594492370.5225992,
        'flow': {
            'id': 1254,
            'time': 1594492370.5225992,
            'type': 'chat',
            'title': 'Name Chat',
            'info': 'Info about this chat'
            },
        'message': {
            'id': 1,
            'text': 'some text...',
            'from_user': {
                'id': 1254,
                'username': 'Vasya'
                },
            'time': 1594492370.5225992,
            'from_flow': {
                'id': 123655455,
                'type': 'chat'
                },
            'file': {
                'picture': 'jkfikdkdsd',
                'video': 'sdfsdfsdf',
                'audio': 'fgfsdfsdfsdf',
                'document': ''
                },
            'emoji': 'sfdfsdfsdf',
            'edited_message': {
                'time': 1594492370.5225992,
                'status': True
                },
            'reply_to': None
            },
        'user': {
            'id': 5855,
            'login': 'username1',
            'password': 'lksdjflksjfsd',
            'username': 'Vasya',
            'is_bot': True,
            'auth_id': '464645646464',
            'email': 'stepan.skrjabin@gmail.com',
            'avatar': 'fffdddddd',
            'bio': 'My bio'
            },
        'meta': None
        },
    'errors': {
        'id': 25665546,
        'time': 1594492370.5225992,
        'status': 'OK',
        'code': 200,
        'detail': 'successfully'
        },
    'jsonapi': {
        'version': None
        },
    'meta': None
    }
```

### Схема валидации

"Эталонная" схема валидации данных.

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
        "id": {
          "title": "Id",
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
        "id",
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

Имя метода передается как значение ключа type внутри JSON-объекта.
Передача имени метода происходит как при запросе, так и при ответе.
Ниже описаны примеры запросов и ответы на них.
Запрос в котором указан неподдерживаемый тип метода всегда вернёт ошибку _400 Bad Request_.

### Метод get_update

Позволяет получить от сервера обновление информации (сообщений, чатов, пользовательских данных) за период:

Пример запроса:

```python
{
    'type': 'get_update',
    'data': {
        'time': 1594492370.5225992,
        'flow': {
            'id': 123
            },
        'user': {
            'id': 111111111,
            'auth_id': 'dks7sd9f6g4fg67vb78g65'
            },
        'meta': None
        },
    'jsonapi': {
        'version': 1.0
        },
    'meta': None
    }
```

Пример ответа:

```python
{
    'type': 'get_update',
    'data': {
        'time': 1594492370.5225992,
        'flow': {
            'id': 1254,
            'time': 1594492370.5225992,
            'type': 'chat',
            'title': 'Name Chat',
            'info': 'Info about this chat'
            },
        'message': {
            'id': 1,
            'text': 'some text...',
            'from_user': {
                'id': 1254,
                'username': 'Vasya'
                },
            'time': 1594492370.5225992,
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
                'time': 1594492370.5225992,
                'status': True
                },
            'reply_to': None
            },
        'user': {
            'id': 5855,
            'login': 'username1',
            'password': 'lksdjflksjfsd',
            'username': 'Vasya',
            'is_bot': True,
            'auth_id': '464645646464',
            'email': 'stepan.skrjabin@gmail.com',
            'avatar': 'fffdddddd',
            'bio': 'My bio'
            },
        'meta': None
        },
    'errors': {
        'id': 25665546,
        'time': 1594492370.5225992,
        'status': 'OK',
        'code': 200,
        'detail': 'successfully'
        },
    'jsonapi': {
        'version': 1.0
        },
    'meta': None
    }
```

### Метод send_message

Метод позволяет отправить сообщение другому клиенту.

Пример запроса:

```python
{
    'type': 'send_message',
    'data': {
        'flow': {
            'id': 123,
            'time': 1594492370.5225992,
            'type': 'chat'
            },
        'message': {
            'id': 858585,
            'text': 'Hello!',
            'from_user': {
                'id': 111111111,
                'username': 'User'
            },
            'time': 1594492370.5225992,
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
            },
            'edited_message': {
                'time': 1594492370.5225992,
                'status': True
                },
            'reply_to': None
        'user': {
            'id': 111111111,
            'auth_id': 'dks7sd9f6g4fg67vb78g65',
            },
        'meta': None
        },
    'jsonapi': {
        'version': 1.0
        },
    'meta': None
    }
```

Пример ответа:

```python
{
    'type': 'send_message',
    'data': {
        'time': 1594492370.5225992,
        'meta': None
        },
    'errors': {
        'id': 25665546,
        'time': 1594492370.5225992,
        'status': 'OK',
        'code': 200,
        'detail': 'successfully'
        },
    'jsonapi': {
        'version': 1.0
        },
    'meta': None
    }
```

### Метод all_messages

Метод позволяет получить все сообщения за произвольный период.

Пример запроса:

```python
{
    'type': 'all_messages',
    'data': {
        'time': 1594492370.5225992,
        'user': {
            'id': 111111111,
            'auth_id': 'dks7sd9f6g4fg67vb78g65'
            },
        'meta': None
        },
    'jsonapi': {
        'version': 1.0
        },
    'meta': None
    }
```

Пример ответа:

```python
{
    'type': 'all_messages',
    'data': {
        'time': 1594492370.5225992,
        'user': {
            'id': 556565656,
            'auth_id': 'jkds78dsids89ds89sd'
        }
        'message': {
            'id': 1,
            'text': 'some text...',
            'from_user': {
                'id': 1254,
                'username': 'Vasya'
                },
            'time': 1594492370.5225992,
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
                'time': 1594492370.5225992,
                'status': True
                },
            'reply_to': None
            },
        'user': {
            'id': 5855,
            'login': 'username1',
            'password': 'lksdjflksjfsd',
            'username': 'Vasya',
            'is_bot': True,
            'auth_id': '464645646464',
            'email': 'stepan.skrjabin@gmail.com',
            'avatar': 'fffdddddd',
            'bio': 'My bio'
            },
        'meta': None
        },
    'errors': {
        'id': 25665546,
        'time': 1594492370.5225992,
        'status': 'OK',
        'code': 200,
        'detail': 'successfully'
        },
    'jsonapi': {
        'version': 1.0
        },
    'meta': None
    }
```

### Метод all_flow

Метод позволяет получить от сервера перечень и нформацию обо всех чатах.
Под чатами подразумеваются чаты, группы, каналы.

Пример запроса:

```python
{
    'type': 'all_flow',
    'data': {
        'user': {
            'id': 111111111,
            'auth_id': 'dks7sd9f6g4fg67vb78g65'
            },
        'meta': None
        },
    'jsonapi': {
        'version': 1.0
        },
    'meta': None
    }
```

Пример ответа:

```python
{
    'type': 'all_flow',
    'data': {
        'time': 1594492370.5225992,
        'user': {
            'id': 556565656,
            'auth_id': 'jkds78dsids89ds89sd'
            },
        'flow': {
            'id': 5655,
            'time': 1594492370.5225992,
            'type': 'chat',
            'title': 'Some chat',
            'info': 'Info from some chat'
            },
        'meta': None
        },
    'errors': {
        'id': 25665546,
        'time': 1594492370.5225992,
        'status': 'OK',
        'code': 200,
        'detail': 'successfully'
        },
    'jsonapi': {
        'version': 1.0
        },
    'meta': None
    }
```

### Метод user_info

Метод позволяет получить от сервера информацию о настройках пользователя:

Пример запроса:

```python
{
    'type': 'user_info',
    'data': {
        'user': {
            'id': 111111111,
            'auth_id': 'dks7sd9f6g4fg67vb78g65'
            },
        'meta': None
        },
    'jsonapi': {
        'version': 1.0
        },
    'meta': None
    }
```

Пример ответа:

```python
{
    'type': 'user_info',
    'data': {
        'time': 1594492370.5225992,
        'user': {
            'id': 5855,
            'login': 'username1',
            'password': 'lksdjflksjfsd',
            'username': 'Vasya',
            'is_bot': True,
            'auth_id': '464645646464',
            'email': 'stepan.skrjabin@gmail.com',
            'avatar': 'fffdddddd',
            'bio': 'My bio'
            },
        'meta': None
        },
    'errors': {
        'id': 25665546,
        'time': 1594492370.5225992,
        'status': 'OK',
        'code': 200,
        'detail': 'successfully'
        },
    'jsonapi': {
        'version': 1.0
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
            'email': 'qwwer@qwer.ru',
            'username': 'User1'
            },
        'meta': None
        },
    'jsonapi': {
        'version': 1.0
        },
    'meta': None
    }
```

Пример ответа:

```python
{
    'type': 'register_user',
    'data': {
        'time': 1594492370.5225992,
        'user': {
            'id': 5654665416541,
            'auth_id': 'lkds89ds89fd98fd'
            },
        'meta': None
        },
    'errors': {
        'id': 25665546,
        'time': 1594492370.5225992,
        'status': 'OK',
        'code': 200,
        'detail': 'successfully'
        },
    'jsonapi': {
        'version': 1.0
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
            'login': 'User',
            'username': 'User1'
            },
        'meta': None
        },
    'jsonapi': {
        'version': 1.0
        },
    'meta': None
    }
```

Пример ответа:

```python
{
    'type': 'auth',
    'data': {
        'time': 1594492370.5225992,
        'user': {
            'id': 5654665416541,
            'auth_id': 'lkds89ds89fd98fd'
            },
        'meta': None
        },
    'errors': {
        'id': 25665546,
        'time': 1594492370.5225992,
        'status': 'OK',
        'code': 200,
        'detail': 'successfully'
        },
    'jsonapi': {
        'version': 1.0
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
            'login': 'User',
            'username': 'User1'
            },
        'meta': None
        },
    'jsonapi': {
        'version': 1.0
        },
    'meta': None
    }
```

Пример ответа:

```python
{
    'type': 'delete_user',
    'data': {
        'user': {
            'id': 5345634567354
            'login': 'User',
            'auth_id': 'lkds89ds89fd98fd'
            },
        'meta': None
        },
    'errors': {
        'id': 25665546,
        'time': 1594492370.5225992,
        'status': 'OK',
        'code': 200,
        'detail': 'successfully'
        },
    'jsonapi': {
        'version': 1.0
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
        'flow': {
            'id': 123
            },
        'message': {
            'id': 858585,
            'time': 1594492370.5225992
            },
        'user': {
            'id': 5345634567354,
            'auth_id': 'lkds89ds89fd98fd'
            },
        'meta': None
        },
    'jsonapi': {
        'version': 1.0
        },
    'meta': None
    }
```

Пример ответа:

```python
{
    'type': 'delete_message',
    'data': None,
    'errors': {
        'id': 25665546,
        'time': 1594492370.5225992,
        'status': 'OK',
        'code': 200,
        'detail': 'successfully'
        },
    'jsonapi': {
        'version': 1.0
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
        'flow': {
            'id': 123
            },
        'message': {
            'id': 858585,
            'text': 'Hello!',
            'time': 1594492370.5225992
            },
        'user': {
            'id': 5345634567354,
            'auth_id': 'lkds89ds89fd98fd'
            },
        'meta': None
        },
    'jsonapi': {
        'version': 1.0
        },
    'meta': None
    }
```

Пример ответа:

```python
{
    'type': 'edited_message',
    'data': None,
    'errors': {
        'id': 25665546,
        'time': 1594492370.5225992,
        'status': 'OK',
        'code': 200,
        'detail': 'successfully'
        },
    'jsonapi': {
        'version': 1.0
        },
    'meta': None
    }
```

## Описание ошибок

### Код 200 статус 'Ok'

### Код 400 статус 'Bad Request'

