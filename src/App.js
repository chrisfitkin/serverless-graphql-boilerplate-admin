// in App.js
import React, { Component } from "react";
import { Admin, Resource, Delete } from "react-admin";
import buildGraphQLProvider from "./lib/ra-data-graphql-simple";

import posts from "./resources/posts";

const introspectionOptions = {
  include: ["Post"]
};

class App extends Component {
  constructor() {
    super();
    this.state = { dataProvider: null };
  }
  componentDidMount() {
    buildGraphQLProvider({
      clientOptions: {
        uri: "http://localhost:3000/graphql"
      },
      introspection: introspectionOptions
    }).then(dataProvider => {
      this.setState({ dataProvider });
    });
  }

  render() {
    const { dataProvider } = this.state;

    if (!dataProvider) {
      return <div>Loading...</div>;
    }

    return (
      <Admin dataProvider={dataProvider}>
        <Resource
          name="Post"
          // list={posts.PostList}
          // edit={PostEdit}
          // create={PostCreate}
          {...posts}
          remove={Delete}
        />
      </Admin>
    );
  }
}

export default App;
