package com.stackroute.sellerservice.config;

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Component
public class MessagingConfig {

    public static final String EXCHANGE= "exchange2";

    public static final String QUEUE_SELLER = "seller_queue2";
  //  public static final String EXCHANGE_SELLER = "seller_exchange";
    public static final String ROUTING_KEY_SELLER = "seller_key2";


    @Bean
    public Queue seller_queue(){
        return new Queue(QUEUE_SELLER);

    }
    @Bean
    public DirectExchange directExchange(){
        return new DirectExchange(EXCHANGE);
    }
//    @Bean
//    public TopicExchange topicExchangeSeller(){
//        return new TopicExchange(EXCHANGE_SELLER);
//    }


    @Bean
    public Binding bindingBuilderSeller(Queue seller_queue, DirectExchange exchange){
        return BindingBuilder.bind(seller_queue()).to(exchange).with(ROUTING_KEY_SELLER);
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
