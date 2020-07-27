/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.edusis.apirest.domain;

import com.sun.istack.NotNull;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
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
    
    @ManyToMany
    @JoinTable(name="cursos",joinColumns = @JoinColumn(name= "alumno_id"),
            inverseJoinColumns = @JoinColumn(name = "curso_id"))
    private List<Curso> cursos;
    
    public List<Curso> getCursos() {
        return cursos;
    }

    // GETTERS && SETTERS
    public void setCursos(List<Curso> cursos) {
        this.cursos = cursos;
    }

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