/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.edusis.apirest.service.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 *
 * @author manue
 */
public class CursoBonusAlumnoDto {
    
    private Long id;
    
    private Boolean equipado;
    
    @JsonIgnore
    @JsonProperty("curso_id")
    private Long curso_id;
    
    
    @JsonProperty("bonus_id")
    private Long bonus_id;
    
    @JsonIgnore
    @JsonProperty("alumno_id")
    private Long alumno_id;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean getEquipado() {
        return equipado;
    }

    public void setEquipado(Boolean equipado) {
        this.equipado = equipado;
    }

    public Long getCurso_id() {
        return curso_id;
    }

    public void setCurso_id(Long curso_id) {
        this.curso_id = curso_id;
    }

    public Long getBonus_id() {
        return bonus_id;
    }

    public void setBonus_id(Long bonus_id) {
        this.bonus_id = bonus_id;
    }

    public Long getAlumno_id() {
        return alumno_id;
    }

    public void setAlumno_id(Long alumno_id) {
        this.alumno_id = alumno_id;
    }  
} 
