import { MongoClient } from "mongodb";

async function newMeetup(req, res) {
  
  const url = "mongodb+srv://nick:asassinxtreme1@cluster0.t9fbc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  const client = new MongoClient(url);

  const dbName = "meetings";
  if (req.method === "POST") {
    const data = req.body;
    await client.connect();

    const db = client.db(dbName);
    const meetupsCollection = db.collection("meetings");
    await meetupsCollection.insertOne(data);

    client.close();

    res.status(201).json({message:"Meetup inserted"})
  }
}

export default newMeetup;
