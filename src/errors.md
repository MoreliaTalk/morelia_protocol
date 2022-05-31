# Описание ошибок

Информация о коде состояния запроса передается в поле `errors`. Ниже приведены все варианты кодов состояния запроса.

## Код 200 статус "Ok"

Команда выполнена успешно.

```json
"errors": {
    "code": 200,
    "status": "OK",
    "time": 1594492370,
    "detail": "Successfully"
    }
```

## Код 201 статус "Created"

Объект (пользователь) создан.

```json
"errors": {
    "code": 201,
    "status": "Created",
    "time": 1594492370,
    "detail": "A new user has been created."
    }
```

## Код 202 статус "Accepted"

Информация переданная вместе с запросом принята.

```json
"errors": {
    "code": 202,
    "status": "Accepted",
    "time": 1594492370,
    "detail": "Information is accepted."
    }
```

## Код 206 статус "Partial Content"

Информация выдана частично. Такой статус служит для информирования о том, что запрос сервером выполнен успешно, но объём запрошенных данных больше чем сервер может передать.

```json
"errors": {
    "code": 206,
    "status": "Partial Content",
    "time": 1594492370,
    "detail": "Information provided partially."
    }
```

## Код 400 статус "Bad Request"

Запрос не распознан.

```json
"errors": {
    "code": 400,
    "status": "Bad Request",
    "time": 1594492370,
    "detail": "Request is not recognized."
    }
```

## Код 401 статус "Unauthorized"

Ошибка авторизации. Неверный логин или пароль.

```json
"errors": {
    "code": 401,
    "status": "Unauthorized",
    "time": 1594492370,
    "detail": "Wrong login or password."
    }
```

## Код 403 статус "Forbidden"

Объём запрошенной информации больше чем сервер может выдать.

```json
"errors": {
    "code": 403,
    "status": "Forbidden",
    "time": 1594492370,
    "detail": "Forbidden"
    }
```

## Код 404 статус "Not Found"

Не найдена запрашиваемая информация или не найден пользователь.

```json
"errors": {
    "code": 404,
    "status": "Not Found",
    "time": 1594492370,
    "detail": "The requested information was not found or the user was not found."
    }
```

## Код 405 статус "Method Not Allowed"

Такой запрос недоступен. Возможно клиент использует старый API.

```json
"errors": {
    "code": 405,
    "status": "Method Not Allowed",
    "time": 1594492370,
    "detail": "Such request is not available. Maybe the client uses an old API."
    }
```

## Код 408 статус "Request Timeout"

_Дополнить_

```json
"errors": {
    "code": 408,
    "status": "Request Timeout",
    "time": 1594492370,
    "detail": "Request Timeout"
    }
```

## Код 409 статус "Conflict"

Такой пользователь (поток) уже есть на сервере.

```json
"errors": {
    "code": 409,
    "status": "Conflict",
    "time": 1594492370,
    "detail": "Such user (flow) is already on the server."
    }
```

## Код 415 статус "Unsupported Media Type"

Неподдерживаемый тип данных (не пройдена валидация).

```json
"errors": {
    "code": 415,
    "status": "Unsupported Media Type",
    "time": 1594492370,
    "detail": "Unsupported data type (no validation passed)"
    }
```

## Код 417 статус "Expectation Failed"

_Дополнить_

```json
"errors": {
    "code": 417,
    "status": "Expectation Failed",
    "time": 1594492370,
    "detail": "Expectation Failed"
    }
```

## Код 426 статус "Upgrade Required"

_Дополнить_

```json
"errors": {
    "code": 426,
    "status": "Upgrade Required",
    "time": 1594492370,
    "detail": "Upgrade Required"
    }
```

## Код 429 статус "Too Many Requests"

Запрошено слишком большое количество данных (например при запросе информации о пользователях)

```json
"errors": {
    "code": 429,
    "status": "Too Many Requests",
    "time": 1594492370,
    "detail": "Too much data has been requested"
    }
```

## Код 499 статус "Client Closed Request"

_Дополнить_

```json
"errors": {
    "code": 499,
    "status": "Client Closed Request",
    "time": 1594492370,
    "detail": "Client Closed Request"
    }
```

## Код 500 статус "Internal Server Error"

Серверу настала жопа.

```json
"errors": {
    "code": 500,
    "status": "Internal Server Error",
    "time": 1594492370,
    "detail": "The server got its ass."
    }
```

## Код 503 статус "Service Unavailable"

_Дополнить_

```json
"errors": {
    "code": 503,
    "status": "Service Unavailable",
    "time": 1594492370,
    "detail": "Service Unavailable"
    }
```

## Код 505 статус "Version Not Supported"

Версия протокола не поддерживается.

```json
"errors": {
    "code": 505,
    "status": "Version Not Supported",
    "time": 1594492370,
    "detail": "Version Not Supported"
    }
```

## Код 520 статус "Unknown Error"

Неизвестная ошибка. Этот статус получают все исключения `Exception` которые были вызваны ошибками на стороне сервера.

```json
"errors": {
    "code": 520,
    "status": "Unknown Error",
    "time": 1594492370,
    "detail": "Unknown Error"
    }
```

## Код 526 статус "Invalid SSL Certificate"

Недействительный сертификат SSL.

```json
"errors": {
    "code": 526,
    "status": "Invalid SSL Certificate",
    "time": 1594492370,
    "detail": "Invalid SSL Certificate"
    }
```
