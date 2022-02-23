import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import Head from "next/head";
import { Fragment } from "react";

function MeetupDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.title}</title>
        <meta name="description" content={props.description} />
      </Head>
      <MeetupDetail
        image={props.image}
        title={props.title}
        address={props.address}
        description={props.description}
      />
    </Fragment>
  );
}

export async function getStaticPaths() {
  const url =
    "mongodb+srv://nick:asassinxtreme1@cluster0.t9fbc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  const client = new MongoClient(url);
  const dbName = "meetings";
  await client.connect();

  const db = client.db(dbName);
  const meetingsCollection = db.collection("meetings");
  const meetings = await meetingsCollection.find({}, { _id: 1 }).toArray();
  return {
    fallback: 'blocking',
    paths: meetings.map((meeting) => ({
      params: {
        meetupId: meeting._id.toString(),
      },
    })),
  };
}

export async function getStaticProps(context) {
  const paramsId = context.params.meetupId;
  const url =
    "mongodb+srv://nick:asassinxtreme1@cluster0.t9fbc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  const client = new MongoClient(url);
  const dbName = "meetings";
  await client.connect();

  const db = client.db(dbName);
  const meetingsCollection = db.collection("meetings");
  const meetings = await meetingsCollection.findOne({
    _id: ObjectId(paramsId),
  });

  client.close();

  return {
    props: {
      image: meetings.image,
      title: meetings.title,
      id: paramsId,
      address: meetings.address,
      description: meetings.description,
    },
  };
}

export default MeetupDetails;
