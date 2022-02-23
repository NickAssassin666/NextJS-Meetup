import MeetUpList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import { Fragment } from "react";
import Head from "next/head";

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>meetings page</title>
        <meta name="description" content="this is the meetings page" />
      </Head>
      <MeetUpList meetups={props.meetings} />
    </Fragment>
  );
}

// export function getServerSideProps (content) {
//     const req = content.req;
//     const res = content.res;
//     return {
//         props: {
//             meetings : Dummy_Meetups
//         },
//     }
// }

export async function getStaticProps() {
  const url =
    "mongodb+srv://nick:asassinxtreme1@cluster0.t9fbc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  const client = new MongoClient(url);
  const dbName = "meetings";
  await client.connect();

  const db = client.db(dbName);
  const meetingsCollection = db.collection("meetings");
  const meetings = await meetingsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetings: meetings.map((meetup) => ({
        id: meetup._id.toString(),
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
      })),
    },
    revalidate: 2,
  };
}

export default HomePage;
