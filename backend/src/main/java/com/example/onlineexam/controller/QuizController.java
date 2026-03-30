package com.example.onlineexam.controller;

import com.example.onlineexam.dto.AiQuizCreateRequest;
import com.example.onlineexam.dto.QuestionDto;
import com.example.onlineexam.dto.QuizDto;
import com.example.onlineexam.dto.QuizSubmissionRequest;
import com.example.onlineexam.model.Result;
import com.example.onlineexam.model.User;
import com.example.onlineexam.repository.UserRepository;
import com.example.onlineexam.service.QuizService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quizzes")
@RequiredArgsConstructor
public class QuizController {

    private final UserRepository userRepository;
    private final QuizService quizService;

    @GetMapping
    public ResponseEntity<List<QuizDto>> getAllQuizzes() {
        return ResponseEntity.ok(quizService.getAllQuizzes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<QuizDto> getQuizById(@PathVariable Long id) {
        return quizService.getQuizById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/questions")
    public ResponseEntity<List<QuestionDto>> getQuizQuestions(@PathVariable Long id) {
        return quizService.getQuizQuestions(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/submit")
    public ResponseEntity<Result> submitQuiz(@PathVariable Long id, @RequestBody QuizSubmissionRequest submission, @AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow(() -> new RuntimeException("User not found"));
        Result result = quizService.calculateResult(user, id, submission);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/ai/create")
    public ResponseEntity<QuizDto> createAIQuiz(@Valid @RequestBody AiQuizCreateRequest request) {
        var quiz = quizService.createAIQuiz(
                request.getTitle(),
                request.getTopic(),
                request.getDifficulty(),
                request.getCount()
        );

        return quizService.getQuizById(quiz.getId())
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build());
    }
}
