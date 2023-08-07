package com.stackroute.userservice.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
@AllArgsConstructor
@NoArgsConstructor
public class DatabaseSequence {

    @Id
    @Getter
    @Setter
    private String id;

    @Getter
    @Setter
    private int seq;
}
