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
public class PreguntaDto {
    
    private String pregunta;
    private String respuestaCorrecta;
    private String respuestaIncorrectaA;
    private String respuestaIncorrectaB;
    private String respuestaIncorrectaC;

    public String getPregunta() {
        return pregunta;
    }

    public void setPregunta(String pregunta) {
        this.pregunta = pregunta;
    }

    public String getRespuestaCorrecta() {
        return respuestaCorrecta;
    }

    public void setRespuestaCorrecta(String respuestaCorrecta) {
        this.respuestaCorrecta = respuestaCorrecta;
    }

    public String getRespuestaIncorrectaA() {
        return respuestaIncorrectaA;
    }

    public void setRespuestaIncorrectaA(String respuestaIncorrectaA) {
        this.respuestaIncorrectaA = respuestaIncorrectaA;
    }

    public String getRespuestaIncorrectaB() {
        return respuestaIncorrectaB;
    }

    public void setRespuestaIncorrectaB(String respuestaIncorrectaB) {
        this.respuestaIncorrectaB = respuestaIncorrectaB;
    }

    public String getRespuestaIncorrectaC() {
        return respuestaIncorrectaC;
    }

    public void setRespuestaIncorrectaC(String respuestaIncorrectaC) {
        this.respuestaIncorrectaC = respuestaIncorrectaC;
    }
    
}
