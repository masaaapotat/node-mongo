const { MongoClient } = require("mongodb-legacy");
const dboper = require("./operations");
const assert = require("assert");

// Connection URL to MongoDB
const url = "mongodb://localhost:27017/";

// Database name
const dbName = "nucampsite";

// Connect to the MongoDB server
MongoClient.connect(url, {}, (err, client) => {
  // Check if the connection resulted in an error
  // This should check for null, not undefined
  assert.strictEqual(err, undefined);

  console.log("Connected correctly to server");

  // Connect to the specific database
  const db = client.db(dbName);

  // Drop the collection 'campsites' if it exists
  // Insert a document into the 'campsites' collection
  dboper.insertDocument(
    db,
    { name: "Breadcrumb Trail Campground", description: "Test" },
    "campsites",
    (result) => {
      // Log the result of the insertion
      console.log("Insert Document:", result.ops);

      // Find all documents in the 'campsites' collection
      dboper.findDocument(db, "campsites", (docs) => {
        // Log the documents found
        console.log("Found Documents:", docs);

        // Update the inserted document in the 'campsites' collection
        dboper.updateDocument(
          db,
          { name: "Breadcrumb Trail Campground" },
          { description: "Updated Test Description" },
          "campsites",
          (result) => {
            // Log the number of documents that were updated
            console.log("Updated Document Count:", result.modifiedCount);

            // Find all documents again in the 'campsites' collection after the update
            dboper.findDocument(
              db,
              "campsites",

              (docs) => {
                // Log the documents found, which should reflect the update
                console.log("Found Documents:", docs);

                // Remove the document from the 'campsites' collection
                dboper.removeDocument(
                  db,
                  { name: "Breadcrumb Trail Campground" },
                  "campsites",
                  (result) => {
                    // Log the number of documents that were deleted
                    console.log("Deleted Document Count:", result.deletedCount);

                    // Close the database connection once all operations are complete
                    client.close();
                  }
                );
              }
            );
          }
        );
      });
    }
  );
});
