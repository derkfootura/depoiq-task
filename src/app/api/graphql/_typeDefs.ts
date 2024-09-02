import gql from "graphql-tag";

export const typeDefs = gql`
  type Topic {
    id: ID!
    content: String!
    analysisResults: [AnalysisResult!]!
  }

  type Deponent {
    id: ID!
    name: String!
  }

  type AnalysisResult {
    id: ID!
    topic: Topic!
    deponent: Deponent!
    content: String!
    fromTime: String!
    toTime: String!
    score: Float!
  }

  type TopicConnection {
    edges: [TopicEdge!]!
    pageInfo: PageInfo!
  }

  type TopicEdge {
    node: Topic!
    cursor: String!
  }

  type PageInfo {
    totalCount: Int!
  }

  type Query {
    topics(limit: Int = 10, after: Int, search: String): TopicConnection!
    deponents: [Deponent!]!
    analysisResults: [AnalysisResult!]!
  }

  type Mutation {
    createTopic(content: String!): Topic!
    createDeponent(name: String!): Deponent!
  }
`;