import OpenAI from "openai";
import type { ChatCompletionCreateParamsBase } from "openai/resources/chat/completions";
import { OPEN_AI_KEY } from "../common/constant/ai";

export class OpenAiService {
	private openai: OpenAI;

	constructor() {
		this.openai = new OpenAI({
			apiKey: OPEN_AI_KEY,
		});
	}

	async chat({
		messages,
		model = "gpt-4o",
		maxTokens = 1000,
		responseFormat,
	}: {
		messages: OpenAI.Chat.ChatCompletionMessageParam[];
		model?: string;
		maxTokens?: number;
		responseFormat?: ChatCompletionCreateParamsBase["response_format"];
	}) {
		const completion = await this.openai.chat.completions.create({
			model,
			messages,
			temperature: 0.5,
			max_tokens: maxTokens,
			response_format: responseFormat,
		});
		return completion.choices[0].message.content;
	}
}

export const openAiService = new OpenAiService();
