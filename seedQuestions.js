require("dotenv").config();  
const mongoose = require("mongoose");

const QuestionBank = require("./models/questions");

// MongoDB se connect
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Atlas connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

const seed = async () => {
    try {
        await QuestionBank.deleteMany(); // purane saaf

        // Common buyer questions (for crops except special ones)
        const commonBuyerQuestions = [
            { questionText: "What quantity can you deal in?", isSupportOnly: false },
            { questionText: "What is your expected price?", isSupportOnly: false },
            { questionText: "Which regions do you cover?", isSupportOnly: false },
            {
                questionText: "According to you, is he a Broker or Aggregator?",
                isSupportOnly: true,
            },
        ];

        // Crop-specific questions
        const bananaQuestions = [
            { questionText: "Do you have your own vehicle?", isSupportOnly: false },
            {
                questionText:
                    "Do you harvest directly from buyers or do you expect farmers to harvest and bring to you instead?",
                isSupportOnly: false,
            },
            {
                questionText: "What are your buying specifications?",
                isSupportOnly: false,
            },
            {
                questionText: "What is your daily requirements?",
                isSupportOnly: false,
            },
            { questionText: "Box  cut  or Normal cut?", isSupportOnly: false },
            {
                questionText: "What regions do you harvest from?",
                isSupportOnly: false,
            },
            { questionText: "Where do you sell this at", isSupportOnly: false },
            {
                questionText: "According to you, is he a Broker or Aggregator?",
                isSupportOnly: true,
            },
        ];

        const maizeQuestions = [
            {
                questionText: "Do you buy directly from farmers or Aggregators?",
                isSupportOnly: false,
            },
            { questionText: "What is your buying capacity??", isSupportOnly: false },
            {
                questionText: "What are your buying specifications?",
                isSupportOnly: false,
            },
            {
                questionText: "What is the moisture you look at?",
                isSupportOnly: false,
            },
            { questionText: "Where/Who do you sell to?", isSupportOnly: false },
            {
                questionText: "Do you have your own drying setup?",
                isSupportOnly: false,
            },
            {
                questionText: "Which regions/radius do you deal with?",
                isSupportOnly: false,
            },

            {
                questionText: "According to you, is he a Broker or Aggregator?",
                isSupportOnly: true,
            },
        ];

        const tenderCoconutQuestions = [
            { questionText: "Do you have your own vehicle?", isSupportOnly: false },
            { questionText: "How many labour do you have?", isSupportOnly: false },
            {
                questionText: "Which regions do you harvest from?",
                isSupportOnly: false,
            },
            { questionText: "Do you do mixed or selection?", isSupportOnly: false },
            {
                questionText: "What price do you generally buy at?",
                isSupportOnly: false,
            },
            { questionText: "Interested in giving to our CC?", isSupportOnly: false },
            {
                questionText: "How many nuts do you need on daily basis?",
                isSupportOnly: false,
            },

            {
                questionText: "According to you, is he a Broker or Aggregator?",
                isSupportOnly: true,
            },
        ];

        const dryCoconutQuestions = [
            {
                questionText:
                    "Do you harvest or do you expect farmers to harvest and bring to you?",
                isSupportOnly: false,
            },
            {
                questionText: "What price do you generally buy at?",
                isSupportOnly: false,
            },
            {
                questionText: "Which regions do you source from?",
                isSupportOnly: false,
            },
            {
                questionText: "Do you buy from farmers directly?",
                isSupportOnly: false,
            },
            { questionText: "Where do you dump these nuts?", isSupportOnly: false },
            { questionText: "What are your buying specs?", isSupportOnly: false },
            {
                questionText: "What is your daily buying capacity?",
                isSupportOnly: false,
            },

            {
                questionText: "According to you, is he a Broker or Aggregator?",
                isSupportOnly: true,
            },
        ];

        // Save all
        await QuestionBank.insertMany([
            { cropName: "banana", identity: "buyer", questions: bananaQuestions },
            { cropName: "maize", identity: "buyer", questions: maizeQuestions },
            {
                cropName: "tender_coconut",
                identity: "buyer",
                questions: tenderCoconutQuestions,
            },
            {
                cropName: "dry_coconut",
                identity: "buyer",
                questions: dryCoconutQuestions,
            },
            {
                cropName: "default",
                identity: "buyer",
                questions: commonBuyerQuestions,
            },
        ]);

        console.log("✅ Seed data inserted successfully!");
        mongoose.connection.close();
    } catch (err) {
        console.error("❌ Error inserting seed data:", err);
        mongoose.connection.close();
    }
};

seed();
