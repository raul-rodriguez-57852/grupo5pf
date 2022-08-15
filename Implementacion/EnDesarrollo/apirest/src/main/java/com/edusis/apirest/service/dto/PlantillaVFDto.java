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
public class PlantillaVFDto {
    
    private String nombre;
    private Integer segundos;
    private List<PreguntaVFDto> preguntaVFDto;
    private Long creadorId;

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Integer getSegundos() {
        return segundos;
    }

    public void setSegundos(Integer segundos) {
        this.segundos = segundos;
    }

    public Long getCreadorId() {
        return creadorId;
    }

    public void setCreadorId(Long creadorId) {
        this.creadorId = creadorId;
    }

    public List<PreguntaVFDto> getPreguntaVFDto() {
        return preguntaVFDto;
    }

    public void setPreguntaVFDto(List<PreguntaVFDto> preguntaVFDto) {
        this.preguntaVFDto = preguntaVFDto;
    }
    
}
