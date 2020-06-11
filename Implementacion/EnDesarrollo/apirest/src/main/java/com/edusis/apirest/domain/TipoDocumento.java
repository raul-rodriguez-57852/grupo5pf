/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.edusis.apirest.domain;

/**
 *
 * @author Manuel
 */
public enum TipoDocumento {
    
    DNI("DNI"),
    LC("Libreta Civica"),
    CI("Cedula de Identidad"),
    LE("Libreta de Enrolamiento");
    
    private String nombre;

    private TipoDocumento(String nombre) {
        this.nombre = nombre;
    }

    @Override
    public String toString() {
        return nombre;
    }
 
    
    
    
}