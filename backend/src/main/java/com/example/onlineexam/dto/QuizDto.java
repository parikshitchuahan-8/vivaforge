package com.example.onlineexam.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class QuizDto {
    private Long id;
    private String title;
    private String description;
    private int durationMinutes;
    private int questionCount;
}
