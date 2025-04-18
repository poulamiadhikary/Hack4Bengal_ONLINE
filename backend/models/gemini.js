import mongoose from 'mongoose';

const history = new mongoose.Schema({
    role: {type: String},
    message: {type: String}
});

const codeHistory = new mongoose.Schema({
    role: {type: String},
    message: {type: String},
    code: {type: String}
});

const textSchema = new mongoose.Schema({
    initial: {type: String},
    message: {type: String},
    textHistory: {type: [history]},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

const codeSchema = new mongoose.Schema({
    initial: {type: String},
    codeHistory: {type: [codeHistory]},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

const summarizeSchema = new mongoose.Schema({
    initial: {type: String},
    summary: {type: String},
    summaryHistory: {type: [history]},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

export const Text = mongoose.model("Text", textSchema);
export const Code = mongoose.model("Code", codeSchema);
export const Summary = mongoose.model("Summary", summarizeSchema);