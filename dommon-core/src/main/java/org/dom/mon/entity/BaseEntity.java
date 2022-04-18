package org.dom.mon.entity;


import io.quarkus.hibernate.orm.panache.PanacheEntity;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import java.sql.Timestamp;

@Getter
@Setter
@MappedSuperclass
public class BaseEntity extends PanacheEntity {
    @Column(name = "created_at", nullable = false, updatable = false)
    @CreationTimestamp
    public Timestamp createdAt;

    @Column(name = "updated_at")
    @UpdateTimestamp
    public Timestamp updatedAt;

    @Column(name = "deleted_at")
    public Timestamp deletedAt;
}
