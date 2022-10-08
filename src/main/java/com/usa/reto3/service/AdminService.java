package com.usa.reto3.service;

import com.usa.reto3.entities.Admin;
import com.usa.reto3.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public List<Admin> getAll() {
        return adminRepository.getAll();
    }

    public Optional<Admin> getAdmin(int id) {
        return adminRepository.getAdmin(id);
    }


    public Admin save(Admin administrador) {
        if (administrador.getId() == null) {
            return adminRepository.save(administrador);
        } else {
            Optional<Admin> a = adminRepository.getAdmin(administrador.getId());
            if (a.isPresent()) {
                return a.get();
            } else {
                return adminRepository.save(administrador);
            }
        }
    }

    public Admin update(Admin administrador) {
        if (administrador.getId() != null) {
            Optional<Admin> ad = adminRepository.getAdmin(administrador.getId());
            if (ad.isPresent()) {
                if (administrador.getName() != null) {
                    ad.get().setName(administrador.getName());
                }
                if (administrador.getEmail() != null) {
                    ad.get().setEmail(administrador.getEmail());
                }
                if (administrador.getPassword() != null) {
                    ad.get().setPassword(administrador.getPassword());
                }

                adminRepository.save(ad.get());
                return ad.get();

            } else {
                return administrador;
            }
        } else {
            return administrador;
        }
    }

    public boolean delete(int id) {
        boolean marca = false;
        Optional<Admin> a = adminRepository.getAdmin(id);
        if (a.isPresent()) {
            adminRepository.delete(a.get());
            marca = true;
        }
        return marca;

    }
}
