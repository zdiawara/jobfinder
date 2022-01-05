package com.codonsensemble.jobfinder.service;

import java.util.Arrays;

import org.jooq.generated.enums.Userrole;
import org.jooq.generated.tables.records.UtilisateurRecord;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.codonsensemble.jobfinder.repository.UtilisateurRepository;

@Service
public class UtilisateurService implements UserDetailsService {

    private final UtilisateurRepository utilisateurRepository;

    public UtilisateurService(UtilisateurRepository utilisateurRepository){
        this.utilisateurRepository = utilisateurRepository;
    }

    public void create(){
        utilisateurRepository.create();
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return utilisateurRepository.findByEmail(email)
                .map(UtilisateurService::toUserDetails)
                .orElseThrow(RuntimeException::new);
    }

    private static UserDetails toUserDetails(UtilisateurRecord utilisateurRecord){
        var roles = Arrays.stream(utilisateurRecord.getRoles())
                .map(Userrole::getLiteral)
                .toArray(String[]::new);

        return User.builder()
                .username(utilisateurRecord.getEmail())
                .password(utilisateurRecord.getPassword())
                .roles(roles)
                .build();
    }
}
