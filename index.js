const MongoClient = require("mongodb").MongoClient;
const dboper = require("./operations");

// Connection URL to MongoDB
const url = "mongodb://localhost:27017/";

// Database name
const dbName = "nucampsite";

// Connect to the MongoDB server
MongoClient.connect(url, {})
  .then((client) => {
    // Log successful connection to the server
    console.log("Connected correctly to server");

    // Connect to the specific database
    const db = client.db(dbName);

    // Attempt to drop the 'campsites' collection if it exists
    db.dropCollection("campsites")
      .then((result) => {
        // Log the result if the collection was successfully dropped
        console.log("Dropped Collection:", result);
      })
      .catch((err) => {
        // If the collection does not exist, log a message indicating this
        console.log("No collection to drop.");
      });

    // Insert a document into the 'campsites' collection
    dboper
      .insertDocument(
        db,
        { name: "Breadcrumb Trail Campground", description: "Test" },
        "campsites"
      )
      .then((result) => {
        // Log the result of the insertion, including the document that was inserted
        console.log("Insert Document:", result.ops);

        // Find all documents in the 'campsites' collection
        return dboper.findDocument(db, "campsites");
      })
      .then((docs) => {
        // Log the documents found in the 'campsites' collection
        console.log("Found Documents:", docs);

        // Update the inserted document's description in the 'campsites' collection
        return dboper.updateDocument(
          db,
          { name: "Breadcrumb Trail Campground" },
          { description: "Updated Test Description" },
          "campsites"
        );
      })
      .then((result) => {
        // Log the number of documents that were updated
        console.log("Updated Document Count:", result.modifiedCount);

        // Find all documents in the 'campsites' collection again to verify the update
        return dboper.findDocument(db, "campsites");
      })
      .then((docs) => {
        // Log the documents found in the 'campsites' collection after the update
        console.log("Found Documents:", docs);

        // Remove the inserted document from the 'campsites' collection
        return dboper.removeDocument(
          db,
          { name: "Breadcrumb Trail Campground" },
          "campsites"
        );
      })
      .then((result) => {
        // Log the number of documents that were deleted
        console.log("Deleted Document Count:", result.deletedCount);

        // Close the MongoDB connection once all operations are complete
        return client.close();
      })
      .catch((err) => {
        // Log any errors that occurred during the operations and close the connection
        console.log(err);
        client.close();
      });
  })
  .catch((err) => {
    // Log any errors that occurred while connecting to the MongoDB server
    console.log(err);
  });
