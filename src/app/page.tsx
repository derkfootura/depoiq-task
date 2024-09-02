'use client';
import React from 'react';
import { Button, Card, Input, Modal, Pagination, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/client';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { useData } from '../components/DataProvider';

loadDevMessages();
loadErrorMessages();

const scoreColor = [
  '#f00',
  '#fa0',
  '#1D8E1C',
  '#1D8E1C',
];

const GET_TOPICS_AND_DEPONENTS = gql`
  query GetTopicsAndDeponents($limit: Int!, $after: Int, $search: String) {
    topics(limit: $limit, after: $after, search: $search) {
      edges {
        node {
          id
          content
          analysisResults {
            id
            content
            fromTime
            toTime
            score
            deponent {
              id
              name
            }
          }
        }
        cursor
      }
      pageInfo {
        totalCount
      }
    }
    deponents {
      id
      name
    }
  }
`;

const CREATE_TOPIC = gql`
  mutation CreateTopic($content: String!) {
    createTopic(content: $content) {
      id
      content
    }
  }
`;

type Deponent = {
  id: string;
  name: string;
};

type AnalysisResult = {
  id: string;
  content: string;
  deponent: Deponent;
  fromTime: string;
  toTime: string;
  score: number;
};

type Topic = {
  id: string;
  content: string;
  analysisResults: AnalysisResult[];
};

type TopicEdge = {
  node: Topic;
  cursor: string;
};

type TopicWithResults = {
  topic: Topic;
  results: { [key: string]: AnalysisResult[] };
};

function CrossDepositionAnalysis() {
  const [showModal, setShowModal] = React.useState(false);
  const [topicContent, setTopicContent] = React.useState('');
  const [newTopic, setNewTopic] = React.useState<Topic | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get('page') || '1', 10);
  const size = parseInt(searchParams.get('size') || '10', 10);

  const { search } = useData();

  const { loading, error, data, fetchMore } = useQuery(GET_TOPICS_AND_DEPONENTS, {
    variables: { limit: size, after: (page - 1) * size, search },
  });

  const [createTopic, { loading: createTopicLoading }] = useMutation(CREATE_TOPIC);

  const deponents: Deponent[] = data?.deponents || [];
  const total = data?.topics?.pageInfo?.totalCount || 0;

  const topics: TopicWithResults[] = data?.topics?.edges.map((edge: TopicEdge) => ({
    topic: edge.node,
    results: edge.node.analysisResults.reduce((acc: { [key: string]: AnalysisResult[] }, result: AnalysisResult) => {
      if (!acc[result.deponent.id]) {
        acc[result.deponent.id] = [];
      }
      acc[result.deponent.id].push(result);
      return acc;
    }, {})
  })) || [];

  const initiateModal = () => {
    setTopicContent('');
    setShowModal(true);
  };

  const handleAddTopic = () => {
    if (!topicContent) return;

    createTopic({ variables: { content: topicContent } })
      .then((createTopicResult) => {
        setNewTopic(createTopicResult.data.createTopic);
        fetchMore({
          variables: { limit: size, after: 0 },
          updateQuery: (_, { fetchMoreResult }) => {
            setNewTopic(null);
            return fetchMoreResult;
          },
        });
      })
      .catch((error) => {
        console.error('Error creating topic:', error);
        // Optionally, show an error message to the user
      });
    setShowModal(false);
  };

  const updateUrlAndRefetch = (newPage: number, newSize: number) => {
    router.push(`?page=${newPage}&size=${newSize}`);
    fetchMore({
      variables: { limit: newSize, after: (newPage - 1) * newSize },
      updateQuery: (_, { fetchMoreResult }) => fetchMoreResult,
    });
  };

  return (
    <>
      <Spin spinning={loading || createTopicLoading} fullscreen />
      <div className='flex-1'>
        <Card>
          <div className='topic-headers'>
            <div className='min-w-[300px] max-w-[300px] topic-header'>
              <Button shape='circle' onClick={() => initiateModal()}><PlusOutlined /></Button>
              Topics
            </div>
            {deponents.map(({ id, name }) => (
              <div className='min-w-[300px] max-w-[300px] topic-header' key={id}>
                {name}
              </div>
            ))}
          </div>
          {newTopic && (
            <div className='topic'>
              <div>{newTopic.content}</div>
              {deponents.map(({ id, name }) => (
                <div className='results' key={id}>
                  <Spin />
                </div>
              ))}
            </div>
          )}
          {topics.map(({ topic, results }) => (
            <div className='topic' key={topic.id}>
              <div>{topic.content}</div>
              {deponents.map(({ id }) => (
                <div className='results' key={id}>
                  {results[id].map((result) => (
                    <div className='result' key={result.id}>
                      <div>
                        <span>{result.fromTime} - {result.toTime}</span>
                        <span style={{
                          color: scoreColor[Math.floor(result.score * 0.03)]
                        }}>{result.score}%</span>
                      </div>
                      {result.content}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </Card>
      </div>
      <div style={{ padding: 16 }}>
        <Pagination
          total={total}
          pageSizeOptions={[5, 10, 20, 50, 100]}
          showSizeChanger
          pageSize={size}
          current={page}
          onChange={(newPage, newSize) => updateUrlAndRefetch(newPage, newSize)}
        />
      </div>
      <Modal
        title="New Topic"
        open={showModal}
        onCancel={() => setShowModal(false)}
        onOk={() => handleAddTopic()}
        okText="Done"
        okButtonProps={{ disabled: !topicContent }}
      >
        <span>Topic</span>
        <Input value={topicContent} onChange={(e) => setTopicContent(e.target.value)} />
      </Modal>
    </>
  );
}

export default CrossDepositionAnalysis;
