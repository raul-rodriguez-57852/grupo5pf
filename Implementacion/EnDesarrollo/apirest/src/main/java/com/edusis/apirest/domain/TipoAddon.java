/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.edusis.apirest.domain;

import com.fasterxml.jackson.annotation.JsonFormat;

/**
 *
 * @author Facundo Raviolo
 */
@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum TipoAddon {
    FONDO("Fondo", 9),
    SOMBRERO("Sombrero", 11),
    ANTEOJOS("Anteojos", 12),
    CAMISETA("Camiseta", 13);
    
    private String nombre;
    
    private Integer profundidad;
    
    private TipoAddon(String nombre, Integer profundidad) {
        this.nombre = nombre;
        this.profundidad = profundidad;
    }

    public String getNombre() {
        return nombre;
    }

    public Integer getProfundidad() {
        return profundidad;
    }
}
