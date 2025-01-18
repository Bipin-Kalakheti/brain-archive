import { action, mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { api } from "./_generated/api";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const getDocuments = query({
  async handler(ctx) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!userId) {
      return [];
    }

    return await ctx.db
      .query("documents")
      .withIndex("by_tokenIdentifier", (q) => q.eq("tokenIdentifier", userId))
      .collect();
  },
});

export const getDocument = query({
  args: {
    documentId: v.id("documents"),
  },
  async handler(ctx, args) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!userId) {
      return null;
    }

    const document = await ctx.db.get(args.documentId);

    if (!document) {
      return null;
    }

    if (document?.tokenIdentifier !== userId) {
      throw new ConvexError("Document not found");
    }

    return {
      ...document,
      documentUrl: await ctx.storage.getUrl(document.fileId),
    };
  },
});

export const createDocument = mutation({
  args: {
    title: v.string(),
    fileId: v.id("_storage"),
  },
  async handler(ctx, args) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userId) {
      throw new ConvexError("User not authenticated");
    }

    await ctx.db.insert("documents", {
      title: args.title,
      tokenIdentifier: userId,
      fileId: args.fileId,
    });
  },
});

export const askQuestion = action({
  args: {
    question: v.string(),
    documentId: v.id("documents"),
  },
  async handler(ctx, args) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userId) {
      throw new ConvexError("User not authenticated");
    }
    const document = await ctx.runQuery(api.documents.getDocument, {
      documentId: args.documentId,
    });

    if (!document) {
      throw new ConvexError("Document not found");
    }

    const file = await ctx.storage.get(document.fileId);

    if (!file) {
      throw new ConvexError("File not found");
    }

    const text = await file.text();

    const chatCompletion: OpenAI.Chat.Completions.ChatCompletion =
      await client.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `Here is the text file: ${text}`,
          },
          {
            role: "user",
            content: `Please answer this question:  ${args.question}`,
          },
        ],
        model: "gpt-4o-mini",
      });

    //Todo: store user prompt as chat record

    //Todo: store the ai response as a chat record

    return chatCompletion.choices[0].message.content;
  },
});
