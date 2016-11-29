# ITAS-Assignment-SSO

##PLEASE IGNORE THIS REPO, IF YOU LOOK AT IT YOU WILL JUDGE ME :-(

IT App. Security Assignment - Single Sign On Demo

Question:

Implement Single Sign On using any programming language / platform.

    Create two demo small size web applications or say Service Provider has two applications

    Create Identity Provider

    Implement SSO for the same scenario
    
Mentor: **Mr. Jatin Sethi \<jsethi@ddn.upes.ac.in\>**

##Brief desc. of my approach

    Use JsonWebToken for backend authentication
    
    Create Identitiy Provider, i.e., the central authentication server that will issue token to a user that logs in
    
    Create 2 dummy apps - Email and Chat. When user accesses any of them (any route), the app checks for JWT that it recognizes.
    
    If authentication is recognized, the app allows user. Else, app redirects user to the central Identity Provider Server which issues the client a JWT that is recognized across all apps part of the SSO System
    
##YAY :-)
