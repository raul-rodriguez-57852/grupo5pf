/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.edusis.apirest.domain;

import com.edusis.apirest.generic.GenericEntity;
import com.sun.istack.NotNull;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

/**
 *
 * @author Manu Frana
 */
@Entity
@Table(name= "Session")
public class Sesion extends GenericEntity{
    
    @NotNull
    private String session_id;
    
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "documento_id")
    @NotNull
    private Documento documento;
    //Resuo el createad at que se ereda del generic entity para ver cuando se creo la session
    
    private String expiracion;
    
    private String ultimo_acceso;

    public String getSession_id() {
        return session_id;
    }

    public void setSession_id(String session_id) {
        this.session_id = session_id;
    }

    public Documento getDocumento() {
        return documento;
    }

    public void setDocumento(Documento documento) {
        this.documento = documento;
    }

    public String getExpiracion() {
        return expiracion;
    }

    public void setExpiracion(String expiracion) {
        this.expiracion = expiracion;
    }

    public String getUltimo_acceso() {
        return ultimo_acceso;
    }

    public void setUltimo_acceso(String ultimo_acceso) {
        this.ultimo_acceso = ultimo_acceso;
    }
    
    
}
