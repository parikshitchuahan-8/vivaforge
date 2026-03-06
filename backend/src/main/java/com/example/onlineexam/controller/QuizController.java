package com.example.onlineexam.controller;

import com.example.onlineexam.dto.QuestionDto;
import com.example.onlineexam.dto.QuizSubmissionRequest;
import com.example.onlineexam.model.Question;
import com.example.onlineexam.model.Quiz;
import com.example.onlineexam.model.Result;
import com.example.onlineexam.model.User;
import com.example.onlineexam.repository.QuizRepository;
import com.example.onlineexam.repository.UserRepository;
import com.example.onlineexam.service.QuizService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/quizzes")
@RequiredArgsConstructor
public class QuizController {

    private final QuizRepository quizRepository;
    private final UserRepository userRepository;
    private final QuizService quizService;

    @GetMapping
    public List<Quiz> getAllQuizzes() {
        return quizRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Quiz> getQuizById(@PathVariable Long id) {
        return quizRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/questions")
    public ResponseEntity<List<QuestionDto>> getQuizQuestions(@PathVariable Long id) {
        Quiz quiz = quizRepository.findById(id).orElse(null);
        if (quiz == null) {
            return ResponseEntity.notFound().build();
        }
        // Map Question entities to QuestionDto to hide the correct answer
        List<QuestionDto> questionDtos = quiz.getQuestions().stream().map(q -> {
            QuestionDto dto = new QuestionDto();
            dto.setId(q.getId());
            dto.setText(q.getText());
            dto.setOptions(q.getOptions());
            return dto;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(questionDtos);
    }

    @PostMapping("/{id}/submit")
    public ResponseEntity<Result> submitQuiz(@PathVariable Long id, @RequestBody QuizSubmissionRequest submission, @AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow(() -> new RuntimeException("User not found"));
        Result result = quizService.calculateResult(user, id, submission);
        return ResponseEntity.ok(result);
    }
    @PostMapping("/ai/create")
    public ResponseEntity<Quiz> createAIQuiz(
            @RequestParam String title,
            @RequestParam String topic,
            @RequestParam String difficulty,
            @RequestParam int count) {

        Quiz quiz = quizService.createAIQuiz(title, topic, difficulty, count);
        return ResponseEntity.ok(quiz);
    }
}