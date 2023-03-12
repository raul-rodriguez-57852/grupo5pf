/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.edusis.apirest.service.dto;

import com.edusis.apirest.domain.Curso;
import com.edusis.apirest.domain.Profesor;
import java.util.List;

/**
 *
 * @author Manuel
 */
public class AsignaturaDto {
    
    private Long id;
    private String nombre;
    private Long cursoId;
    private String iconoURL;
    private Long creadorId;
    
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

    public Long getCursoId() {
        return cursoId;
    }

    public void setCursoId(Long cursoId) {
        this.cursoId = cursoId;
    }

    public Long getCreadorId() {
        return creadorId;
    }

    public void setCreadorId(Long creadorId) {
        this.creadorId = creadorId;
    }

    public String getIconoURL() {
        return iconoURL;
    }

    public void setIconoURL(String iconoURL) {
        this.iconoURL = iconoURL;
    }
}
