package com.stackroute.userservice.config;

import com.stackroute.userservice.model.User;
import lombok.AllArgsConstructor;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class Producer {

    @Autowired
    private RabbitTemplate template;
    @Autowired
    private DirectExchange directExchange;
    public void sendMessageToRabbitMqUser(User u){
        template.convertAndSend(directExchange.getName(), MessagingConfig.ROUTING_KEY_USER, u);
    }

    public void sendMessageToRabbitMqSeller(User u){
        template.convertAndSend(directExchange.getName(), MessagingConfig.ROUTING_KEY_SELLER, u);
    }
}
