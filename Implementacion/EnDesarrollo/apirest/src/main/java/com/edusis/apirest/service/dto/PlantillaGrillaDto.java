/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.edusis.apirest.service.dto;

import java.util.List;

/**
 *
 * @author Facundo Raviolo
 */
public class PlantillaGrillaDto {
    
    private String nombre;
    private String imagen;
    private Integer cantidadFilas;
    private Integer cantidadColumnas;
    private List<CeldaGrillaDto> celdasDto;
    private Long creadorId;

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
    
    public Integer getCantidadFilas() {
        return cantidadFilas;
    }

    public void setCantidadFilas(Integer cantidadFilas) {
        this.cantidadFilas = cantidadFilas;
    }

    public Integer getCantidadColumnas() {
        return cantidadColumnas;
    }

    public void setCantidadColumnas(Integer cantidadColumnas) {
        this.cantidadColumnas = cantidadColumnas;
    }

    public List<CeldaGrillaDto> getCeldasDto() {
        return celdasDto;
    }

    public void setCeldasDto(List<CeldaGrillaDto> celdasDto) {
        this.celdasDto = celdasDto;
    }

    public Long getCreadorId() {
        return creadorId;
    }

    public void setCreadorId(Long creadorId) {
        this.creadorId = creadorId;
    }
    
}
