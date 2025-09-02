Feature: Busqueda de productos

Scenario: Buscar un producto exitosamente y validar que devuelve el correcto
    Given el usuario abre la web de automation exercise
    When el usuario hace clic en el boton products
    And el usuario realiza la busqueda del producto "Blue Top"
    And el usuario obtiene el precio del producto
    And el usuario hace clic en el boton view product
    Then el sistema muestra la informacion del producto "Blue Top"
    And el sistema muestra el mismo precio del producto que se obtuvo en la busqueda