Feature: Registro de usuarios en DemoQA

  Background:
    Given que el usuario abre la página de registro

  Scenario: Registro exitoso de usuario
    When el usuario completa el formulario con datos válidos
    And selecciona su género
    And ingresa su fecha de nacimiento
    And selecciona sus hobbies
    Then debe ver un mensaje de éxito de registro

  Scenario Outline: Registro con datos dinámicos
    When el usuario completa el formulario con <nombre> y <email>
    Then debe ver un mensaje de éxito de registro

    Examples:
      | nombre | email |
      | Axel Bachmeier | Axel@test.com |
      | Dani Fernandez | Dani@test.com |
