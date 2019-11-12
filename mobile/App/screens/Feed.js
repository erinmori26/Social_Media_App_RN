import React from "react";
import { FlatList, View } from "react-native";
import { useQuery, useMutation } from "@apollo/react-hooks";

import { requestFeed } from "../graphql/queries";
import { likeStatus } from "../graphql/mutations";

import { Status, Separator } from "../components/Status";

const Feed = ({ navigation }) => {
  // useQuery from react-hooks makes query easy/reusable
  const { loading, data } = useQuery(requestFeed);
  const [likeStatusFn] = useMutation(likeStatus);

  if (loading) {
    return null;
  }

  return (
    <FlatList
      data={data.feed} // render feed
      renderItem={({ item }) => (
        <Status
          {...item}
          onRowPress={() => navigation.push("Thread", { status: item })}
          onHeartPress={() =>
            likeStatusFn({ variables: { statusId: item._id } })}
        />
      )}
      ItemSeparatorComponent={() => <Separator />}
      keyExtractor={item => item._id}
      ListFooterComponent={<View style={{ flex: 1, marginBottom: 60 }} />}
    />
  );
};

export default Feed;
