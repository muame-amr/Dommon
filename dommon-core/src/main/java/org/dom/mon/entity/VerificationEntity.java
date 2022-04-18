package org.dom.mon.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "verification")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class VerificationEntity extends BaseEntity{

    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id")
    public UserEntity user;

    @Column(name = "activation_token")
    public String activationToken;

    @Column(name = "reset_token")
    public String resetToken;
}
