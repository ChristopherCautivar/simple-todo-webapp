# Simple Todo Webapp
A program that stores, relates, and displays todo entities via a web application in order to help users better manage and classify their time.

## Goals for a Minimum Viable Product
* A system for sorting and displaying todo items
    * by tag
    * by prerequisites
    * by related
    * as chosen by a user via a search interface
    * by weight
    * by urgent
    * by date (created, due, etc)
* Views
    * In an hourly log view, saved on a daily basis in a format that can be recorded and analyzed
    * In a freeform scratch space view, displaying as many related or selected todo items on a single page, sorted by user specification, and highly customizeable.
    * Todos can be minimized to just title, or maximized to show all info
* Database
    * sqlite3 for lightweight storage within the container
    * Organized, with logical schema.
    * Flexible and adaptable as the application's use cases grows.

## Stretch Goals
* incorporate a synchronized stopwatch into the log portion
* log in and log out of an account to preserve items
* a mobile app to create events and store them in the same database
* Data stored primarily on a server running mysql to be accessed anywhere

## Mockup