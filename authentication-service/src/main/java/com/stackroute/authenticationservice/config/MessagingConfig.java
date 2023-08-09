package com.stackroute.authenticationservice.config;


import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MessagingConfig {
    public static final String QUEUE_USER = "user_queue1";
    public static final String EXCHANGE_USER = "user_exchange1";
    public static final String ROUTING_KEY_USER = "user_key1";
    public static final String QUEUE_SELLER = "seller_queue1";

    public static final String ROUTING_KEY_SELLER = "seller_key1";
    @Bean
    public Queue queue(){
        return new Queue(QUEUE_USER);
    }

    @Bean
    public Queue seller_queue(){
        return new Queue(QUEUE_SELLER);

    }
    @Bean
    public DirectExchange directExchange(){
        return new DirectExchange(EXCHANGE_USER);
    }


    @Bean
    public Binding bindingBuilder(Queue queue, DirectExchange directExchange){
        return BindingBuilder.bind(queue()).to(directExchange).with(ROUTING_KEY_USER);
    }

    @Bean
    public Binding bindingBuilderSeller(Queue seller_queue, DirectExchange directExchange){
        return BindingBuilder.bind(seller_queue()).to(directExchange).with(ROUTING_KEY_SELLER);
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