package com.stackroute.userservice.service;


import com.stackroute.userservice.config.MessagingConfig;
import com.stackroute.userservice.config.Producer;
import com.stackroute.userservice.model.User;
import com.stackroute.userservice.repository.UserRepository;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImp implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private Producer producer;
    @Autowired
    private SequenceGeneratorService sequenceGeneratorService;
    public User doRegister(User u){
        Optional<User> user=userRepository.findByUserEmail(u.getUserEmail());
        if(user.isPresent()){
            return null;
        }else{
            u.setUserId((int) sequenceGeneratorService.generateSequence(User.SEQUENCE_NAME));
            System.out.println("user service");
            producer.sendMessageToRabbitMqUser(u);
            userRepository.save(u);
        }
        return u;
    }

    public List<User> getAllUser(){
        List<User> users=userRepository.findAll();
        if(users.size()==0)
            return null;
        else
            return users;
    }
}
