Feature: Inventory Page Functionality
  As a logged in user
  I want to interact with the inventory page
  So that I can view and purchase products

  Background:
    Given I am logged in as "standard_user"
    And I am on the inventory page

  @smoke @happy-path
  Scenario: View product details
    When I click on product "Sauce Labs Backpack"
    Then I should see the product details page
    And the price should be "$29.99"
    And the product description should be visible

  @smoke @happy-path
  Scenario: Add product to cart
    When I add "Sauce Labs Backpack" to cart
    Then the shopping cart badge should show "1"
    And the product button should say "REMOVE"

  @regression
  Scenario: Sort products by price high to low
    When I sort products by "Price (high to low)"
    Then products should be sorted by price in descending order

  @regression
  Scenario: Sort products by price low to high
    When I sort products by "Price (low to high)"
    Then products should be sorted by price in ascending order

  @regression
  Scenario: Sort products alphabetically
    When I sort products by "Name (A to Z)"
    Then products should be sorted by name in ascending order

  @negative @unhappy-path
  Scenario: Verify cart persistence after logout
    When I add "Sauce Labs Backpack" to cart
    And I logout
    And I log back in as "standard_user"
    Then the shopping cart should be empty

  @regression @data-driven
  Scenario Outline: Add multiple products to cart
    When I add "<product1>" to cart
    And I add "<product2>" to cart
    Then the shopping cart badge should show "2"
    And the cart should contain "<product1>"
    And the cart should contain "<product2>"

    Examples:
      | product1              | product2                    |
      | Sauce Labs Backpack   | Sauce Labs Bike Light      |
      | Sauce Labs Bolt T-Shirt| Sauce Labs Fleece Jacket  |