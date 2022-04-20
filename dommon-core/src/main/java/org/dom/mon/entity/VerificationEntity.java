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

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "user_id")
    public UserEntity userEntity;

    @Column(name = "activation_token")
    public String activationToken;

    @Column(name = "expired")
    public Boolean expired;
}
