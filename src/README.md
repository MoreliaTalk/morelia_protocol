# Официальная документация протокола MTP

Актуально на: **12.01.2022**

Версия протокола: **1.0** Редакция протокола: **17**

MTP (MoreliaTalk protocol) создан для унификации взаимодействия между клиентом и сервером в MoreliaTalk Network.
Интерфейс взаимодействия реализован через вебсокеты. Приложения общаются между собой путём отправки JSON-файла со структурой описанной ниже.


## Описание методов

Имя метода передается как значение поля `type` внутри объекта сериализованного как строка с JSON-форматированием.
Передача имени метода происходит как при запросе, так и при ответе. Ниже описаны примеры запросов и ответы на них.

_Примечание:_

- запрос в котором указан неподдерживаемый тип метода или вовсе отсутствует указание на тип метода вернёт ошибку [405 Method Not Allowed](#код-405-статус-method-not-allowed)
- запрос который не проходит валидацию вернёт ошибку [415 Unsupported Media Type](#код-415-статус-unsupported-media-type).

### Метод register_user

Метод позволяет зарегистрировать нового пользователя.
В поле `password` клиент передает не пароль, а хэш от пароля который был получен клиентом самостоятельно.
В ответ сервер отправляет клиенту его уникальный номер `uuid` токен и время жизни сессии `auth_id` и `token_ttl` соответственно.


Пример запроса:

```json
{
    "type": "register_user",
    "data": {
        "user": [{
            "password": "ds45ds45fd45fd",
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

```json
{
    "type": "register_user",
    "data": {
        "time": 234345345435,
        "user": [{
            "uuid": "1234567",
            "auth_id": "35fg673g56fggfg735jg67",
            "token_ttl": 6000
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

```json
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

### Метод register_user

Метод позволяет зарегистрировать нового пользователя.

Пример запроса:

```json
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

```json
{
    "type": "register_user",
    "data": {
        "user": [{
            "uuid": "1234567",
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

```json
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

### Метод get_update

Позволяет получить от сервера обновление общедоступной информации (сообщений, чатов, пользовательских данных) за период от времени `time` до текущего времени.

Пример запроса:

```json
{
    "type": "get_update",
    "data": {
        "time": 1594492370,
        "user": [{
            "uuid": "1234567",
            "auth_id": "dks7sd9f6g4fg67vb78g65",
            "token_ttl": 6000,
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

```json
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
            "bio": "My bio",
            "time_created": 345345345345
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

```json
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

```json
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

```json
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

```json
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

```json
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

```json
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

```json
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

```json
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

Пример ответа (успех, более 100 сообщений):

```json
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
        "version": "1.0"
        },
    "meta": null
    }
```

Пример ответа (ошибка):

```json
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

```json
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

```json
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

Пример запроса (создание chat):

```json
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
        "version": "1.0"
        },
    "meta": null
    }
```

Пример ответа (успех):

```json
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

```json
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

```json
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

```json
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

```json
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

```json
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

```json
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
            "bio": "My bio",
            "time_created": 345345345345
            },{
            "uuid": "1234569",
            "login": "maria_pele0",
            "username": "Marta",
            "is_bot": false,
            "avatar": "fffdddddd",
            "bio": "My bio",
            "time_created": 345345345345
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

```json
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

```json
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

```json
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

Метод позволяет клиенту пройти процедуру подтверждения своей личности (аутентификацию) на сервере.
Сервер проверяет наличие логина и пароля в базе данных и если клиент с такими данными существует, в ответе указывается `uuid`, токен `auth_id` и время его жизни `token_ttl`.


Пример запроса:

```json
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

```json
{
    "type": "authentication",
    "data": {
        "time": 2345345,
        "user": [{
            "uuid": "1234567",
            "auth_id": "lkds89ds89fd98fd",
            "token_ttl": 6000
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

```json
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
- содержимое поля `password`, `hashPassword` и `auth_id`, `time_created` заменяется на случайным образом сгенерированное число размером 64 символа.

Пример запроса:

```json
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

```json
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

```json
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

```json
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

```json
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

```json
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

```json
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

```json
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

```json
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

```json
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

```json
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

```json
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

```json
{
    "data": {
        "uuid": "1234567",
        "auth_id": "asdfadsfadfggzasd"
        }
}
```

Пример ответа:

```json
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

```json
"errors": {
    "code": 200,
    "status": "OK",
    "time": 1594492370,
    "detail": "Successfully"
    }
```

### Код 201 статус "Created"

Объект (пользователь) создан.

```json
"errors": {
    "code": 201,
    "status": "Created",
    "time": 1594492370,
    "detail": "A new user has been created."
    }
```

### Код 202 статус "Accepted"

Информация переданная вместе с запросом принята.

```json
"errors": {
    "code": 202,
    "status": "Accepted",
    "time": 1594492370,
    "detail": "Information is accepted."
    }
```

### Код 206 статус "Partial Content"

Информация выдана частично. Такой статус служит для информирования о том, что запрос сервером выполнен успешно, но объём запрошенных данных больше чем сервер может передать.

```json
"errors": {
    "code": 206,
    "status": "Partial Content",
    "time": 1594492370,
    "detail": "Information provided partially."
    }
```

### Код 400 статус "Bad Request"

Запрос не распознан.

```json
"errors": {
    "code": 400,
    "status": "Bad Request",
    "time": 1594492370,
    "detail": "Request is not recognized."
    }
```

### Код 401 статус "Unauthorized"

Ошибка авторизации. Неверный логин или пароль.

```json
"errors": {
    "code": 401,
    "status": "Unauthorized",
    "time": 1594492370,
    "detail": "Wrong login or password."
    }
```

### Код 403 статус "Forbidden"

Объём запрошенной информации больше чем сервер может выдать.

```json
"errors": {
    "code": 403,
    "status": "Forbidden",
    "time": 1594492370,
    "detail": "Forbidden"
    }
```

### Код 404 статус "Not Found"

Не найдена запрашиваемая информация или не найден пользователь.

```json
"errors": {
    "code": 404,
    "status": "Not Found",
    "time": 1594492370,
    "detail": "The requested information was not found or the user was not found."
    }
```

### Код 405 статус "Method Not Allowed"

Такой запрос недоступен. Возможно клиент использует старый API.

```json
"errors": {
    "code": 405,
    "status": "Method Not Allowed",
    "time": 1594492370,
    "detail": "Such request is not available. Maybe the client uses an old API."
    }
```

### Код 408 статус "Request Timeout"

_Дополнить_

```json
"errors": {
    "code": 408,
    "status": "Request Timeout",
    "time": 1594492370,
    "detail": "Request Timeout"
    }
```

### Код 409 статус "Conflict"

Такой пользователь (поток) уже есть на сервере.

```json
"errors": {
    "code": 409,
    "status": "Conflict",
    "time": 1594492370,
    "detail": "Such user (flow) is already on the server."
    }
```

### Код 415 статус "Unsupported Media Type"

Неподдерживаемый тип данных (не пройдена валидация).

```json
"errors": {
    "code": 415,
    "status": "Unsupported Media Type",
    "time": 1594492370,
    "detail": "Unsupported data type (no validation passed)"
    }
```

### Код 417 статус "Expectation Failed"

_Дополнить_

```json
"errors": {
    "code": 417,
    "status": "Expectation Failed",
    "time": 1594492370,
    "detail": "Expectation Failed"
    }
```

### Код 426 статус "Upgrade Required"

_Дополнить_

```json
"errors": {
    "code": 426,
    "status": "Upgrade Required",
    "time": 1594492370,
    "detail": "Upgrade Required"
    }
```

### Код 429 статус "Too Many Requests"

Запрошено слишком большое количество данных (например при запросе информации о пользователях)

```json
"errors": {
    "code": 429,
    "status": "Too Many Requests",
    "time": 1594492370,
    "detail": "Too much data has been requested"
    }
```

### Код 499 статус "Client Closed Request"

_Дополнить_

```json
"errors": {
    "code": 499,
    "status": "Client Closed Request",
    "time": 1594492370,
    "detail": "Client Closed Request"
    }
```

### Код 500 статус "Internal Server Error"

Серверу настала жопа.

```json
"errors": {
    "code": 500,
    "status": "Internal Server Error",
    "time": 1594492370,
    "detail": "The server got its ass."
    }
```

### Код 503 статус "Service Unavailable"

_Дополнить_

```json
"errors": {
    "code": 503,
    "status": "Service Unavailable",
    "time": 1594492370,
    "detail": "Service Unavailable"
    }
```

### Код 505 статус "Version Not Supported"

Версия протокола не поддерживается.

```json
"errors": {
    "code": 505,
    "status": "Version Not Supported",
    "time": 1594492370,
    "detail": "Version Not Supported"
    }
```

### Код 520 статус "Unknown Error"

Неизвестная ошибка. Этот статус получают все исключения `Exception` которые были вызваны ошибками на стороне сервера.

```json
"errors": {
    "code": 520,
    "status": "Unknown Error",
    "time": 1594492370,
    "detail": "Unknown Error"
    }
```

### Код 526 статус "Invalid SSL Certificate"

Недействительный сертификат SSL.

```json
"errors": {
    "code": 526,
    "status": "Invalid SSL Certificate",
    "time": 1594492370,
    "detail": "Invalid SSL Certificate"
    }
```
