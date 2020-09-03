/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.edusis.apirest.controller;

import com.edusis.apirest.domain.Alumno;
import com.edusis.apirest.domain.Asignatura;
import com.edusis.apirest.domain.Curso;
import com.edusis.apirest.domain.Documento;
import com.edusis.apirest.domain.Emoji;
import com.edusis.apirest.domain.PasswordEmoji;
import com.edusis.apirest.domain.Persona;
import com.edusis.apirest.domain.Profesor;
import com.edusis.apirest.domain.TipoDocumento;
import com.edusis.apirest.domain.Tutor;
import com.edusis.apirest.service.AlumnoService;
import com.edusis.apirest.service.AsignaturaService;
import com.edusis.apirest.service.CursoService;
import com.edusis.apirest.service.EmojiService;
import com.edusis.apirest.service.PersonaService;
import com.edusis.apirest.service.ProfesorService;
import com.edusis.apirest.service.TutorService;
import com.edusis.apirest.service.dto.AlumnoDto;
import com.edusis.apirest.service.dto.AsignaturaDto;
import com.edusis.apirest.service.dto.CursoDto;
import com.edusis.apirest.service.dto.EmojiDto;
import com.edusis.apirest.service.dto.ProfesorDto;
import com.edusis.apirest.service.dto.TutorDto;
import com.edusis.apirest.specs.AsignaturaSpecs;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.Random;
import java.util.stream.Collectors;
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
    
    @Autowired
    private CursoService cursoService;
    
    @Autowired
    private AsignaturaService asignaturaService;
    
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
       
    @GetMapping("curso")
    public Curso getCurso(@RequestParam Long id) {
        return cursoService.get(id);
    }
    
    @GetMapping("asignatura")
    public Asignatura getAsignatura(@RequestParam Long id) {
        return asignaturaService.get(id);
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
        Tutor tutor = alumnoDto.getTutor();
        alumno.setTutor(tutor);
        if(tutor.getAlumnos() != null){
            if(!tutor.getAlumnos().contains(alumno)){
                tutor.getAlumnos().add(alumno);
                tutorService.save(tutor);
            }
        } else{
            ArrayList<Alumno> alumnos = new ArrayList<Alumno>();
            alumnos.add(alumno);
            tutor.setAlumnos(alumnos);
            tutorService.save(tutor);
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
    
    @PostMapping("guardarCurso")
    public ResponseEntity<Long> guardarCurso(@RequestBody CursoDto cursoDto) {
        Curso curso = cursoDto.getId() != null ? cursoService.get(cursoDto.getId()) : new Curso();
        curso.setNombre(cursoDto.getNombre());
        curso.setIconoURL(cursoDto.getIconoURL());
        curso.setCreador(profesorService.get(cursoDto.getCreadorId()));
        curso.setCodigo(null);
        curso.validar();
        cursoService.save(curso);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
    @PostMapping("generarCodigoCurso")
    public ResponseEntity<Long> generarCodigoCurso(@RequestBody CursoDto cursoDto) throws NoSuchAlgorithmException{
        Curso curso = cursoService.get(cursoDto.getId());
        if(curso.getCodigo() != null){
            //Ya tiene codigo asignado
        }
        else{
            try{
                String identificador = cursoDto.getId().toString() + cursoDto.getNombre();
                MessageDigest md5 = MessageDigest.getInstance("MD5");
                byte[] byteMessage = identificador.getBytes("UTF-8");
                byte[] digested = md5.digest(byteMessage);
                StringBuffer codigobuilder = new StringBuffer();
                for (byte bytes : digested) 
                {
                    codigobuilder.append(String.format("%02x", bytes & 0xff));
                }
                 String codigo = codigobuilder.toString();
                //listo todos los cursos
                List<Curso> listado_cursos = (ArrayList<Curso>) cursoService.getAll();
                //Listro los codigos de todos los cursos
                //checkeo que no sea null la lista, si es null asigno codigo directamente
                if(listado_cursos.size() == 1){
                //No hay cursos por ahora solo este
                curso.setCodigo(codigo);
                
                }
                else{
                    List<String> listado_codigos = listado_cursos.stream().map(x -> x.getCodigo()).collect(Collectors.toList());
                    
                    //Este es el codigo que quiero insertar en el nuevo curso
                    Random r = new Random();
                    boolean contiene = true;
                    boolean changes_made_to_codigo = false;
                    while (contiene)
                    {
                        for(String cod_existente : listado_codigos)
                        {
                        //Recorro cada codigo del listado de codigos obtenido arriba
                            if(codigo.equals(cod_existente))
                            {
                                //Existe un codigo existente, entonces lo cambio al nuevo
                                StringBuilder my_codigo = new StringBuilder(codigo);
                                char c = (char) (r.nextInt(26) + 'a');
                                //modifico en la posicion 3 por la letra aleatoria de la variable c
                                my_codigo.setCharAt(3, c);
                                //Ahora el codigo que quiero agregar esta cambiado
                                codigo = my_codigo.toString();
                                changes_made_to_codigo = true;
                            }
                        }
                        //Si yo hice cambios en mi codigo, tengo que validar que este nuevo codigo que obtuve, tampoco este dentro de la lista
                        if(!changes_made_to_codigo)
                        {
                            //Recorri todo el listado de codigos, y no hice ningun cambio, osea que no se encontro el mismo codigo
                            //corto el ciclo.
                            contiene = false;
                        }
                        else
                        {
                            //Si realize cambios, entonces debo seguir iterando para chequear el codigo cambiado
                            //apago el flag de cambios para que no sea ciclico
                            changes_made_to_codigo = false;
                        }
                    }
                    //Asigno el codgio al curso.
                    curso.setCodigo(codigo);
                    
                }  
                cursoService.save(curso);
           }
            catch (java.io.UnsupportedEncodingException e)
            {
                System.err.println("Erro, MD5 no es un algoritmo de encriptacion correcto para MessageDigest (ApiContrller) trying setCodigo");
            }
            catch (NoSuchAlgorithmException er){
                System.err.println("Erro, MD5 no es un algoritmo de encriptacion correcto para MessageDigest");
            }
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
    @PostMapping("buscarCursoPorCodigo")
    public Long buscarCursoPorCodigo(@RequestBody String codigo){
        //Consigo todos los cursos
        List<Curso> listado_cursos = (ArrayList<Curso>) cursoService.getAll();
        if(listado_cursos.size() == 0){
            //No hay cursos creados por ahora, por ende devuelvo -1
            return Long.valueOf(-1);
        }
        else{
            for (int i = 0; i < listado_cursos.size(); i++)
                {
                if(listado_cursos.get(i).getCodigo().equals(codigo))
                    {
                //Encontre el curso con ese codigo.
                //devuelvo su id
                    return listado_cursos.get(i).getId();
                    }
                }
            //no encontre ningun curso con dicho codigo. devuelvo -1
            return Long.valueOf(-1);
            }
    }
    
    @PostMapping("guardarAsignatura")
    public ResponseEntity<Long> guardarAsignatura(@RequestBody AsignaturaDto asignaturaDto) {
        Asignatura asignatura = asignaturaDto.getId() != null ? asignaturaService.get(asignaturaDto.getId()) : new Asignatura();
        asignatura.setNombre(asignaturaDto.getNombre());
        asignatura.setIconoURL(asignaturaDto.getIconoURL());
        asignatura.setCreador(profesorService.get(asignaturaDto.getCreadorId()));
        Curso curso = cursoService.get(asignaturaDto.getCursoId());
        asignatura.setCurso(curso);
        if(curso.getAsignaturas() != null){
            if(!curso.getAsignaturas().contains(asignatura)){
                curso.getAsignaturas().add(asignatura);
                cursoService.save(curso);
            }
        } else{
            ArrayList<Asignatura> asignaturas = new ArrayList<Asignatura>();
            asignaturas.add(asignatura);
            curso.setAsignaturas(asignaturas);
            cursoService.save(curso);
        }
        asignatura.validar();
        asignaturaService.save(asignatura);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
    @DeleteMapping("eliminarAsignatura")
    public ResponseEntity<Long> eliminarAsignatura(@RequestParam Long id) {
        asignaturaService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
    @GetMapping("asignaturas")
    public List<Asignatura> getAsignaturas(@RequestParam Long cursoId) {
        Curso curso = cursoService.get(cursoId);
        return asignaturaService.getAll(AsignaturaSpecs.byCurso(curso));
//        return asignaturaService.getAll();
    }
    
    @GetMapping("cursos")
    public List<Curso> getCursos() {
        System.out.print("Entro metodo GetCurso");
        return cursoService.getAll(); 
    }
    
    @PostMapping("agregarAlumnoACurso")
    public ResponseEntity<Long> agregarAlumnoACurso(@RequestParam Long idAlumno, @RequestParam Long idCurso){
        Alumno alumno = alumnoService.get(idAlumno);
        Curso curso = cursoService.get(idCurso);
        if(curso == null || alumno == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        if(curso.getAlumnos() != null){
            if(!curso.getAlumnos().contains(alumno)){
                //el alumno no esta en el curso, lo agrego
                curso.getAlumnos().add(alumno);
                cursoService.save(curso);
            }
        } else{
            //no hay alumnos en el curso
            ArrayList<Alumno> alumnos = new ArrayList<Alumno>();
            alumnos.add(alumno);
            curso.setAlumnos(alumnos);
            cursoService.save(curso);
        }
        if(alumno.getCursos()!= null){
            if(!alumno.getCursos().contains(curso)){
                alumno.getCursos().add(curso);
                alumnoService.save(alumno);
            }
        } else{
            ArrayList<Curso> cursos = new ArrayList<Curso>();
            cursos.add(curso);
            alumno.setCursos(cursos);
            alumnoService.save(alumno);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
    @GetMapping("inicioSesionFake")
    public Persona inicioSesionFake(@RequestParam String documento) {
        List<Persona> personas = new ArrayList<Persona>();
        List<Profesor> profesores = profesorService.getAll();
        List<Tutor> tutores = tutorService.getAll();
        personas.addAll(profesores);
        personas.addAll(tutores);
        for (Persona persona : personas) {
            if(persona.getDocumento() == null || persona.getDocumento().getNumero() == null){
                continue;
            }
            if (persona.getDocumento().getNumero().equals(documento)) {
                return persona;
            }
        }
        throw new Error();
    }
    
    
    
}
