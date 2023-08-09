package com.stackroute.sellerservice.config;

import com.stackroute.sellerservice.model.Seller;
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


    public void sendMessageToRabbitMqSeller(Seller u){
        template.convertAndSend(directExchange.getName(), MessagingConfig.ROUTING_KEY_SELLER, u);
    }
}
