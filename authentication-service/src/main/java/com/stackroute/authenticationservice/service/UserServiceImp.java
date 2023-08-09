package com.stackroute.authenticationservice.service;


import com.stackroute.authenticationservice.config.MessagingConfig;
import com.stackroute.authenticationservice.exception.UserNotFound;
import com.stackroute.authenticationservice.model.Seller;
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
    public void consumeMessageFromQueue(Seller seller) {
        User u=new User();
        u.setName(seller.getSellerName());
        u.setEmail(seller.getSellerEmail());
        u.setPassword(seller.getSellerPassword());
        u.setRole(User.roles.seller);
        userRepository.save(u);
        System.out.println("Message recieved from seller queue : " + seller);
    }
    @RabbitListener(queues = MessagingConfig.QUEUE_USER)
    public void consumeMessageFromQueue2(User1 user1) {
        User u=new User();
        u.setName(user1.getUserName());
        u.setEmail(user1.getUserEmail());
        u.setPassword(user1.getUserPassword());
        u.setRole(User.roles.user);
        userRepository.save(u);
        System.out.println("Message recieved from user queue : " + user1);
    }

    public User findByUsernameAndPassword(String email,String password)throws UserNotFound {
       User user= this.userRepository.findByEmailAndPassword(email,password);
       if(user==null){
           throw new UserNotFound();
       }
       return user;
    }
}
