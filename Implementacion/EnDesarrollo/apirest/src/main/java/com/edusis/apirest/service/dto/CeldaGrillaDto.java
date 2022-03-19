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
public class CeldaGrillaDto {
    
    private Integer fila;
    private Integer columna;
    private String valorCorrecto;

    public Integer getFila() {
        return fila;
    }

    public void setFila(Integer fila) {
        this.fila = fila;
    }

    public Integer getColumna() {
        return columna;
    }

    public void setColumna(Integer columna) {
        this.columna = columna;
    }

    public String getValorCorrecto() {
        return valorCorrecto;
    }

    public void setValorCorrecto(String valorCorrecto) {
        this.valorCorrecto = valorCorrecto;
    }
    
}
