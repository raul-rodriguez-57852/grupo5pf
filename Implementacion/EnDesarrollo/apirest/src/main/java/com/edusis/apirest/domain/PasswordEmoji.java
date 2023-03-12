/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.edusis.apirest.domain;

import com.edusis.apirest.generic.GenericEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import com.edusis.apirest.domain.Alumno;

/**
 *
 * @author Facundo Raviolo
 */
@Entity
@Table(name="PasswordEmoji")
public class PasswordEmoji extends GenericEntity {
    
    @OneToOne
    @JoinColumn(name = "alumno_id")
    @JsonIgnore
    private Alumno alumno;

    @NotNull
    @ManyToOne
    private Emoji emoji1;
    
    @NotNull
    @ManyToOne
    private Emoji emoji2;
    
    @NotNull
    @ManyToOne
    private Emoji emoji3;
    
    // GETTERS && SETTERS

    public Alumno getAlumno() {
        return alumno;
    }

    public void setAlumno(Alumno alumno) {
        this.alumno = alumno;
    }

    public Emoji getEmoji1() {
        return emoji1;
    }

    public void setEmoji1(Emoji emoji1) {
        this.emoji1 = emoji1;
    }

    public Emoji getEmoji2() {
        return emoji2;
    }

    public void setEmoji2(Emoji emoji2) {
        this.emoji2 = emoji2;
    }

    public Emoji getEmoji3() {
        return emoji3;
    }

    public void setEmoji3(Emoji emoji3) {
        this.emoji3 = emoji3;
    }
    
}
