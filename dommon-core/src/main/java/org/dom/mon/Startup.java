package org.dom.mon;

import io.quarkus.elytron.security.common.BcryptUtil;
import io.quarkus.runtime.StartupEvent;
import org.dom.mon.entity.UserEntity;
import org.eclipse.microprofile.config.inject.ConfigProperty;

import javax.enterprise.event.Observes;
import javax.inject.Singleton;
import javax.transaction.Transactional;

@Singleton
public class Startup {

    @ConfigProperty(name = "admin.username")
    public String username;

    @ConfigProperty(name = "admin.password")
    public String password;

    @ConfigProperty(name = "admin.email")
    public String emailAddress;

    @Transactional
    public void loadUsers(@Observes StartupEvent event) {
        UserEntity userEntity = new UserEntity();
        userEntity.setUsername(username);
        userEntity.setPassword(BcryptUtil.bcryptHash(password));
        userEntity.setRole(Global.ADMIN);
        userEntity.setEmailAddress(emailAddress);
        userEntity.setVerified(true);
        userEntity.persist();
    }
}
