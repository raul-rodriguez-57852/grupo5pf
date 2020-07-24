/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.edusis.apirest.domain;

import com.sun.istack.NotNull;
import javax.persistence.CascadeType;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.OneToOne;

/**
 *
 * @author Facundo Raviolo
 */
@Entity
@DiscriminatorValue(value=Persona.DTYPE_ALUMNO)
public class Alumno extends Persona {
    
    @NotNull
    @OneToOne(mappedBy = "alumno", cascade = CascadeType.ALL, orphanRemoval = true)
    private PasswordEmoji passwordEmoji;
    
    private String avatarUrl;
    
    // GETTERS && SETTERS

    public PasswordEmoji getPasswordEmoji() {
        return passwordEmoji;
    }

    public void setPasswordEmoji(PasswordEmoji passwordEmoji) {
        passwordEmoji.setAlumno(this);
        this.passwordEmoji = passwordEmoji;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }
    
}