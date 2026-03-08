package com.example.onlineexam.service;

import com.example.onlineexam.dto.AIQuestionResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AIQuestionService {

    private final ChatClient chatClient;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public List<AIQuestionResponse> generateQuestions(
            String topic, String difficulty, int count) {

        String prompt = """
You are a JSON API.

Return ONLY valid JSON.
No text, no explanation, no markdown.

Generate %d MCQ questions on topic "%s".
Difficulty: %s.

JSON format:
[
  {
    "question": "string",
    "options": ["A","B","C","D"],
    "correctAnswerIndex": 0
  }
]
""".formatted(count, topic, difficulty);

        String response = chatClient
                .prompt()
                .user(prompt)
                .call()
                .content();

        try {
            // HARD CLEANING
            response = response.trim();

            // remove markdown if any
            response = response
                    .replace("```json", "")
                    .replace("```", "")
                    .replace("\n", "")
                    .trim();

            // extract JSON array safely
            int start = response.indexOf("[");
            int end = response.lastIndexOf("]");

            if (start == -1 || end == -1) {
                throw new RuntimeException("No JSON array found in AI response:\n" + response);
            }

            String cleanJson = response.substring(start, end + 1);

            return objectMapper.readValue(
                    cleanJson,
                    new com.fasterxml.jackson.core.type.TypeReference<List<AIQuestionResponse>>() {}
            );

        } catch (Exception e) {
            throw new RuntimeException("Failed to parse AI response:\n" + response, e);
        }
    }

}
