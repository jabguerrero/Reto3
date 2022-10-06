package com.usa.reto3.service;

import com.usa.reto3.entities.Motorbike;
import com.usa.reto3.repository.MotorbikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MotorbikeService {

    @Autowired
    private MotorbikeRepository motorbikeRepository;

    public List<Motorbike> getAll(){
        return motorbikeRepository.getAll();
    }

    public Optional<Motorbike> getMotorbike(int id) {

        return motorbikeRepository.getMotorbike(id);
    }
    public Motorbike save(Motorbike p){
        if(p.getId()==null){
            return motorbikeRepository.save(p);
        }else{
            Optional<Motorbike> e = motorbikeRepository.getMotorbike(p.getId());
            if(e.isPresent()){

                return p;
            }else{

                return motorbikeRepository.save(p);

            }
        }
    }
    public Motorbike update(Motorbike p){
        if(p.getId()!=null){
            Optional<Motorbike> q = motorbikeRepository.getMotorbike(p.getId());
            if(q.isPresent()){
                if(p.getBrand()!=null){
                    q.get().setBrand(p.getBrand());
                }
                if(p.getName()!=null){
                    q.get().setName(p.getName());
                }
                if(p.getYear()!=null){
                    q.get().setYear(p.getYear());
                }
                if(p.getDescription()!=null){
                    q.get().setDescription(p.getDescription());
                }
                if(p.getCategory()!=null){
                    q.get().setCategory(p.getCategory());
                }
                if(p.getMessages()!=null){
                    q.get().setMessages(p.getMessages());
                }
                if(p.getReservations()!=null){
                    q.get().setReservations(p.getReservations());
                }
                motorbikeRepository.save(q.get());
                return q.get();
            }else{
                return p;
            }
        }else{
            return p;
        }
    }
    public boolean delete(int id){
        boolean flag=false;
        Optional<Motorbike>p= motorbikeRepository.getMotorbike(id);
        if(p.isPresent()){
            motorbikeRepository.delete(p.get());
            flag=true;
        }
        return flag;
    }
}
