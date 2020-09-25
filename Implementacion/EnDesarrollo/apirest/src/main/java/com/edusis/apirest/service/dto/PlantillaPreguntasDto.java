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
public class PlantillaPreguntasDto {
    
    private String nombre;
    private Integer segundos;
    private List<PreguntaDto> preguntasDto;

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

    public List<PreguntaDto> getPreguntasDto() {
        return preguntasDto;
    }

    public void setPreguntasDto(List<PreguntaDto> preguntasDto) {
        this.preguntasDto = preguntasDto;
    }
    
}
