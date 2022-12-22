# CLog-API
 This app allows a product manager or engineer to post projects/products updates for the team to see. This helps the team to keep track of the timelines of each one of them and show the stakeholders the progress made.

## Database ER Diagram
![ERDiagram](https://user-images.githubusercontent.com/57503818/208507908-a2ee16c1-f1e2-46e7-9655-c9bda822d850.png)

[CLog App](https://github.com/CarloLj/CLog-App)

## Completed:

- Servidor con express [X]

- Conexion a mysql [X]

- Inicio de sesion y registro con credenciales encriptadas [X]

- Solo los usuarios con token valido pueden interactuar con el API [X]

- Generacion y verificacion de token en cada llamada CRUD del API para cada entidad [X]

- Filtrado Inteligente para proyectos[X]

- Paginación [X]

## User:
	(POST) signUp [X]
	    - No permite crear si el correo del usuario ya existe 
	    - Username no sea un string vacio

	(POST) login [X]
	    - Solo si el password encriptado almacenado coincide con el ingresado
	
## Project:
	(GET) Get Projects [X] 
	    - Solo con token valido
	
	(GET) Get Projects with intelligent filtering [X] 
	    - Solo con token valido
            - Se puede filtrar por cada uno de los valores de project
	    - Se puede filtrar por nombre de usuario (inner join)
	    - Paginacion 

	(POST) Create Project [X] 
	    - Solo con token valido
	    - No permite crear si el creator_id es invalido
	    - Necesita tener todos los campos distintos de nulo excepto descripcion 

	(PUT) Modify Project [X] 
	    - Solo con token valido
	    - Solo si existe el id de proyecto a modificar
	    - Necesita tener todos los campos distintos de nulo excepto descripcion 

	(DELETE) Delete project [X] 
	    - Solo con token valido
	    - Solo elimina si existe el id de proyecto a eliminar

## ProjectUpdate:
	(GET) Get Project Updates by project id [X] 
        - Solo con token valido
	    - Retorna todos los project updates con id de proyecto especificado

	(POST) Create ProjectUpdate [X] 
	    - Solo con token valido
	    - No permite crear si el project_id es invalido
	    - Necesita tener todos los campos distintos de nulo excepto descripcion

	(PUT) Modify ProjectUpdate [X]
	    - Solo con token valido
	    - Solo si existe el id de project update a modificar
	    - Necesita tener todos los campos distintos de nulo excepto descripcion 	

	(DELETE) Delete ProjectUpdate [X] 
	    - Solo con token valido
	    - Solo elimina si existe el id de proyecto a eliminar

## RelevantPoint:
	(GET) Get Relevant Points by update_id [X] 
        - Solo con token valido
	    - Retorna todos los relevant points con id de project update especificado

	(POST) Create RelevantPoint [X] 
	    - Solo con token valido
	    - No permite crear si el update_id es invalido
	    - Necesita tener descripcion distinta de nulo	

	(PUT) Modify RelevantPoint [X]
	    - Solo con token valido
	    - Solo si existe el id de relevant point a modificar
	    - Necesita tener descripcion distinta de nulo	

	(DELETE) Delete RelevantPoint [X] 
	    - Solo con token valido
	    - Solo elimina si existe el id de relevant point a eliminar
