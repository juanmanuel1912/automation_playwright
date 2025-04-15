Feature: Login functionality for Sauce Demo
  As a user of Sauce Demo
  I want to be able to login with different credentials
  So that I can access the appropriate features based on my user role

  Background:
    Given I am on the login page

  @smoke @happy-path
  Scenario: Successful login with standard user
    When I enter username "standard_user"
    And I enter password "secret_sauce"
    And I click the login button
    Then I should be logged in successfully
    And I should see the inventory page
    And the shopping cart should be empty

  @smoke @happy-path
  Scenario: Successful login with performance glitch user
    When I enter username "performance_glitch_user"
    And I enter password "secret_sauce"
    And I click the login button
    Then I should be logged in successfully
    And I should see the inventory page with some delay

  @negative @unhappy-path
  Scenario: Login with locked out user
    When I enter username "locked_out_user"
    And I enter password "secret_sauce"
    And I click the login button
    Then I should see an error message "Epic sadface: Sorry, this user has been locked out."

  @negative @unhappy-path
  Scenario: Login with incorrect password
    When I enter username "standard_user"
    And I enter password "wrong_password"
    And I click the login button
    Then I should see an error message "Epic sadface: Username and password do not match"

  @negative @unhappy-path
  Scenario: Login with empty credentials
    When I click the login button
    Then I should see an error message "Epic sadface: Username is required"

  @negative @unhappy-path
  Scenario: Login with empty password
    When I enter username "standard_user"
    And I click the login button
    Then I should see an error message "Epic sadface: Password is required"

  @regression @data-driven
  Scenario Outline: Login with different user types
    When I enter username "<username>"
    And I enter password "<password>"
    And I click the login button
    Then I should see "<result>"

    Examples:
      | username                | password       | result                                             |
      | standard_user           | secret_sauce   | success                                            |
      | locked_out_user         | secret_sauce   | Epic sadface: Sorry, this user has been locked out.|
      | problem_user            | secret_sauce   | success                                            |
      | performance_glitch_user | secret_sauce   | success                                            |
      | invalid_user            | secret_sauce   | Epic sadface: Username and password do not match   |
      | standard_user           | invalid_pass   | Epic sadface: Username and password do not match   |