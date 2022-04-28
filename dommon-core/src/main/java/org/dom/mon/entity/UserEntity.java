package org.dom.mon.entity;

import io.quarkus.security.User;
import io.quarkus.security.jpa.Password;
import io.quarkus.security.jpa.Roles;
import io.quarkus.security.jpa.UserDefinition;
import io.quarkus.security.jpa.Username;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "users")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@UserDefinition
public class UserEntity extends BaseEntity {

    @Column(name = "username")
    @Username
    public String username;

    @Column(name = "password")
    @Password
    public String password;

    @Column(name = "role")
    @Roles
    public String role;

    @Column(name = "email_address")
    public String emailAddress;

    @Column(name = "verified")
    public Boolean verified;

    @OneToOne(cascade = CascadeType.ALL, mappedBy = "userEntity")
    @JoinColumn(name = "verification_id")
    public VerificationEntity verification;
}

