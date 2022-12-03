package com.edusis.apirest.domain;

import com.edusis.apirest.generic.GenericEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@Entity
public class RecompensaAlumno extends GenericEntity {

    @JsonIgnore
    @ManyToOne
    private Alumno alumno;

    @ManyToOne
    private Addon addon;

    private Boolean equipado;

    public Alumno getAlumno() {
        return alumno;
    }

    public void setAlumno(Alumno alumno) {
        this.alumno = alumno;
    }

    public Addon getAddon() {
        return addon;
    }

    public void setAddon(Addon addon) {
        this.addon = addon;
    }

    public Boolean getEquipado() {
        return equipado;
    }

    public void setEquipado(Boolean equipado) {
        this.equipado = equipado;
    }
}
