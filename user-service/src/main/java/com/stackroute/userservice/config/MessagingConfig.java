package com.stackroute.userservice.config;

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MessagingConfig {
    public static final String QUEUE_USER = "user_queue";
    public static final String EXCHANGE_USER = "user_exchange";
    public static final String ROUTING_KEY_USER = "user_key";
    public static final String QUEUE_SELLER = "seller_queue";
    public static final String EXCHANGE_SELLER = "seller_exchange";
    public static final String ROUTING_KEY_SELLER = "seller_key";
    @Bean
    public Queue queue(){
        return new Queue(QUEUE_USER);
    }

    @Bean
    public Queue seller_queue(){
        return new Queue(QUEUE_SELLER);

    }
    @Bean
    public TopicExchange topicExchange(){
        return new TopicExchange(EXCHANGE_USER);
    }
    @Bean
    public TopicExchange topicExchangeSeller(){
        return new TopicExchange(EXCHANGE_SELLER);
    }
    @Bean
    public Binding bindingBuilder(Queue queue, TopicExchange topicExchange){
        return BindingBuilder.bind(queue).to(topicExchange).with(ROUTING_KEY_USER);
    }

    @Bean
    public Binding bindingBuilderSeller(Queue queue, TopicExchange topicExchange){
        return BindingBuilder.bind(queue).to(topicExchange).with(ROUTING_KEY_SELLER);
    }
    @Bean
    public MessageConverter converter() {
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public AmqpTemplate template(ConnectionFactory connectionFactory) {
        final RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        rabbitTemplate.setMessageConverter(converter());
        return rabbitTemplate;
    }
}
