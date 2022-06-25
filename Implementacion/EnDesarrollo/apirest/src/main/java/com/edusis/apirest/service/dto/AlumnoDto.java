/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.edusis.apirest.service.dto;

import com.edusis.apirest.domain.Curso;
import com.edusis.apirest.domain.TipoDocumento;
import com.edusis.apirest.domain.Tutor;
import java.util.Calendar;
import java.util.List;

/**
 *
 * @author Facundo Raviolo
 */
public class AlumnoDto {
 
    private Long id;
    private String nombre;
    private String apellido;
    private TipoDocumento tipoDocumento;
    private String documento;
    private Calendar fechaNacimiento;
    private PasswordEmojiDto passwordEmoji;
    private String avatarUrl;
    private Long tutorId;
    private Integer saldoEstrellas;
    private String mapRecompensas;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public TipoDocumento getTipoDocumento() {
        return tipoDocumento;
    }

    public void setTipoDocumento(TipoDocumento tipoDocumento) {
        this.tipoDocumento = tipoDocumento;
    }

    public String getDocumento() {
        return documento;
    }

    public void setDocumento(String documento) {
        this.documento = documento;
    }

    public Calendar getFechaNacimiento() {
        return fechaNacimiento;
    }

    public void setFechaNacimiento(Calendar fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public PasswordEmojiDto getPasswordEmoji() {
        return passwordEmoji;
    }

    public void setPasswordEmoji(PasswordEmojiDto passwordEmoji) {
        this.passwordEmoji = passwordEmoji;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public Long getTutorId() {
        return tutorId;
    }

    public void setTutorId(Long tutor) {
        this.tutorId = tutor;
    }

    public Integer getSaldoEstrellas() {
        return saldoEstrellas;
    }

    public void setSaldoEstrellas(Integer saldoEstrellas) {
        this.saldoEstrellas = saldoEstrellas;
    }

    public String getMapRecompensas() {
        return mapRecompensas;
    }

    public void setMapRecompensas(String mapRecompensas) {
        this.mapRecompensas = mapRecompensas;
    }

}
