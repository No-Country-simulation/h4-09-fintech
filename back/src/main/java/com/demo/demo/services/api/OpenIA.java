package com.demo.demo.services.api;

import lombok.Getter;
import org.springframework.ai.openai.OpenAiChatModel;
import org.springframework.ai.openai.OpenAiChatOptions;
import org.springframework.ai.openai.api.OpenAiApi;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@Getter
public class OpenIA {

//    @Value("${OPENAI_API_KEY}")
//    private String openAiApiKey;

    OpenAiApi openAiApi = new OpenAiApi("https://api.groq.com/openai","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");
    OpenAiChatOptions openAiChatOptions = OpenAiChatOptions.builder()
            .model("llama3-70b-8192")
            .temperature(0.7)
            .maxTokens(500)
            .build();
    OpenAiChatModel chatModelNotification = new OpenAiChatModel(this.openAiApi, this.openAiChatOptions);
}
