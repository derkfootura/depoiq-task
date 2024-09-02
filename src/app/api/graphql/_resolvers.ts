import { connectToDatabase } from '@/libs/db';
import { Topic, TopicDocument } from "@/models/Topic";
import { Deponent, DeponentDocument } from "@/models/Deponent";
import { AnalysisResult, AnalysisResultDocument } from "@/models/AnalysisResult";
import { generateLoremIpsum } from "@/libs/lorem";

type CreateTopicInput = {
  content: string;
};

type CreateDeponentInput = {
  name: string;
};

type TopicsQueryParams = {
  limit?: number;
  after?: number;
  search?: string;
};

export const resolvers = {
  Query: {
    topics: async (_: any, { limit = 10, after = 0, search }: TopicsQueryParams) => {
      await connectToDatabase();

      let query: any = {};
      if (search) {
        // query.$or = [
        //   { content: { $regex: search, $options: 'i' } },
        //   { 'analysisResults.content': { $regex: search, $options: 'i' } }
        // ];
      }

      const totalCount = await Topic.countDocuments(query);
      const topics = await Topic.find(query).skip(after).limit(limit).sort({ createdAt: -1 });

      const edges = topics.map((topic: TopicDocument, index: number) => ({
        node: topic,
        cursor: (after + index + 1).toString(),
      }));

      return {
        edges,
        pageInfo: {
          totalCount,
        },
      };
    },
    deponents: async () => {
      await connectToDatabase();
      return Deponent.find();
    },
    analysisResults: async () => {
      await connectToDatabase();
      return AnalysisResult.find().populate('topic deponent');
    },
  },
  Topic: {
    analysisResults: async (parent: TopicDocument) => {
      return AnalysisResult.find({ topic: parent._id }).populate('deponent');
    },
  },
  Mutation: {
    createTopic: async (_: any, { content }: CreateTopicInput): Promise<TopicDocument> => {
      await connectToDatabase();
      const newTopic = await Topic.create({ content });

      const deponents = await Deponent.find();
      for (const deponent of deponents) {
        const fromMinutes = Math.floor(Math.random() * 24);
        const fromSeconds = Math.floor(Math.random() * 60);
        const fromTime = `${fromMinutes.toString().padStart(2, '0')}:${fromSeconds.toString().padStart(2, '0')}`;
        
        let toMinutes = fromMinutes;
        let toSeconds = fromSeconds + Math.floor(Math.random() * 1000) + 1; // Ensure at least 1 minute difference
        
        if (toSeconds >= 60) {
          toMinutes = (toMinutes + 1) % 24;
          toSeconds %= 60;
        }
        
        const toTime = `${toMinutes.toString().padStart(2, '0')}:${toSeconds.toString().padStart(2, '0')}`;
        const score = Math.floor(Math.random() * 100);

        await AnalysisResult.create({
          topic: newTopic._id,
          deponent: deponent._id,
          content: generateLoremIpsum(1),
          fromTime,
          toTime,
          score,
        });
      }

      return newTopic;
    },
    createDeponent: async (_: any, { name }: CreateDeponentInput): Promise<DeponentDocument> => {
      await connectToDatabase();
      return Deponent.create({ name });
    },
  },
};
