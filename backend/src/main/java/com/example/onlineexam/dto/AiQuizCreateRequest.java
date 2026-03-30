package com.example.onlineexam.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AiQuizCreateRequest {
    @NotBlank
    private String title;

    @NotBlank
    private String topic;

    @NotBlank
    private String difficulty;

    @Min(1)
    @Max(20)
    private int count;
}
