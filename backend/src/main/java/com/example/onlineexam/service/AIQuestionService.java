package com.example.onlineexam.service;

import com.example.onlineexam.dto.AIQuestionResponse;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AIQuestionService {

    private final ChatClient chatClient;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public List<AIQuestionResponse> generateQuestions(
            String topic,
            String difficulty,
            int count
    ) {

        String prompt = """
You are an API that generates exam questions.

Return ONLY valid JSON.

Generate %d multiple choice questions.

Topic: %s
Difficulty: %s

Rules:
- Exactly 4 options
- Only ONE correct answer
- Return ONLY JSON
- No explanation
- No markdown

Format:

[
{
"question":"question text",
"options":["A","B","C","D"],
"correctAnswerIndex":0
}
]
""".formatted(count, topic, difficulty);

        try {

            String response = chatClient
                    .prompt()
                    .user(prompt)
                    .call()
                    .content();

            response = cleanResponse(response);

            List<AIQuestionResponse> questions =
                    objectMapper.readValue(
                            response,
                            new TypeReference<List<AIQuestionResponse>>() {}
                    );

            // ensure count is correct
            if (questions.size() < count) {
                questions.addAll(generateFallback(topic, count - questions.size()));
            }

            return questions;

        } catch (Exception e) {

            System.out.println("AI FAILED — using fallback questions");

            return generateFallback(topic, count);
        }
    }

    private String cleanResponse(String response) {

        response = response
                .replace("```json", "")
                .replace("```", "")
                .trim();

        int start = response.indexOf("[");
        int end = response.lastIndexOf("]");

        if (start != -1 && end != -1) {
            return response.substring(start, end + 1);
        }

        return response;
    }

    private List<AIQuestionResponse> generateFallback(String topic, int count) {

        List<AIQuestionResponse> list = new ArrayList<>();

        for (int i = 1; i <= count; i++) {

            AIQuestionResponse q = new AIQuestionResponse();

            q.setQuestion("Sample question " + i + " about " + topic + "?");

            q.setOptions(List.of(
                    "Option A",
                    "Option B",
                    "Option C",
                    "Option D"
            ));

            q.setCorrectAnswerIndex(0);

            list.add(q);
        }

        return list;
    }
}