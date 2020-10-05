/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.edusis.apirest.service.dto;

/**
 *
 * @author Facundo Raviolo
 */
public class PreguntaPasapalabraDto {
    
    private String letra;
    private String pregunta;
    private Boolean empiezaCon;
    private String respuestaCorrecta;

    public String getLetra() {
        return letra;
    }

    public void setLetra(String letra) {
        this.letra = letra;
    }

    public String getPregunta() {
        return pregunta;
    }

    public void setPregunta(String pregunta) {
        this.pregunta = pregunta;
    }

    public Boolean getEmpiezaCon() {
        return empiezaCon;
    }

    public void setEmpiezaCon(Boolean empiezaCon) {
        this.empiezaCon = empiezaCon;
    }

    public String getRespuestaCorrecta() {
        return respuestaCorrecta;
    }

    public void setRespuestaCorrecta(String respuestaCorrecta) {
        this.respuestaCorrecta = respuestaCorrecta;
    }
    
    
}
