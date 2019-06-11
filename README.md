# Proyecto de Modelado y Simulación

# Contenidos

* [Instalación](#instalación)
* [Correr proyecto](#correr-proyecto)
* [Build](#build)
* [Contacto](#contacto)

## Instalación

El proyecto fue creado con la versión de angular 8.0.1. Para poder utilizarlo localmente se debe contar con los siguientes elementos: 
- [Angular CLI](https://github.com/angular/angular-cli). Línea de comandos de angular.
- En caso de no tener instalado [Node.js](https://nodejs.org/en/download/). Descargarlo. El link explica cómo hacerlo para los distintos sistemas operativos.
- [NPM](https://www.npmjs.com/get-npm). Manejador de paquetes de node, usado por el framework para instalar las librerías.

### UNIX - Linux & Mac
Instalación global

`npm install -g @angular/cli`

Instalación local

`npm install @angular/cli`

Para poder correr localmente la version instalada de angular-cli, se pueden llamar los comandos `ng` directamente, agregando la carpeta `.bin` en el directorio donde npm instaló @angular/cli.

### Windows 

En el siguiente tutorial se explica paso a paso como debe instalarse angular en el sistema operativo.

[Enlace](https://www.freecodecamp.org/news/how-to-get-up-and-running-with-angular-on-windows-7405ba745c25/)

## Correr proyecto

Ahora hay que instalar las dependencias del proyecto. Para hacerlo, dirigirse al directorio donde está clonado y desde la terminal ingresar el comando `npm install`.

Luego `ng serve` levantará el proyecto en modo de desarrollo localmente en el puerto 4200. Desde algún navegador entrar a `http://localhost:4200/` y automáticamente se recargarán los cambios realizados sobre cualquier archivo.

## Uso

En la terminal ejecutar el comando `ng help`, donde se listan los comandos disponibles en el framework.

`ng help`

`ng generate --help`

## Build

Correr `ng build` para hacer un build del proyecto. Los articafts se guardarán en el directorio `dist/`. En caso de querer realizar un build productivo, utilizar el flag `--prod`.

## Documentación oficial del framework

[Enlace](https://angular.io/cli)



## Contacto
sebastiancapotondo@gmail.com

jcapotondo@gmail.com