package com.example.onlineexam;

import com.example.onlineexam.model.Question;
import com.example.onlineexam.model.Quiz;
import com.example.onlineexam.model.User;
import com.example.onlineexam.repository.QuizRepository;
import com.example.onlineexam.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final QuizRepository quizRepository;
    private final PasswordEncoder passwordEncoder;
    @Value("${app.seed.enabled:true}")
    private boolean seedEnabled;

    @Override
    public void run(String... args) throws Exception {
        if (!seedEnabled) {
            return;
        }

        if (userRepository.count() == 0) {
            User student = new User();
            student.setUsername("student");
            student.setPassword(passwordEncoder.encode("password"));
            student.setEmail("student@example.com");
            student.setFirstName("John");
            student.setLastName("Doe");
            student.setRoles(Set.of("ROLE_USER"));
            userRepository.save(student);
        }

        if (quizRepository.count() == 0) {
            Quiz javaBasics = new Quiz();
            javaBasics.setTitle("Java Basics Quiz");
            javaBasics.setDescription("A simple quiz to test your fundamental knowledge of Java.");
            javaBasics.setDurationMinutes(1); // 1 minute for testing the timer

            Question q1 = new Question();
            q1.setText("Which of the following is not a Java keyword?");
            q1.setOptions(List.of("static", "try", "String", "integer"));
            q1.setCorrectAnswerIndex(3);
            q1.setQuiz(javaBasics);

            Question q2 = new Question();
            q2.setText("What is the size of an int variable in bytes?");
            q2.setOptions(List.of("8", "4", "2", "16"));
            q2.setCorrectAnswerIndex(1);
            q2.setQuiz(javaBasics);

            Question q3 = new Question();
            q3.setText("Which method must be implemented by all threads?");
            q3.setOptions(List.of("wait()", "start()", "stop()", "run()"));
            q3.setCorrectAnswerIndex(3);
            q3.setQuiz(javaBasics);

            javaBasics.setQuestions(List.of(q1,q2,q3));
            quizRepository.save(javaBasics);
        }
    }
}
