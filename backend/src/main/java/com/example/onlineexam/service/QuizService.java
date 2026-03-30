package com.example.onlineexam.service;

import com.example.onlineexam.dto.AIQuestionResponse;
import com.example.onlineexam.dto.QuestionDto;
import com.example.onlineexam.dto.QuizDto;
import com.example.onlineexam.dto.QuizSubmissionRequest;
import com.example.onlineexam.model.Question;
import com.example.onlineexam.model.Quiz;
import com.example.onlineexam.model.Result;
import com.example.onlineexam.model.User;
import com.example.onlineexam.repository.QuizRepository;
import com.example.onlineexam.repository.ResultRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class QuizService {

    private final AIQuestionService aiQuestionService;
    private final ResultRepository resultRepository;
    private final QuizRepository quizRepository;

    @Transactional(readOnly = true)
    public List<QuizDto> getAllQuizzes() {
        return quizRepository.findAll().stream()
                .map(this::toQuizDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public Optional<QuizDto> getQuizById(Long quizId) {
        return quizRepository.findById(quizId)
                .map(this::toQuizDto);
    }

    @Transactional(readOnly = true)
    public Optional<List<QuestionDto>> getQuizQuestions(Long quizId) {
        return quizRepository.findById(quizId)
                .map(quiz -> quiz.getQuestions().stream()
                        .map(this::toQuestionDto)
                        .toList());
    }

    @Transactional
    public Result calculateResult(User user, Long quizId, QuizSubmissionRequest submission) {
        Quiz quiz = quizRepository.findById(quizId).orElseThrow(() -> new RuntimeException("Quiz not found"));
        int score = (int) quiz.getQuestions().stream()
                .filter(question -> Objects.equals(
                        submission.getAnswers().get(question.getId()),
                        question.getCorrectAnswerIndex()
                ))
                .count();

        Result result = new Result();
        result.setUser(user);
        result.setQuiz(quiz);
        result.setScore(score);
        result.setTotalQuestions(quiz.getQuestions().size());
        result.setSubmissionTime(LocalDateTime.now());

        return resultRepository.save(result);
    }

    @Transactional
    public Quiz createAIQuiz(
            String title,
            String topic,
            String difficulty,
            int count) {

        Quiz quiz = new Quiz();
        quiz.setTitle(title);
        quiz.setDurationMinutes(10);

        //  IMPORTANT: create list
        List<Question> questionList = new ArrayList<>();

        List<AIQuestionResponse> aiQuestions =
                aiQuestionService.generateQuestions(topic, difficulty, count);

        for (AIQuestionResponse aiQ : aiQuestions) {
            Question question = new Question();
            question.setText(aiQ.getQuestion());
            question.setOptions(aiQ.getOptions());
            question.setCorrectAnswerIndex(aiQ.getCorrectAnswerIndex());

            //  set relationship BOTH sides
            question.setQuiz(quiz);
            questionList.add(question);
        }

        //  attach questions to quiz
        quiz.setQuestions(questionList);

        //  save ONCE (cascade will save questions)
        return quizRepository.save(quiz);
    }

    private QuizDto toQuizDto(Quiz quiz) {
        return QuizDto.builder()
                .id(quiz.getId())
                .title(quiz.getTitle())
                .description(quiz.getDescription())
                .durationMinutes(quiz.getDurationMinutes())
                .questionCount(quiz.getQuestions().size())
                .build();
    }

    private QuestionDto toQuestionDto(Question question) {
        QuestionDto dto = new QuestionDto();
        dto.setId(question.getId());
        dto.setText(question.getText());
        dto.setOptions(question.getOptions());
        return dto;
    }

}
