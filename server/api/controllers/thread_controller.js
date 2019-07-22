const Thread = require("../models/thread");
const { ObjectID } = require("mongodb");

//create a thread
module.exports.createThread = async (req, res) => {
  const userId = req.decoded._id;

  const title = req.body.title;
  const body = req.body.body;
  const tagArray = req.body.tags;

  const date = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Calcutta"
  });

  const tags = [];

  tagArray.forEach(i => {
    tags.push(i["name"]);
  });

  const threadObj = {
    title: title,
    body: body,
    tags: tags,
    userId: ObjectID(userId),
    date: date
  };

  try {
    let thread = await Thread.create(threadObj);
    if (thread) {
      return res.status(201).send({
        success: true,
        message: "thread created"
      });
    }

    return res.send({
      success: false,
      message: "could not create a thread"
    });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: "something went wrong"
    });
  }
};

//fetch all threads
module.exports.listThreads = async (req, res) => {
  const userId = req.decoded._id;

  try {
    let threads = await Thread.find({ userId: ObjectID(userId) });
    if (!threads) {
      return res.send({
        success: false,
        message: "no threads found"
      });
    }

    return res.send(threads);
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: "something went wrong"
    });
  }
};

//edit a threads
module.exports.editThread = async (req, res) => {
  const threadId = req.body._id;
  const title = req.body.title;
  const body = req.body.body;

  const threadsObj = {
    title: title,
    body: body
  };

  try {
    let threads = await Thread.updateOne(
      { _id: ObjectID(threadId) },
      { $set: threadsObj }
    );
    if (threads) {
      return res.send({
        success: true,
        message: "thread updated"
      });
    }

    return res.send({
      success: false,
      message: "could not update a thread"
    });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: "something went wrong"
    });
  }
};

//delete a thread
module.exports.deleteThread = async (req, res) => {
  const threadId = req.body._id;

  try {
    await Thread.deleteOne({ _id: ObjectID(threadId) });
    return res.send({
      success: true,
      message: "thread deleted"
    });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: "something went wrong"
    });
  }
};
