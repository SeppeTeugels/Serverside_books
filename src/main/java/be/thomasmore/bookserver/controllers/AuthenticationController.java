package be.thomasmore.bookserver.controllers;

import be.thomasmore.bookserver.model.User;
import be.thomasmore.bookserver.model.dto.AuthenticationDTO;
import be.thomasmore.bookserver.model.dto.UserDTO;
import be.thomasmore.bookserver.repositories.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@Slf4j
public class AuthenticationController {
    @Autowired
    UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @GetMapping("/authenticate")
    public AuthenticationDTO authenticate(Principal principal) {
        log.info("##### authenticate");
        return new AuthenticationDTO(principal != null ? principal.getName() : "anonymous");
    }

    @PostMapping("/signup")
    public AuthenticationDTO signup(@RequestBody UserDTO userDTO) {
        log.info("##### signup " + userDTO.getUsername());
        Optional<User> optionalUser = userRepository.findByUsername(userDTO.getUsername());
        if (optionalUser.isPresent())
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    String.format("User with name %s already exists.", userDTO.getUsername()));

        User newUser = new User();
        newUser.setUsername(userDTO.getUsername());
        newUser.setRole("USER");
        String encode = passwordEncoder.encode(userDTO.getPassword());
        newUser.setPassword(encode);
        User newSavedUser = userRepository.save(newUser);

        autologin(userDTO.getUsername(), userDTO.getPassword());

        return new AuthenticationDTO(newSavedUser.getUsername());
    }

    private void autologin(String userName, String password) {
        UsernamePasswordAuthenticationToken token
                = new UsernamePasswordAuthenticationToken(userName, password);

        try {
            Authentication auth = authenticationManager.authenticate(token);
            log.info("authentication: " + auth.isAuthenticated());

            SecurityContext sc = SecurityContextHolder.getContext();
            sc.setAuthentication(auth);
        } catch (AuthenticationException e) {
            e.printStackTrace();
        }
    }
}
