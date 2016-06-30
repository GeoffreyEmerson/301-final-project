# Convoke API

Requests for data are made to the "/api" directory. All responses are in JSON format.

Available endpoints:

    /api/events
    /api/rsvp
    /api/topics
    /api/users
    /api/votes

Usage:

    GET    /api/events             // Not available
    POST   /api/events             // Create a new event. Returns an eventHash.
    GET    /api/events/:eventHash  // A list of a given event's properties.
    PUT    /api/events/:eventHash  // Updates properties of an event.
    DELETE /api/events/:eventHash  // Not available

    GET    /api/rsvp             // Not available
    POST   /api/rsvp             // Create a new RSVP listing. Send eventHash, userHash, and RSVP status in request body.
    GET    /api/rsvp/:eventHash  // Returns a list of guests and their RSVP status.
                                 // {"Steven": true, "Jane": false, "Frank": null}
    PUT    /api/rsvp/:eventHash  // Update the RSVP status of a user. Send userHash and status in body of request.
    DELETE /api/rsvp/:eventHash  // Sets a user's RSVP to null. Send userHash in request body.

    GET    /api/topics      // Not available
    POST   /api/topics      // Create a new topic. Send name and eventHash in request body. Returns id.
    GET    /api/topics/:id  // Returns a list of all topic options and their current weights.
    PUT    /api/topics/:id  // Update topic data. Send new name and/or description in request body.
    DELETE /api/topics/:id  // Not available

    GET    /api/users           // Not available
    POST   /api/users           // Create new user listing. Send name in request body. Returns user hash.
    GET    /api/users/:userHash // Returns name for specified userHash.
    PUT    /api/users/:userHash // Update user name. Send new name in request body.
    DELETE /api/users/:userHash // Not available

    GET    /api/votes     // Not available
    POST   /api/votes     // Create a new vote record. Send option name, userHash, topicID, and vote weight in request body.
    GET    /api/votes/:id // Returns a specified vote's name, userHash, topicID, and vote weight.
    PUT    /api/votes/:id // Update a vote weight. Specify weight in request body.
    DELETE /api/votes/:id // Sets vote weight to 0.
