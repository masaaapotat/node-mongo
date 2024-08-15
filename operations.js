// const assert = require("assert").strict;

// insert a single document into a specified collection
exports.insertDocument = (db, document, collection, ) => {
  // Get the collection object from the database using the collection name (string)
  const coll = db.collection(collection);

  // Use the collection object to insert the document into the collection
  return coll.insertOne(document);
};

exports.findDocument = (db, collection, ) => {
  const coll = db.collection(collection);
  //   to find all documents in the collection
  return coll.find().toArray();
};

// Function to remove a single document from a specified collection
exports.removeDocument = (db, document, collection) => {
  // Retrieve the specified collection from the database
  const coll = db.collection(collection);
  return coll.deleteOne(document);

  // Use the collection object to delete a single document from the collection
  // The document parameter is used to match the document to be removed
  // coll.deleteOne(document, (err, result) => {
  // Assert that there is no error during the deletion
  // If `err` is not null, this will throw an assertion error and stop the execution
  //   assert.strictEqual(err, undefined);

  // Call the callback function with the result of the deletion operation
  // The result contains information about the deletion, such as the number of documents deleted

//   coll.deleteOne(document);
//   callback(result);
};

// Function to update a single document in a specified collection
exports.updateDocument = (db, document, update, collection) => {
  // Retrieve the specified collection from the database
  const coll = db.collection(collection);

  // Use the collection object to update a single document in the collection
  // The `document` parameter is used to match the document to be updated
  // The `update` parameter contains the fields to be updated
  // coll.updateOne(document, { $set: update },null, (err, result) => {
  // Assert that there is no error during the update
  // If `err` is not null, this will throw an assertion error and stop execution
  //   assert.strictEqual(err, undefined);
  return coll.updateOne(document, { $set: update }, null);
  
};
