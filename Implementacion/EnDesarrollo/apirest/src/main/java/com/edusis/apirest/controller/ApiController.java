/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.edusis.apirest.controller;

import com.edusis.apirest.domain.Alumno;
import com.edusis.apirest.domain.Documento;
import com.edusis.apirest.domain.Emoji;
import com.edusis.apirest.domain.PasswordEmoji;
import com.edusis.apirest.domain.Profesor;
import com.edusis.apirest.domain.TipoDocumento;
import com.edusis.apirest.domain.Tutor;
import com.edusis.apirest.service.AlumnoService;
import com.edusis.apirest.service.EmojiService;
import com.edusis.apirest.service.ProfesorService;
import com.edusis.apirest.service.TutorService;
import com.edusis.apirest.service.dto.AlumnoDto;
import com.edusis.apirest.service.dto.EmojiDto;
import com.edusis.apirest.service.dto.ProfesorDto;
import com.edusis.apirest.service.dto.TutorDto;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Facundo Raviolo
 */

@RestController
@CrossOrigin(origins = "*", methods= {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE})
@RequestMapping("/api")
public class ApiController {
    
    @Autowired
    private EmojiService emojiService;
    
    @Autowired
    private ProfesorService profesorService;
    
    @Autowired
    private TutorService tutorService;

    @Autowired
    private AlumnoService alumnoService;
    
    @PostMapping("guardarEmoji")
    public ResponseEntity<Long> guardarEmoji(@RequestBody EmojiDto emojiDto) {
        Emoji emoji = emojiDto.getId() != null ? emojiService.get(emojiDto.getId()) : new Emoji();
        emoji.setNombre(emojiDto.getNombre());
        emoji.setIconoURL(emojiDto.getIconoURL());
        emojiService.save(emoji);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
    @GetMapping("emojis")
    public List<Emoji> getEmojis() {
        return emojiService.getAll(); 
    }
    
    @GetMapping("emoji")
    public Emoji getEmoji(@RequestParam Long id) {
        return emojiService.get(id);
    }
    
    @DeleteMapping("eliminarEmoji")
    public ResponseEntity<Long> eliminarEmoji(@RequestParam Long id) {
        emojiService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
    @PostMapping("guardarProfesor")
    public ResponseEntity<Long> guardarProfesor(@RequestBody ProfesorDto profesorDto) {
        Profesor profesor = profesorDto.getId() != null ? profesorService.get(profesorDto.getId()) : new Profesor();
        profesor.setNombre(profesorDto.getNombre());
        profesor.setApellido(profesorDto.getApellido());
        profesor.setDocumento(new Documento(profesorDto.getTipoDocumento(), profesorDto.getDocumento()));
        profesor.setFechaNacimiento(profesorDto.getFechaNacimiento());
        profesorService.save(profesor);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
    @GetMapping("profesores")
    public List<Profesor> getProfesores() {
        return profesorService.getAll(); 
    }
    
    @GetMapping("profesor")
    public Profesor getProfesor(@RequestParam Long id) {
        return profesorService.get(id);
    }
    
    @DeleteMapping("eliminarProfesor")
    public ResponseEntity<Long> eliminarProfesor(@RequestParam Long id) {
        profesorService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
    @PostMapping("guardarTutor")
    public ResponseEntity<Long> guardarTutor(@RequestBody TutorDto tutorDto) {
        Tutor tutor = tutorDto.getId() != null ? tutorService.get(tutorDto.getId()) : new Tutor();
        tutor.setNombre(tutorDto.getNombre());
        tutor.setApellido(tutorDto.getApellido());
        tutor.setDocumento(new Documento(tutorDto.getTipoDocumento(), tutorDto.getDocumento()));
        tutor.setFechaNacimiento(tutorDto.getFechaNacimiento());
        tutorService.save(tutor);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
    @GetMapping("tutores")
    public List<Tutor> getTutores() {
        return tutorService.getAll(); 
    }
    
    @GetMapping("tutor")
    public Tutor getTutor(@RequestParam Long id) {
        return tutorService.get(id);
    }
    
    @DeleteMapping("eliminarTutor")
    public ResponseEntity<Long> eliminarTutor(@RequestParam Long id) {
        /*Tutor tutor = tutorService.get(id);
        if (tutor != null) {
            tutorService.delete(tutor);
        }*/
        tutorService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
    @GetMapping("tiposDoc")
    public List<String> getTiposDoc() {
        TipoDocumento[] valores = TipoDocumento.values();
        List<String> lista = new ArrayList<String>();
        for (TipoDocumento valor : valores) {
            lista.add(valor.toString());
        }
        return lista;
    }
    
    @PostMapping("guardarAlumno")
    public ResponseEntity<Long> guardarAlumno(@RequestBody AlumnoDto alumnoDto) {
        Alumno alumno = alumnoDto.getId() != null ? alumnoService.get(alumnoDto.getId()) : new Alumno();
        alumno.setNombre(alumnoDto.getNombre());
        alumno.setApellido(alumnoDto.getApellido());
        alumno.setDocumento(new Documento(alumnoDto.getTipoDocumento(), alumnoDto.getDocumento()));
        alumno.setFechaNacimiento(alumnoDto.getFechaNacimiento());
        alumno.setAvatarUrl(alumnoDto.getAvatarUrl());
        if (alumnoDto.getPasswordEmoji() != null) {
            PasswordEmoji pwd = new PasswordEmoji();
            Emoji emoji1 = emojiService.get(alumnoDto.getPasswordEmoji().getEmoji1Id());
            Emoji emoji2 = emojiService.get(alumnoDto.getPasswordEmoji().getEmoji2Id());
            Emoji emoji3 = emojiService.get(alumnoDto.getPasswordEmoji().getEmoji3Id());
            pwd.setEmoji1(emoji1);
            pwd.setEmoji2(emoji2);
            pwd.setEmoji3(emoji3);
            alumno.setPasswordEmoji(pwd);
        }
        alumnoService.save(alumno);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
    @GetMapping("alumnos")
    public List<Alumno> getAlumnos() {
        return alumnoService.getAll();
    }
    
    @GetMapping("alumno")
    public Alumno getAlumno(@RequestParam Long id) {
        return alumnoService.get(id);
    }
    
    @PostMapping("ingresoAlumno")
    public ResponseEntity<Long> ingresoAlumno(@RequestParam Long id, @RequestParam Long emoji1Id, @RequestParam Long emoji2Id, @RequestParam Long emoji3Id) {
        Alumno alumno = alumnoService.get(id);
        if (emoji1Id != null && emoji2Id != null && emoji3Id != null) {
            if (Objects.equals(alumno.getPasswordEmoji().getEmoji1().getId(), emoji1Id) &&
                Objects.equals(alumno.getPasswordEmoji().getEmoji2().getId(), emoji2Id) &&
                Objects.equals(alumno.getPasswordEmoji().getEmoji3().getId(), emoji3Id)) {
                return new ResponseEntity<>(HttpStatus.OK);                
            }
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }
    
}
