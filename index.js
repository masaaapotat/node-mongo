const { MongoClient } = require('mongodb-legacy');
const assert = require('assert');

// Connection URL to MongoDB
const url = 'mongodb://localhost:27017/';

// Database name
const dbName = 'nucampsite';

// Connect to the MongoDB server
MongoClient.connect(url, {}, (err, client) => {
    // Check if the connection resulted in an error
    // This should check for null, not undefined
    assert.strictEqual(err, undefined); 

    console.log('Connected correctly to server');

    // Connect to the specific database
    const db = client.db(dbName);

    // Drop the collection 'campsites' if it exists
    db.dropCollection('campsites', (err, result) => {
        // Check if dropping the collection resulted in an error
        assert.strictEqual(err, undefined); 

        console.log('Dropped Collection', result);

        // Access the 'campsites' collection
        const collection = db.collection('campsites');

        // Insert a new document into the 'campsites' collection
        collection.insertOne(
            { name: 'Breadcrumb Trail Campground', description: 'Test' },
            (err, result) => {
                // Check if inserting the document resulted in an error
                assert.strictEqual(err, undefined); 

                // Log the result of the insert operation
                console.log('Insert Document:', result.ops); 

                // Retrieve all documents from the 'campsites' collection
                collection.find().toArray((err, docs) => {
                    // Check if retrieving the documents resulted in an error
                    assert.strictEqual(err, undefined); // This should check for null, not undefined

                    // Log the found documents
                    console.log('Found Documents:', docs);

                    // Close the MongoDB connection
                    client.close();
                });
            },
        );
    });
});
