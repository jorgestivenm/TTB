# TTB - Prueba técnica Bancolombia
_Este proyecto está basado en una API REST la cual contiene un CRUD de usuario implementado una base de datos Dynamo en AWS, adicionalmente esta dockerizada y lista para su despliegue en una instancia linux de AWS (EC2)_
 
_La aplicación cuenta con los siguientes métodos:_
* [POST /api/user] - Este método permite crear un usuario recibiendo como parámetro de entrada un objeto JSON con la siguiente estructura:
```json
{
   "username": "Johnny",
   "age": 28,
   "password": "Admin12345",
   "email": "jhonny.smith@example.com"
}
```
* [GET /api/users] - Este método permite consultar la lista de usuarios almacenados en base de datos.
 Respuesta:
```json
{
   "message": "Users found",
   "data": {
       "1": {
           "username": "Johnny",
           "email": "jhonny.smith@example.com",
           "userid": 1,
           "age": 28
       }
   }
}
```
* [GET /api/user] - Este método  permite consultar un usuario específico enviando como queryparam userid={ID del usuario}.
 Respuesta:
```json
{
   "message": "User found",
   "data": {
           "username": "Johnny",
           "email": "jhonny.smith@example.com",
           "userid": 1,
           "age": 28
       }
   }
}
```
* [PUT /api/user] - Este método permite actualizar la información del usuario como username, age ya que el userid y el email son usados como primary key y sort key.
 
* [DELETE /api/user] - Este método permite eliminar un usuario de la base de datos enviando como queryparam userid={ID del usuario}
 
[Nota]: Para hacer uso de los métodos se deberá realizar una autenticación básica ("Authorization", "basic ") usando el email como usuario y el password con el que se creó el usuario.
## - Instrucciones de instalación
_Para hacer uso de este proyecto debes seguir los siguientes pasos_
 
## - Clonar el repositorio
```
git clone https://github.com/jorgestivenm/TTB.git
```
## - Instalar las dependencias
_Para instalar las dependencias deberás tener instalado Node.js_
```
npm install
```
## - Iniciar la aplicación
_Para iniciar la aplicación se tienen dos alternativas:_
### - Desarrollo
```
npm run dev
```
### - Producción
```
npm start
```
## - Iniciar Test
_Para probar la API se crearon unos test con Supertest y Jest.js. Estos test prueban en total 20 situaciones diferentes con códigos de respuesta como [200,201,400,401,404,409]_
```
npm test
```
## Autores ✒️
 
* **Jorge Steven Martínez Osorio**
 
# Licencia 📄
 
Este proyecto está bajo la Licencia (MIT) - mira el archivo [LICENSE.md](LICENSE.md) para detalles.

