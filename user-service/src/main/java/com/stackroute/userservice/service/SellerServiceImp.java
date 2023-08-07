package com.stackroute.userservice.service;

import com.stackroute.userservice.config.MessagingConfig;
import com.stackroute.userservice.model.User;
import com.stackroute.userservice.repository.UserRepository;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SellerServiceImp implements SellerService{
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RabbitTemplate template;
    @Autowired
    private SequenceGeneratorService sequenceGeneratorService;
    public User doRegister(User u){
        Optional<User> user=userRepository.findByUserEmail(u.getUserEmail());
        if(user.isPresent()){
            return null;
        }else{
            u.setUserId((int) sequenceGeneratorService.generateSequence(User.SEQUENCE_NAME));
            System.out.println("seller service");
            template.convertAndSend(MessagingConfig.EXCHANGE_SELLER, MessagingConfig.ROUTING_KEY_SELLER, u);
            userRepository.save(u);
        }
        return u;
    }
}
