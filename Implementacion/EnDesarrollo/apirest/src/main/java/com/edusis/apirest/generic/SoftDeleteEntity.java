/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.edusis.apirest.generic;

import com.sun.istack.NotNull;
import javax.persistence.Column;
import javax.persistence.MappedSuperclass;

/**
 *
 * @author manuel
 * Entity used for implementing soft deletion.
 */
@MappedSuperclass
public abstract class SoftDeleteEntity extends GenericEntity {
    
    @Column(name="is_active")
    @NotNull
    private Boolean isActive = Boolean.TRUE;
    
    public Boolean getIsActive() {
        return this.isActive;
    }
    
    public void setIsActive(Boolean status) {
        this.isActive = status;
    }
    
}
