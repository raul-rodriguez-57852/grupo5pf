/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.edusis.apirest.domain;

import com.edusis.apirest.generic.GenericEntity;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 *
 * @author Manuel Frana
 */
@Entity
@Table(name="CursoBonusAlumno")
public class CursoBonusAlumno extends GenericEntity {
    
    @JsonIgnore
    @ManyToOne
    private Curso curso;
    
    @JsonIgnore
    @ManyToOne
    private Alumno alumno;
    
    @JsonBackReference
    @ManyToOne
    private Bonus bonus;
    
    private Boolean equipado = Boolean.FALSE;
    
    private Long bonus_reference;
    
    private Long curso_reference;

    public Long getCurso_reference() {
        return curso_reference;
    }

    public void setCurso_reference(Long curso_reference) {
        this.curso_reference = curso_reference;
    }

    public Long getBonus_reference() {
        return bonus_reference;
    }

    public void setBonus_reference(Long bonus_reference) {
        this.bonus_reference = bonus_reference;
    }

    public Curso getCurso() {
        return curso;
    }

    public void setCurso(Curso curso) {
        this.curso = curso;
    }

    public Alumno getAlumno() {
        return alumno;
    }

    public void setAlumno(Alumno alumno) {
        this.alumno = alumno;
    }

    public Bonus getBonus() {
        return bonus;
    }

    public void setBonus(Bonus bonus) {
        this.bonus = bonus;
    }

    public Boolean getEquipado() {
        return equipado;
    }

    public void setEquipado(Boolean equipado) {
        this.equipado = equipado;
    }
    
}
