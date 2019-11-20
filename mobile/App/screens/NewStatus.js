import React, { useState } from "react";
import { ScrollView } from "react-native";
import { useMutation } from "@apollo/react-hooks";

import { NewStatusInput } from "../components/NewStatusInput";

import { Header } from "../components/Header";
import { createStatus } from "../graphql/mutations";
import { requestFeed, requestResponses } from "../graphql/queries";

export default ({ navigation }) => {
  const parentStatus = navigation.getParam("parent", {});
  const [statusText, setStatusText] = useState(""); // text of status
  const [imageLink, setStatusLink] = useState(""); // text of link //////////

  const refetchQueries = [];
  if (parentStatus._id) {
    // get statuses with responses
    refetchQueries.push({
      query: requestResponses,
      variables: { _id: parentStatus._id }
    });
  } else {
    // get statuses (no responses exist)
    refetchQueries.push({
      query: requestFeed
    });
  }

  // show new statuses after new one is created
  const [createStatusFn] = useMutation(createStatus, {
    refetchQueries
  });

  return (
    <>
      <Header
        onLeftPress={() => navigation.pop()}
        leftText="Cancel"
        onRightPress={() =>
          createStatusFn({
            variables: {
              statusText,
              parentStatusId: parentStatus._id,
              imageLink
            }
          }).then(() => navigation.pop())}
        rightText="Post"
      />

      <ScrollView
        style={{ backgroundColor: "rgba(27,31,35,.05)" }}
        contentContainerStyle={{
          flex: 1,
          backgroundColor: "rgba(27,31,35,.05)"
        }}
      >
        <NewStatusInput
          placeholder="What's the latest?"
          onChangeText={text => setStatusText(text)}
        />
        <NewStatusInput
          placeholder="Image link?"
          onChangeText={link => setStatusLink(link)}
        />
      </ScrollView>
    </>
  );
};
