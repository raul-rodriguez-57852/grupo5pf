/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.edusis.apirest.service.dto;

/**
 *
 * @author Manu Frana
 */
public class SesionDto {
    
    private Long Id;
    private String session_id;
    private String documento;
    private String expiracion;
    private String ultimo_acceso;

    public Long getId() {
        return Id;
    }

    public void setId(Long Id) {
        this.Id = Id;
    }

    public String getSession_id() {
        return session_id;
    }

    public void setSession_id(String session_id) {
        this.session_id = session_id;
    }

    public String getDocumento() {
        return documento;
    }

    public void setDocumento(String documento) {
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
