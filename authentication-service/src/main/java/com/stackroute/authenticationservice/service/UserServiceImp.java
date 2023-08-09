package com.stackroute.authenticationservice.service;


import com.stackroute.authenticationservice.config.MessagingConfig;
import com.stackroute.authenticationservice.exception.UserNotFound;
import com.stackroute.authenticationservice.model.User;
import com.stackroute.authenticationservice.model.User1;
import com.stackroute.authenticationservice.repository.UserRepository;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class UserServiceImp implements UserService {
    @Autowired
    private UserRepository userRepository;

    @RabbitListener(queues = MessagingConfig.QUEUE_SELLER)
    public void consumeMessageFromQueue(User1 user) {
        User u=new User();
        u.setName(user.getUserName());
        u.setEmail(user.getUserEmail());
        u.setPassword(user.getUserPassword());
        userRepository.save(u);
        System.out.println("Message recieved from seller queue : " + user);
    }
    @RabbitListener(queues = MessagingConfig.QUEUE_USER)
    public void consumeMessageFromQueue2(User1 user) {
        User u=new User();
        u.setName(user.getUserName());
        u.setEmail(user.getUserEmail());
        u.setPassword(user.getUserPassword());
        userRepository.save(u);
        System.out.println("Message recieved from user queue : " + user);
    }

    public User findByUsernameAndPassword(String email,String password)throws UserNotFound {
       User user= this.userRepository.findByEmailAndPassword(email,password);
       if(user==null){
           throw new UserNotFound();
       }
       return user;
    }
}
