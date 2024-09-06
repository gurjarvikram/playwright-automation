Feature: Login page

  Background:
    Given The user navigates to the login page

  Scenario: Unsuccessful login due to incorrect password
    When The user enters a correct username
    When The user enters an incorrect password
    When The user clicks on the login button
    Then The user should see an error message indicating incorrect credentials