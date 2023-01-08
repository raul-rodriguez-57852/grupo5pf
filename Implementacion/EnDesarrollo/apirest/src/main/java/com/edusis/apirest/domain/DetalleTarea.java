/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.edusis.apirest.domain;

import com.edusis.apirest.generic.GenericEntity;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

/**
 *
 * @author Naim Saadi
 */
@Entity
@Inheritance(strategy=InheritanceType.JOINED)
public class DetalleTarea extends GenericEntity{
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="tarea_id")
    private Tarea tarea;

    public Tarea getTarea() {
        return tarea;
    }

    protected void setTarea(Tarea tarea) {
        this.tarea = tarea;
    }
    
    
    
}
