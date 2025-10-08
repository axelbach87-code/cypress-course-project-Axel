Feature: API de gestion de Usuarios en Reqres

  Scenario: Obtener la lista de usuarios y validar estructura
    Given el endpoint de usuarios esta disponible
    When se realiza una petición GET a /users?page=2
    Then el código de respuesta debe ser 200
    And la respuesta debe contener al menos 6 usuarios
    And la estructura de cada usuario debe ser correcta
    And el campo 'page' de la respuesta debe ser 2

  Scenario: Crear un nuevo usuario y verificar datos
    Given el usuario define un nuevo nombre 'Morpheus' y trabajo 'Lider'
    When se realiza una petición POST a /users
    Then el código de respuesta debe ser 201
    And la respuesta debe incluir un 'id' autogenerado
    And los datos de 'nombre' y 'trabajo' deben ser devueltos en la respuesta
    And el timestamp de creación debe existir
