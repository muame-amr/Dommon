package org.dom.mon.service;

import io.quarkus.elytron.security.common.BcryptUtil;
import org.dom.mon.Global;
import org.dom.mon.entity.UserEntity;
import org.dom.mon.entity.VerificationEntity;

import javax.enterprise.context.ApplicationScoped;
import java.util.Optional;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@ApplicationScoped
public class UserService {

    public Optional<UserEntity> getUserByUsername(String username) {
        return UserEntity.find("username", username).firstResultOptional();
    }

    public Optional<UserEntity> getUserById(Long id) {
        return UserEntity.findByIdOptional(id);
    }

    public boolean validatePassword(String password) {
        Pattern pattern = Pattern.compile("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{8,20}$");
        Matcher matcher = pattern.matcher(password);
        return matcher.matches();
    }

    public boolean checkEmailExist(String emailAddress) {
        return UserEntity.find("emailAddress", emailAddress).firstResultOptional().isPresent() ? true : false;
    }

    public UserEntity createUser(String username, String emailAddress, String password, String phoneNo) {
        UserEntity userEntity = new UserEntity();
        userEntity.setUsername(username);
        userEntity.setPassword(BcryptUtil.bcryptHash(password));
        userEntity.setEmailAddress(emailAddress);
        userEntity.setPhoneNo(phoneNo);
        userEntity.setRole(Global.USER);
        userEntity.setVerified(false);
        return userEntity;
    }

    public Boolean verifyPassword(String password, String passwordHash) {
        return BcryptUtil.matches(password, passwordHash);
    }

    public void createActivation(UserEntity userEntity) {
        String token = UUID.randomUUID().toString();
        VerificationEntity verificationEntity = new VerificationEntity();
        verificationEntity.setUserEntity(UserEntity.findById(userEntity.id));
        verificationEntity.setActivationToken(token);
        verificationEntity.setExpired(false);
        verificationEntity.persist();
    }
}
