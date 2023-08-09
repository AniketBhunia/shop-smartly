package com.stackroute.sellerservice.service;

import com.stackroute.sellerservice.config.Producer;
import com.stackroute.sellerservice.model.Seller;
import com.stackroute.sellerservice.repository.SellerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class SellerServiceImp implements SellerService{
    @Autowired
    private SellerRepository sellerRepository;

    @Autowired
    private SequenceGeneratorService sequenceGeneratorService;
    @Autowired
    private Producer producer;
    public Seller doRegister(Seller u){
        Optional<Seller> user=sellerRepository.findBySellerEmail(u.getSellerEmail());
        if(user.isPresent()){
            return null;
        }else{
            u.setSellerId((int)sequenceGeneratorService.generateSequence(Seller.SEQUENCE_NAME));
            System.out.println("seller service");
            producer.sendMessageToRabbitMqSeller(u);
            sellerRepository.save(u);
        }
        return u;
    }
}
