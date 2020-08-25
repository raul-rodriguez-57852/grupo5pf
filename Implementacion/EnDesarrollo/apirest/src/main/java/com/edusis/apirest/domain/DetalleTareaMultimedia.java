/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.edusis.apirest.domain;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 *
 * @author Naim Saadi
 */
@Entity
@Table(name="DetalleTareaMultimedia")
public class DetalleTareaMultimedia extends DetalleTarea {
    
    private String descripcion;
    
    // Resta agregar video y imagen

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
    
    

}
