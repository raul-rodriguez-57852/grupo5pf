/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.edusis.apirest.domain;

import com.edusis.apirest.generic.GenericEntity;
import com.edusis.apirest.utils.AssertUtils;
import com.sun.istack.NotNull;
import java.util.Calendar;
import javax.persistence.CascadeType;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.Entity;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 *
 * @author Naim Saadi
 */
@Entity
@Table(name="Persona")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "dtype")
public abstract class Persona extends GenericEntity {
    
    public static final String DTYPE_PROFESOR = "PROFESOR";
    public static final String DTYPE_ALUMNO = "ALUMNO";
    public static final String DTYPE_TUTOR = "TUTOR";
    
    @NotNull
    private String nombre;
    
    @NotNull
    private String apellido;
    
    private String password;
    
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "documento_id")
    @NotNull
    private Documento documento;
    
    @Temporal(TemporalType.TIMESTAMP)
    private Calendar fechaNacimiento;
    
    @Temporal(TemporalType.TIMESTAMP)
    private Calendar ultimoAcceso;
    
     // GETTERS && SETTERS 

    public Calendar getUltimoAcceso() {
        return ultimoAcceso;
    }

    public void setUltimoAcceso(Calendar ultimoAcceso) {
        this.ultimoAcceso = ultimoAcceso;
    }


    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    
    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public Documento getDocumento() {
        return documento;
    }

    public void setDocumento(Documento documento) {
        this.documento = documento;
    }

    public Calendar getFechaNacimiento() {
        return fechaNacimiento;
    }

    public void setFechaNacimiento(Calendar fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }
    
    public void validar(){
        AssertUtils.notNull(nombre, "El nombre no puede ser nulo");
        AssertUtils.notNull(apellido, "El apellido no puede ser nulo");
        AssertUtils.notNull(documento, "El documento no puede ser nulo");
    }
    
}
