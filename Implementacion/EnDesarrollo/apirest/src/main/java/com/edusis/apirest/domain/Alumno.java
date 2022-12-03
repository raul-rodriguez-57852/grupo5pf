/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.edusis.apirest.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.persistence.*;

/**
 *
 * @author Facundo Raviolo
 */
@Entity
@DiscriminatorValue(value=Persona.DTYPE_ALUMNO)
public class Alumno extends Persona {

    @JsonIgnore
    @ManyToOne
    private Tutor tutor;
    
    @NotNull
    @OneToOne(mappedBy = "alumno", cascade = CascadeType.ALL, orphanRemoval = true)
    private PasswordEmoji passwordEmoji;
    
    private String avatarUrl;
    
    @ManyToMany
    @JsonIgnore
    @JoinTable(name="cursos_alumnos",joinColumns = @JoinColumn(name= "curso_id"),
            inverseJoinColumns = @JoinColumn(name = "alumno_id"))
    private List<Curso> cursos;
    
    private Integer saldoEstrellas;

    @OneToMany(mappedBy = "alumno")
    private List<RecompensaAlumno> recompensas;

    // CUSTOM
    
    public Integer sumarEstrellas(Integer estrellas){
        if(saldoEstrellas == null){
            saldoEstrellas = estrellas;
        }else{
            saldoEstrellas = saldoEstrellas + estrellas;
        }
        return saldoEstrellas;
    }
    
    /////// GETTERS && SETTERS ///////
    
    public List<Curso> getCursos() {
        return cursos;
    }

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

    public Tutor getTutor() {
        return tutor;
    }

    public void setTutor(Tutor tutor) {
        this.tutor = tutor;
    }

    public Integer getSaldoEstrellas() {
        return saldoEstrellas;
    }

    public void setSaldoEstrellas(Integer saldoEstrellas) {
        this.saldoEstrellas = saldoEstrellas;
    }

    public List<RecompensaAlumno> getRecompensas() {
        return recompensas;
    }

    public void setRecompensas(List<RecompensaAlumno> recompensas) {
        this.recompensas = recompensas;
    }

    public void addRecompensa(RecompensaAlumno recompensa) {
        this.recompensas.add(recompensa);
    }

}