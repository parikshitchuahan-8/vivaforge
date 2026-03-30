package com.example.onlineexam;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class QuizSecurityTests {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void quizzesEndpointShouldBePublicWithoutToken() throws Exception {
        mockMvc.perform(get("/api/quizzes"))
                .andExpect(status().isOk());
    }

    @Test
    void quizzesEndpointShouldBePublicEvenWithInvalidToken() throws Exception {
        mockMvc.perform(get("/api/quizzes")
                        .header("Authorization", "Bearer invalid-token"))
                .andExpect(status().isOk());
    }
}
