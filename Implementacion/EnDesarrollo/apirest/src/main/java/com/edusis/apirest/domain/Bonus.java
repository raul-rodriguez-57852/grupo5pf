/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.edusis.apirest.domain;

import com.edusis.apirest.generic.SoftDeleteEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.sun.istack.NotNull;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 *
 * @author Manuel Frana
 */

@Entity
@Table(name="Bonus")
public class Bonus extends SoftDeleteEntity {
    
    @NotNull
    private String nombre;
    
    @NotNull
    private String imagen;
    
    @JsonIgnoreProperties(value = {"Bonus", "hibernateLazyInitializer"})
    private String descripcion;
    
    @JsonIgnore
    @OneToMany(mappedBy = "bonus")
    private List<CursoBonusAlumno> cursoBonusAlumno;
    
    private Boolean isBonusPreset = Boolean.FALSE;
    
    // GETTERS AND SETTERS

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public List<CursoBonusAlumno> getCursoBonusAlumno() {
        return cursoBonusAlumno;
    }

    public void setCursoBonusAlumno(List<CursoBonusAlumno> cursoBonusAlumno) {
        this.cursoBonusAlumno = cursoBonusAlumno;
    }
    
    public Boolean getIsBonusPreset() {
        return isBonusPreset;
    }

    public void setIsBonusPreset(Boolean isBonusPreset) {
        this.isBonusPreset = isBonusPreset;
    }
        
}
