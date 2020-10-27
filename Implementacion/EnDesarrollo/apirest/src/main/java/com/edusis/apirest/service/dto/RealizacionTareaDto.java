/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.edusis.apirest.service.dto;

import java.util.Date;
import java.util.List;

/**
 *
 * @author Naim Saadi
 */
public class RealizacionTareaDto {
    
    private Long id;
    private Long idTarea;
    private Long idAlumno;
    private List<RealizacionDetalleDto> detalles;
    private Date fecha;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIdTarea() {
        return idTarea;
    }

    public void setIdTarea(Long idTarea) {
        this.idTarea = idTarea;
    }

    public Long getIdAlumno() {
        return idAlumno;
    }

    public void setIdAlumno(Long idAlumno) {
        this.idAlumno = idAlumno;
    }

    public List<RealizacionDetalleDto> getDetalles() {
        return detalles;
    }

    public void setDetalles(List<RealizacionDetalleDto> detalles) {
        this.detalles = detalles;
    }

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }
    
    
}
