package com.usa.reto3.service;

import com.usa.reto3.entities.Score;
import com.usa.reto3.repository.ScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
@Service
@Transactional
public class ScoreService {
    @Autowired
    private ScoreRepository scoreRepository;

    public List<Score> getAll(){
        return scoreRepository.getAll();
    }
    public Optional<Score> getScore(int id){
        return scoreRepository.getScore(id);
    }

    public Score get(Integer id) {
        return scoreRepository.getScore(id).get();
    }
    public Score save(Score s){
        if(s.getIdScore()==null){
            return scoreRepository.save(s);
        }else{
            Optional<Score> r = scoreRepository.getScore(s.getIdScore());
            if(r.isPresent()){
                return s;
            }else{
                return scoreRepository.save(s);
            }
        }
    }
    public Score update(Score s){
        if(s.getIdScore()!=null){
            Optional<Score> t = scoreRepository.getScore(s.getIdScore());
            if(t.isPresent()){
                if(s.getMessageText()!=null){
                    t.get().setMessageText(s.getMessageText());
                }
                if(s.getStars()!=null){
                    t.get().setStars(s.getStars());
                }

                scoreRepository.save(t.get());
                return t.get();
            }else{
                return s;
            }
        }else{
            return s;
        }
    }
    public boolean delete(int id){
        boolean flag=false;
        Optional<Score>s= scoreRepository.getScore(id);
        if(s.isPresent()){
            scoreRepository.delete(s.get());
            flag=true;
        }
        return flag;
    }
}
