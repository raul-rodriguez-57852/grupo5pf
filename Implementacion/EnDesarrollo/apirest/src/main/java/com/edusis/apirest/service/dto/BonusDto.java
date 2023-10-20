/*
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.edusis.apirest.service.dto;

/**
 *
 * @author Manuel Frana
 */
public class BonusDto {
 
    private Long id;
    private String nombre;
    private String imagen;
    private String descripcion;
    private Boolean isBonusPreset;

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
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    
     public Boolean getIsBonusPreset() {
        return isBonusPreset;
    }

    public void setIsBonusPreset(Boolean isBonusPreset) {
        this.isBonusPreset = isBonusPreset;
    }
}
