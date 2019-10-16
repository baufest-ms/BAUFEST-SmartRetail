# Baufest | Hackathon - Track II: Face & Custom Vision >> Baufest

:octocat: En este repositorio vas a poder encontrar los diferentes instructivos y soluciones para la implementación de Face y Custom Vision realizada para el Workshop de Mayo de 2019.

El principal objetivo es experimentar con el procesamiento, análisis y reconocimiento de imágenes, en este caso en particular de rostros de personas a través de [Face API](https://azure.microsoft.com/en-us/services/cognitive-services/face/) y de productos a través de [Custom Vision](https://www.customvision.ai/).

A continuación, se presenta el detalle con los diferentes pasos que deberás llevar adelante para poder realizar la implementación de la solución, mientras aprendés a trabajar con [Cognitive Services](https://azure.microsoft.com/en-us/try/cognitive-services/) de Microsoft Azure.

Una vez que finalices con los pasos descriptos vas a poder contar con una solución integral y funcional de un _smart store_, en donde se permitirá a las personas registrarse en una base de datos, realizar reconocimiento de productos a través de sus smartphones y luego permitir reconocerlas a través de una aplicación para kioscos _self-service_.

Hecha esta breve introducción, pasemos a trabajar en la implementación de la solución.


## Tabla de Contenidos
- [Pre-requisitos](#pre-requisitos)
- [Manos a la Obra](#manos-a-la-obra)
  - [Bloque 1: Custom Vision](#bloque-1-custom-vision)


## Pre-requisitos
:point_right: Antes de comenzar, es necesario que validemos algunos pocos requisitos previos:
- Contar con una _Azure Subscription_ activa y con permisos suficientes para crear _Resources Groups_, _Virtual Machines_, _App Services_ y _componentes de Cognitive Services_. Esta _Azure Subscription_ será provista por Microsoft.
- Contar con un entorno de desarrollo con las siguientes características:
  - Tener instalado **Visual Studio 2017**, o alguna versión superior.
  - Tener instalado **.Net Framework 4.6.1**, o alguna versión superior.
- Te recomendamos crear una virtual en Azure (por ejemplo, utilizando la imagen _Data Science Virtual Machine - Windows 2016_, con un sizing A5 o similar). Si tenés dudas acerca de cómo crearla, por favor no dudes en consultar a los instructores para que te ayuden en el proceso.
- Para que la solución funcione correctamente, a priori, no es necesario contar con una Base de Datos, ya que la solución por defecto provee un _Connection String_ a una base de datos local en la carpeta _App_Data_. Sin embargo, si querés utilizar una BD SQL real te recomendamos SQL Server. Sino, podés utilizar cualquier otro motor siempre y cuando modifiques previamente la capa Repository de la solución.
  - Si vas a utilizar SQL Server, o SQL Azure, te recomendamos que instales [SQL Server Management Studio](https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-2017)
  - También podés utilizar un SQL Server Express Local, especialmente si desarrollás en tu propio entorno de trabajo.
- Para las pruebas es deseable que cuentes con un smartphone con el cual realizar pruebas sobre la aplicación _Web Mobile_ que vamos a desplegar en el Bloque 3.
- Vas a necesitar acceso a internet para poder trabajar sin inconvenientes.

Por último, te recomendamos tener a mano los siguientes links de **Face**, ya que te podrán ser de utilidad en más de una oportunidad:
- [Página principal de Face](https://azure.microsoft.com/en-us/services/cognitive-services/face/)
- [Página con la documentación, guías rápidas y tutoriales](https://docs.microsoft.com/en-us/azure/cognitive-services/face/)
- [Página con las referencias de la API](https://westus.dev.cognitive.microsoft.com/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395236)

Y además los siguientes links de **Custom Vision**:
- [Portal de Operaciones](https://www.customvision.ai/)
- [Página principal de Custom Vision](https://azure.microsoft.com/en-us/services/cognitive-services/custom-vision-service/)
- [Página con la documentación, guías rápidas y tutoriales](https://docs.microsoft.com/en-us/azure/cognitive-services/custom-vision-service/home)


## Manos a la Obra
¡¡Ya es tiempo de ponernos a trabajar!! :clap: :clap:


### Bloque 1: Custom Vision

#### Objetivos del Bloque
- Setup de Custom Vision en Azure
- Carga de imágenes de productos y categorización
- Entrenar y publicar el modelo

#### Requerimientos
En este primer bloque, deberás implementar el modelo de reconocimiento de imágenes en **Custom Vision**. Para ello, te recomendamos seguir el tutorial que se detalla en el archivo [/Bloque 1/Track II - Bloque 1 - Custom Vision.pdf](./Bloque%201/Track%20II%20-%20Bloque%201%20-%20Custom%20Vision.pdf).

#### ¿Necesitás ayuda?
En caso de que requieras ayuda, por favor contactá a los instructores para que puedan ayudarte a llevar adelante el ejercicio.
