# Simple Todo Webapp
A program that stores, relates, and displays todo entities via a web application in order to help users better manage and keep track of their time. Currently runs on http://localhost:3000/

## Entities
* Todos
    * hold relevant information or actionable information
* Groups
    * Group together Todos for a common purpose or reasoning as specified by the user
    * More flexible than tags
* Tags
    * Tags that help catagorize Todos and Groups
    * Intended to be an essential part of organizing Todos

## Goals for a Minimum Viable Product
* Information entry should be streamlined, allowing the user to quickly enter their desired information.
* A system for sorting and displaying todo items
    * by tag
    * by prerequisites
    * by related
    * as chosen by a user via a search interface
    * by weight
    * by urgent
    * by date (created, due, etc)
* Views
    * An hourly log view, saved on a daily basis in a format that can be recorded and analyzed
    * A freeform scratch space view, displaying as many related or selected todo items on a single page, sorted by user specification, and highly customizeable
    * Tags will be suggested as the user fills in a field
* Database
    * sqlite3 for lightweight storage within the container
    * Organized, with logical schema
    * Flexible and adaptable as the application's function grows

## Stretch Goals
* incorporate a synchronized stopwatch into the log portion
* log in and log out of an account to preserve items
* a mobile app to create events and store them in the same database
* Data stored primarily on a server running mysql to be accessed anywhere
* Todos can be minimized to just title, or maximized to show all info
* Use lazy loading in cases where large or complex todos/information is needed

## Mockup
<img src='./databaseMockup.jpg' title='Mockup' alt='A mockup of the database'>

<img src='./model.jpg' title='Model' alt='A mockup of the ui'>