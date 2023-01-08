/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.edusis.apirest.controller;

import com.edusis.apirest.domain.*;
import com.edusis.apirest.domain.plantillas.Plantilla;
import com.edusis.apirest.domain.plantillas.PlantillaPasapalabra;
import com.edusis.apirest.domain.plantillas.PlantillaPreguntas;
import com.edusis.apirest.domain.plantillas.Pregunta;
import com.edusis.apirest.domain.plantillas.PreguntaPasapalabra;
import com.edusis.apirest.domain.plantillas.Respuesta;
import com.edusis.apirest.domain.TipoDocumento;
import com.edusis.apirest.domain.Tutor;
import com.edusis.apirest.domain.plantillas.Categoria;
import com.edusis.apirest.domain.plantillas.CeldaGrilla;
import com.edusis.apirest.domain.plantillas.PlantillaCategorias;
import com.edusis.apirest.domain.plantillas.PlantillaGrilla;
import com.edusis.apirest.domain.plantillas.PlantillaVF;
import com.edusis.apirest.domain.plantillas.PreguntaVF;
import com.edusis.apirest.domain.plantillas.RespuestaCategoria;
import com.edusis.apirest.service.*;
import com.edusis.apirest.service.dto.AlumnoDto;
import com.edusis.apirest.service.dto.AsignaturaDto;
import com.edusis.apirest.service.dto.CategoriaDto;
import com.edusis.apirest.service.dto.CeldaGrillaDto;
import com.edusis.apirest.service.dto.CursoDto;
import com.edusis.apirest.service.dto.EmojiDto;
import com.edusis.apirest.service.dto.PlantillaCategoriasDto;
import com.edusis.apirest.service.dto.PlantillaGrillaDto;
import com.edusis.apirest.service.dto.PlantillaPasapalabraDto;
import com.edusis.apirest.service.dto.PlantillaPreguntasDto;
import com.edusis.apirest.service.dto.PlantillaVFDto;
import com.edusis.apirest.service.dto.PreguntaDto;
import com.edusis.apirest.service.dto.PreguntaPasapalabraDto;
import com.edusis.apirest.service.dto.PreguntaVFDto;
import com.edusis.apirest.service.dto.ProfesorDto;
import com.edusis.apirest.service.dto.TutorDto;
import com.edusis.apirest.specs.AlumnoSpecs;
import com.edusis.apirest.specs.CursoSpecs;
import com.edusis.apirest.specs.AsignaturaSpecs;
import com.edusis.apirest.specs.PlantillaSpecs;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.*;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Random;
import java.util.Set;
import java.util.stream.Collectors;
import org.hibernate.Hibernate;
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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Facundo Raviolo
 */
@RestController
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE})
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
    
    @Autowired
    private SesionService sesionService;
    
    @Autowired
    private PlantillaPreguntasService plantillaPreguntasService; 
    
    @Autowired
    private PlantillaPasapalabraService plantillaPasapalabraService;
    
    @Autowired
    private PlantillaGrillaService plantillaGrillaService;
    
    @Autowired
    private PlantillaService plantillaService;
    
    @Autowired
    private PlantillaCategoriasService plantillaCategoriasService;
    
    @Autowired
    private PlantillaVFService plantillaVFService;
    
    @Autowired
    private AddonService addonService;

    @Autowired
    private RecompensaAlumnoService recompensaAlumnoService;

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

    @GetMapping("getCursosByProfesor")
    public List<Curso> getCursosByProfesor(@RequestParam Long id) {
        Profesor profe = profesorService.get(id);
        return cursoService.getAll(CursoSpecs.byProfesor(profe));
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
        profesor.setEmail(profesorDto.getEmail());
        profesor.setDocumento(new Documento(profesorDto.getTipoDocumento(), profesorDto.getDocumento()));
        profesor.setFechaNacimiento(profesorDto.getFechaNacimiento());
        //obtengo la password del profesor, la cifro, y la almaceno en la base.
        profesor.setPassword(cifrarClave(profesorDto.getPassword()));
        profesorService.save(profesor);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("profesores")
    public List<Profesor> getProfesores() {
        return profesorService.getAll();
    }

    @GetMapping("getProfesor")
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
        tutor.setEmail(tutorDto.getEmail());
        tutor.setDocumento(new Documento(tutorDto.getTipoDocumento(), tutorDto.getDocumento()));
        tutor.setFechaNacimiento(tutorDto.getFechaNacimiento());
        //Seteamos la password del tutor, nunca la password estara almacenada en crudo, siempre cifrada.
        tutor.setPassword(cifrarClave(tutorDto.getPassword()));
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

    @GetMapping("tutorByAlumno")
    public Tutor tutorByAlumno(@RequestParam Long idAlumno) {
        Alumno alumno = alumnoService.get(idAlumno);
        Tutor tutor = alumno.getTutor();
        return tutor;
    }

    @DeleteMapping("eliminarTutor")
    public ResponseEntity<Long> eliminarTutor(@RequestParam Long id) {
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
    
    @GetMapping("eliminarAlumno")
    public ResponseEntity<Long> eliminarAlumno(@RequestParam Long alumnoId) {
        Alumno alumno = alumnoService.get(alumnoId);
        alumno.setIsActive(Boolean.FALSE);
        alumnoService.save(alumno);   
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
    @GetMapping("eliminarCurso")
    public ResponseEntity<Long> eliminarCurso(@RequestParam Long cursoId) {
        Curso curso = cursoService.get(cursoId);
        curso.setIsActive(Boolean.FALSE);
        cursoService.save(curso);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("guardarAlumno")
    public ResponseEntity<Long> guardarAlumno(@RequestBody AlumnoDto alumnoDto) throws JsonProcessingException {
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

        alumno.setSaldoEstrellas(alumnoDto.getSaldoEstrellas());

        Long tutor = alumnoDto.getTutorId();
        Tutor esteTutor = tutorService.get(tutor);
        alumno.setTutor(esteTutor);
        esteTutor = esteTutor.agregarAlumnosAlTutor(alumno);
        tutorService.save(esteTutor);
        alumnoService.save(alumno);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("alumnos")
    public List<Alumno> getAlumnos() {
        return alumnoService.getAll(AlumnoSpecs.isActive());
    }

    @GetMapping("alumno")
    public Alumno getAlumno(@RequestParam Long id) {
        return alumnoService.get(id);
    }

    @GetMapping("alumnosByTutor")
    public List<Alumno> alumnosByTutor(@RequestParam Long idTutor) {
        Tutor tutor = tutorService.get(idTutor);
        return alumnoService.getAll(AlumnoSpecs.byTutor(tutor));

    }

    @PostMapping("ingresoAlumno")
    public ResponseEntity<Long> ingresoAlumno(@RequestParam Long id, @RequestParam Long emoji1Id, @RequestParam Long emoji2Id, @RequestParam Long emoji3Id) {
        Alumno alumno = alumnoService.get(id);
        if (emoji1Id != null && emoji2Id != null && emoji3Id != null) {
            if (Objects.equals(alumno.getPasswordEmoji().getEmoji1().getId(), emoji1Id)
                    && Objects.equals(alumno.getPasswordEmoji().getEmoji2().getId(), emoji2Id)
                    && Objects.equals(alumno.getPasswordEmoji().getEmoji3().getId(), emoji3Id)) {
                //Seteamos el ultimo acceso en el alumno.
                Calendar ultimo_acceso = Calendar.getInstance();
                alumno.setUltimoAcceso(ultimo_acceso);
                alumnoService.save(alumno);

                ////  MODIFICAR LA COOKIE DE SESION PARA QUE EL CODIGO SEA DE ALUMNO
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
        Profesor profe = profesorService.get(cursoDto.getCreadorId());
        curso.setCreador(profe);
        curso.setCodigo(null);
        curso.validar();
        //Hay que guardar el curso en el lado del profesor tambien.
        if (profe.getCursos().size() != 0) {
            //Ya tiene cursos agregados.
            if (!profe.getCursos().contains(curso)) {
                profe.getCursos().add(curso);
            }
        } else {
            //El profesor no tiene ningun Curso.
            ArrayList<Curso> cursos = new ArrayList<Curso>();
            cursos.add(curso);
            profe.setCursos(cursos);
        }
        cursoService.save(curso);
        profesorService.save(profe);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("generarCodigoCurso")
    public Curso generarCodigoCurso(@RequestBody CursoDto cursoDto) {
        //way to get every codigo from cursos.
        //List<String> listado_codigos = listado_cursos.stream().map(x -> x.getCodigo()).collect(Collectors.toList());
        Curso curso = cursoService.get(cursoDto.getId());
        if(curso.getCodigo() != null) {
            return curso;
        }
        String codigo = this.getRandomHexNumber(5);
        // no vale la pena validar si este codigo se repite ya que hay 0.02e-10 chances de que se repita jsjsj 
        curso.setCodigo(codigo);
        cursoService.save(curso);
        return curso;
    }
    
    private String getRandomHexNumber(int cantidadNumeros) {
        Random r = new Random();
        StringBuffer sb = new StringBuffer();
        while(sb.length() < cantidadNumeros){
            sb.append(Integer.toHexString(r.nextInt()));
        }
        String result = sb.toString().substring(0, cantidadNumeros);
        return result.toUpperCase();
    }    
    
    @GetMapping("buscarCursoPorCodigo")
    public Object buscarCursoPorCodigo(@RequestParam String codigo) {
        List<Curso> listado_cursos = (ArrayList<Curso>) cursoService.getAll();
        if (listado_cursos.isEmpty()) {
            //No hay cursos creados por ahora, por ende devuelvo -1
            return Long.valueOf(-1);
        } else {
            for (Curso curso : listado_cursos) {
                if (curso.getCodigo() != null) {
                    if (curso.getCodigo().equals(codigo)) {
                    }
                }
                if (curso.getCodigo() != null && curso.getCodigo().equals(codigo) && curso.getIsActive()) {
                    return curso;
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
        Profesor profe = profesorService.get(asignaturaDto.getCreadorId());
        asignatura.setCreador(profe);
        Curso curso = cursoService.get(asignaturaDto.getCursoId());
        asignatura.setCurso(curso);
        asignatura.validar();
        curso = curso.agregarAsignaturaAlCurso(asignatura);
        cursoService.save(curso);
        profe = profe.agregarAisgnaturaAlProfesor(asignatura);
        asignatura = asignatura.agregarProfesorToAsignatura(profe);
        asignaturaService.save(asignatura);
        profesorService.save(profe);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
    @GetMapping("eliminarAsignatura")
    public ResponseEntity<Long> eliminarAsignatura(@RequestParam Long id) {
        Asignatura asignatura = asignaturaService.get(id);
        asignatura.setIsActive(Boolean.FALSE);
        asignaturaService.save(asignatura);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("asignaturas")
    public List<Asignatura> getAsignaturas(@RequestParam Long cursoId) {
        Curso curso = cursoService.get(cursoId);
        return asignaturaService.getAll(AsignaturaSpecs.byCurso(curso));
    }

    @GetMapping("asignaturasByCreador")
    public List<Asignatura> getAsignaturasByCreador(@RequestParam Long cursoId, @RequestParam Long creadorId) {
        Curso curso = cursoService.get(cursoId);
        Profesor profe = profesorService.get(creadorId);
        return asignaturaService.getAll(AsignaturaSpecs.byCurso(curso).and(AsignaturaSpecs.byCreador(profe)));
    }

    @GetMapping("cursos")
    public List<Curso> getCursos() {
        return cursoService.getAll(CursoSpecs.isActive()); 
    }

    @GetMapping("getCursosDeAlumno")
    public List<Curso> getCursosDeAlumno(@RequestParam Long idAlumno) {
        Alumno alumno = alumnoService.get(idAlumno);
        return cursoService.getAll(CursoSpecs.byAlumno(alumno));
    }

    @PostMapping("agregarAlumnoACurso")
    public ResponseEntity<Long> agregarAlumnoACurso(@RequestParam Long idAlumno, @RequestParam Long idCurso) {
        Alumno alumno = alumnoService.get(idAlumno);
        Curso curso = cursoService.get(idCurso);
        if (curso == null || alumno == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        curso = curso.agregarAlumnoAlCurso(alumno);
        cursoService.save(curso);
        alumno = alumno.agregarCursoAlAlumno(curso);
        alumnoService.save(alumno);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("validarTutor")
    public Boolean validarTutor(@RequestParam Long tutorId, @RequestParam String password) {
        Tutor tutor = tutorService.get(tutorId);
        if (tutor == null || !tutor.getPassword().equals(cifrarClave(password))) {
            return false;
        }
        return true;
    }

    @PostMapping("inicioSesion")
    public String inicioSesion(@RequestParam String documento, @RequestParam String password) {
        //Recibo dni y contraseña, tengo que checkear que sean correctos, una vez validado, tengo que crear una session y devolver el id de las session al usuario
        List<Persona> personas = new ArrayList<Persona>();
        List<Profesor> profesores = profesorService.getAll();
        List<Tutor> tutores = tutorService.getAll();
        personas.addAll(profesores);
        personas.addAll(tutores);
        //Ya tengo todos mis usuarios
        for (Persona persona : personas) {
            if (persona.getDocumento() == null || persona.getDocumento().getNumero() == null) {
                continue;
            }
            if (persona.getDocumento().getNumero().equals(documento)) {
                //documento encontrado, valido si la contraseña tambien coincide.
                //en la base, esta la contraseña cifrada, por ende tengo que cifrar la password del front y comprarla con la del server
                if (persona.getPassword() == null){
                    continue;
                }
                if (persona.getPassword().equals(cifrarClave(password))) {
                    return this.generateNewSessionForUser(persona); 
                } else {
                    //Contraseña incorrecta
                    return "wrong_password";
                }
            }
        }
        return "user_not_found";
    }
    
    private String generateSessionHash(char userType) {
        //Genero el session_id, que el hash que voy a usar para validar
            SecureRandom random = new SecureRandom();
            byte[] contenedor = new byte[16];
            random.nextBytes(contenedor);
                    
            StringBuilder codigobuilder = new StringBuilder();
            for (byte bytes : contenedor) {
                codigobuilder.append(String.format("%02x", bytes & 0xff));
            }
            String hashCode = codigobuilder.toString();
            hashCode = hashCode + userType;//concateno en el codigo el tipo de usuario que es.
            hashCode = hashCode.toUpperCase();
            
        return hashCode;
    }
    
    private String generateNewSessionForUser(Persona persona) {
        char userType = persona.getUserType();
        Sesion sesion = new Sesion();
        Documento doc = persona.getDocumento();
        sesion.setDocumento(doc);
        String sessionHashCode = this.generateSessionHash(userType);
        sesion.setSession_id(sessionHashCode);
        Calendar fecha = Calendar.getInstance();
        fecha.add(Calendar.DAY_OF_YEAR, 1);
        sesion.setExpiracion(fecha);
        sesionService.save(sesion);
        return sessionHashCode;
    }
    
    @PostMapping("eliminarSesion")
    public ResponseEntity<Long> eliminarSesion(@RequestBody String sessionId) {
        //Busco el id de esa sesion para borarla.
        List<Sesion> listadoSesiones = (ArrayList<Sesion>) sesionService.getAll();

        if (listadoSesiones.isEmpty()) {
            //no hay sesiones en la base
            throw new Error();
        } 
        else {
            for (Sesion sesion : listadoSesiones) {
                if (sesion.getSession_id().equals(sessionId)) {
                    //Encontre la sesion.
                    sesionService.deleteById(sesion.getId());
                    return new ResponseEntity<>(HttpStatus.OK);
                }
            }
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // --------- # # Funciones AUXILIARES # # --------- //
    @GetMapping("validarSesion")
    public Long validarSesion(@RequestParam String session_id) {
        // Tengo que comparar la sesion que recibo con alguna de la base, si coincide, entonces devuelvo el usuario.
        //Voy a obtener todas las sesiones activas de la base.
        List<Sesion> listado_sesiones = (ArrayList<Sesion>) sesionService.getAll();
        //obtengo una lista con solo los codigos de mis sesiones en la base.
        //List<String> listado_sesiones_ids = listado_sesiones.stream().map(x -> x.getSession_id()).collect(Collectors.toList());
        if (listado_sesiones.isEmpty()) {
            //no hay sesiones en la base
            return null;
        } else {
            //recorro las sesiones
            for (Sesion sesion : listado_sesiones) {
                if (sesion.getSession_id().equals(session_id)) {
                    //encontre la session con el mismo id, por ende devuelvo el id del usuario correspondiente.
                    String doc = sesion.getDocumento().getNumero();
                    Long user_id = getPersonaByDocumento(doc);
                    return user_id;
                }
            }
        }
        return null;
    }
    
    @GetMapping("isProfesor")
    public Boolean isProfesor(Long id) {
        List<Persona> personas = new ArrayList<Persona>();
        List<Profesor> profesores = profesorService.getAll();
        List<Tutor> tutores = tutorService.getAll();
        personas.addAll(profesores);
        personas.addAll(tutores);
        for (Persona persona : personas) 
        {
            if(persona.getId().equals(id))
            {
                return persona instanceof Profesor;
            }
        }
        return false;
    }

    public Long getPersonaByDocumento(String documento) {
        List<Persona> personas = new ArrayList<Persona>();
        List<Profesor> profesores = profesorService.getAll();
        List<Tutor> tutores = tutorService.getAll();
        personas.addAll(profesores);
        personas.addAll(tutores);
        for (Persona persona : personas) {
            if (persona.getDocumento() == null || persona.getDocumento().getNumero() == null) {
                continue;
            }
            if (persona.getDocumento().getNumero().equals(documento)) {
                return persona.getId();
            }
        }
        throw new Error();
    }

    public String cifrarClave(String identificador) {

        try {
            MessageDigest md5 = MessageDigest.getInstance("MD5");
            byte[] byteMessage = identificador.getBytes("UTF-8");
            byte[] digested = md5.digest(byteMessage);
            StringBuffer codigobuilder = new StringBuffer();
            for (byte bytes : digested) {
                codigobuilder.append(String.format("%02x", bytes & 0xff));
            }
            String codigo = codigobuilder.toString();
            codigo = codigo.toUpperCase();
            return codigo;
        } catch (java.io.UnsupportedEncodingException e) {
            System.err.println("Erro, MD5 no es un algoritmo de encriptacion correcto para MessageDigest (ApiContrller) trying setCodigo");
        } catch (NoSuchAlgorithmException er) {
            System.err.println("Erro, MD5 no es un algoritmo de encriptacion correcto para MessageDigest");
        }
        return "";
    }

    @GetMapping("actividades")
    public String getActividades() {
        JsonArray plantillasJson = new JsonArray();
        List<Plantilla> plantillas = plantillaService.getAll();
        for (Plantilla plantilla : plantillas) {
            if (plantilla instanceof PlantillaPreguntas) {
                JsonObject p = new JsonObject();
                p.addProperty("nombre", plantilla.getNombre());
                p.addProperty("id", plantilla.getId());
                p.addProperty("tipo", "Preguntas");
                plantillasJson.add(p);
            }
            if (plantilla instanceof PlantillaPasapalabra) {
                JsonObject p = new JsonObject();
                p.addProperty("nombre", plantilla.getNombre());
                p.addProperty("id", plantilla.getId());
                p.addProperty("tipo", "Pasapalabra");
                plantillasJson.add(p);
            }
        }
        return plantillasJson.toString();
    }

    @GetMapping("actividadesByProfesor")
    public String getActividadesByProfesor(@RequestParam Long creadorId) {
        Profesor profesor = profesorService.get(creadorId);
        JsonArray plantillasJson = new JsonArray();
        List<Plantilla> plantillas = plantillaService.getAll(PlantillaSpecs.byCreador(profesor));
        for (Plantilla plantilla : plantillas) {
            if (plantilla instanceof PlantillaPreguntas) {
                JsonObject p = new JsonObject();
                p.addProperty("nombre", plantilla.getNombre());
                p.addProperty("id", plantilla.getId());
                p.addProperty("tipo", "Preguntas");
                plantillasJson.add(p);
            }
            if (plantilla instanceof PlantillaPasapalabra) {
                JsonObject p = new JsonObject();
                p.addProperty("nombre", plantilla.getNombre());
                p.addProperty("id", plantilla.getId());
                p.addProperty("tipo", "Pasapalabra");
                plantillasJson.add(p);
            }
            if (plantilla instanceof PlantillaGrilla) {
                JsonObject p = new JsonObject();
                p.addProperty("nombre", plantilla.getNombre());
                p.addProperty("id", plantilla.getId());
                p.addProperty("tipo", "Grilla");
                plantillasJson.add(p);
            }
            if (plantilla instanceof PlantillaCategorias) {
                JsonObject p = new JsonObject();
                p.addProperty("nombre", plantilla.getNombre());
                p.addProperty("id", plantilla.getId());
                p.addProperty("tipo", "Categorias");
                plantillasJson.add(p);
            }
            if (plantilla instanceof PlantillaVF) {
                JsonObject p = new JsonObject();
                p.addProperty("nombre", plantilla.getNombre());
                p.addProperty("id", plantilla.getId());
                p.addProperty("tipo", "VerdaderoFalso");
                plantillasJson.add(p);
            }
        }
        return plantillasJson.toString();
    }

    @GetMapping("actividad")
    public Plantilla getActividad(@RequestParam Long id) {
        Plantilla plantilla = (Plantilla) Hibernate.unproxy(plantillaService.get(id));
        return plantilla;
    }

    @GetMapping("imagenGrilla")
    public String getImagenGrilla(@RequestParam Long id) {
        String imagen = null;
        Plantilla plantilla = (Plantilla) Hibernate.unproxy(plantillaService.get(id));
        if (plantilla instanceof PlantillaGrilla) {
            imagen = new String(((PlantillaGrilla) plantilla).getImagen(), StandardCharsets.UTF_8);
        }
        return imagen;
    }

    @PostMapping("crearActividadPreguntas")
    public ResponseEntity<Long> crearActividadPreguntas(@RequestBody PlantillaPreguntasDto plantillaPreguntasDto) {
        PlantillaPreguntas plantilla = new PlantillaPreguntas();
        Profesor profe = profesorService.get(plantillaPreguntasDto.getCreadorId());
        plantilla.setCreador(profe);
        plantilla.setNombre(plantillaPreguntasDto.getNombre());
        plantilla.setSegundos(plantillaPreguntasDto.getSegundos());
        for (PreguntaDto preg : plantillaPreguntasDto.getPreguntasDto()) {
            Pregunta pregunta = new Pregunta();
            pregunta.setPregunta(preg.getPregunta());

            Respuesta correcta = new Respuesta();
            correcta.setCorrecta(true);
            correcta.setRespuesta(preg.getRespuestaCorrecta());
            pregunta.addRespuesta(correcta);

            Respuesta incorrectaA = new Respuesta();
            incorrectaA.setCorrecta(false);
            incorrectaA.setRespuesta(preg.getRespuestaIncorrectaA());
            pregunta.addRespuesta(incorrectaA);

            Respuesta incorrectaB = new Respuesta();
            incorrectaB.setCorrecta(false);
            incorrectaB.setRespuesta(preg.getRespuestaIncorrectaB());
            pregunta.addRespuesta(incorrectaB);

            Respuesta incorrectaC = new Respuesta();
            incorrectaC.setCorrecta(false);
            incorrectaC.setRespuesta(preg.getRespuestaIncorrectaC());
            pregunta.addRespuesta(incorrectaC);

            plantilla.addPregunta(pregunta);
        }
        plantilla.setPuntajeMaximo(plantillaPreguntasDto.getPreguntasDto().size());
        plantillaPreguntasService.save(plantilla);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("crearActividadPasapalabra")
    public ResponseEntity<Long> crearActividadPasapalabra(@RequestBody PlantillaPasapalabraDto plantillaPasapalabraDto) {
        PlantillaPasapalabra plantilla = new PlantillaPasapalabra();
        Profesor profe = profesorService.get(plantillaPasapalabraDto.getCreadorId());
        plantilla.setCreador(profe);
        plantilla.setNombre(plantillaPasapalabraDto.getNombre());
        plantilla.setSegundos(plantillaPasapalabraDto.getSegundos());
        for (PreguntaPasapalabraDto preg : plantillaPasapalabraDto.getPreguntasPasapalabraDto()) {
            PreguntaPasapalabra pregunta = new PreguntaPasapalabra();
            pregunta.setLetra(preg.getLetra());
            pregunta.setPregunta(preg.getPregunta());
            pregunta.setEmpiezaCon(preg.getEmpiezaCon());
            pregunta.setRespuestaCorrecta(preg.getRespuestaCorrecta());
            plantilla.addPregunta(pregunta);
        }
        plantilla.setPuntajeMaximo(plantillaPasapalabraDto.getPreguntasPasapalabraDto().size());
        plantillaPasapalabraService.save(plantilla);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("crearActividadGrilla")
    public ResponseEntity<Long> crearActividadGrilla(@RequestBody PlantillaGrillaDto plantillaGrillaDto) {
        PlantillaGrilla plantilla = new PlantillaGrilla();
        Profesor profe = profesorService.get(plantillaGrillaDto.getCreadorId());
        plantilla.setCreador(profe);
        plantilla.setNombre(plantillaGrillaDto.getNombre());
        plantilla.setImagen(plantillaGrillaDto.getImagen().getBytes());
        plantilla.setCantidadFilas(plantillaGrillaDto.getCantidadFilas());
        plantilla.setCantidadColumnas(plantillaGrillaDto.getCantidadColumnas());
        for (CeldaGrillaDto cel : plantillaGrillaDto.getCeldasDto()) {
            CeldaGrilla celda = new CeldaGrilla();
            celda.setFila(cel.getFila());
            celda.setColumna(cel.getColumna());
            celda.setValorCorrecto(cel.getValorCorrecto());
            plantilla.addCelda(celda);
        }
        plantilla.setPuntajeMaximo(plantillaGrillaDto.getCeldasDto().size());
        plantillaGrillaService.save(plantilla);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
    @PostMapping("crearActividadCategorias")
    public ResponseEntity<Long> crearActividadCategorias(@RequestBody PlantillaCategoriasDto plantillaCategoriasDto) {
        PlantillaCategorias plantilla = new PlantillaCategorias();
        Profesor profe = profesorService.get(plantillaCategoriasDto.getCreadorId());
        plantilla.setCreador(profe);
        plantilla.setNombre(plantillaCategoriasDto.getNombre());
        plantilla.setSegundos(plantillaCategoriasDto.getSegundos());
        int cantidadRespuestas = 0;
        for (CategoriaDto categoriaDto : plantillaCategoriasDto.getCategoriasDto()) {
            Categoria categoria = new Categoria();
            categoria.setNombre(categoriaDto.getNombre());
            for (String respuesta : categoriaDto.getRespuestas()) {
                RespuestaCategoria respuestaCategoria = new RespuestaCategoria();
                respuestaCategoria.setRespuesta(respuesta);
                categoria.addRespuesta(respuestaCategoria);
                cantidadRespuestas++;
            }
            plantilla.addCategoria(categoria);
        }
        plantilla.setPuntajeMaximo(cantidadRespuestas);
        plantilla.validar();
        plantillaCategoriasService.save(plantilla);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
    @PostMapping("crearActividadVF")
    public ResponseEntity<Long> crearActividadVF(@RequestBody PlantillaVFDto plantillaVFDto) {
        PlantillaVF plantilla = new PlantillaVF();
        Profesor profe = profesorService.get(plantillaVFDto.getCreadorId());
        plantilla.setCreador(profe);
        plantilla.setNombre(plantillaVFDto.getNombre());
        plantilla.setSegundos(plantillaVFDto.getSegundos());
        for (PreguntaVFDto preguntaVFDto : plantillaVFDto.getPreguntaVFDto()) {
            PreguntaVF pregunta = new PreguntaVF();
            pregunta.setPregunta(preguntaVFDto.getPregunta());
            pregunta.setRespuesta(preguntaVFDto.getRespuesta());
            plantilla.addPregunta(pregunta);
        }
        plantilla.setPuntajeMaximo(plantilla.getPreguntas().size());
        plantilla.validar();
        plantillaVFService.save(plantilla);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
    @PostMapping("cargarAddons")
    public ResponseEntity<Long> cargarAddons() {
        for (int i = 1; i < 4; i++) {
            Addon addon = new Addon();
            addon.setNombre(String.valueOf(i));
            addon.setIconoURL("assets/img/addons/anteojos-" + i + ".png");
            addon.setTipo(TipoAddon.ANTEOJOS);
            addon.setCosto(i * 2);
            addonService.save(addon);
        }
        for (int i = 1; i < 7; i++) {
            Addon addon = new Addon();
            addon.setNombre(String.valueOf(i));
            addon.setIconoURL("assets/img/addons/casaca-" + i + ".png");
            addon.setTipo(TipoAddon.CAMISETA);
            addon.setCosto(i * 2);
            addonService.save(addon);
        }
        for (int i = 1; i < 7; i++) {
            Addon addon = new Addon();
            addon.setNombre(String.valueOf(i));
            addon.setIconoURL("assets/img/addons/fondo-" + i + ".png");
            addon.setTipo(TipoAddon.FONDO);
            addon.setCosto(i * 2);
            addonService.save(addon);
        }
        for (int i = 1; i < 4; i++) {
            Addon addon = new Addon();
            addon.setNombre(String.valueOf(i));
            addon.setIconoURL("assets/img/addons/gorra-" + i + ".png");
            addon.setTipo(TipoAddon.SOMBRERO);
            addon.setCosto(i * 2);
            addonService.save(addon);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("addons")
    public List<Addon> getAddons() {
        return addonService.getAll();
    }

    @PostMapping("comprarAddon")
    public ResponseEntity<Long> comprarAddon(@RequestParam Long idAlumno, @RequestParam Long idAddon) {
        // TODO CHEQUEAR QUE EL ADDON NO ESTÉ PREVIAMENTE COMPRADO, NO SEAMOS RANCIOS, LAS VALIDACIONES VAN EN EL BACK!!
        Alumno alumno = alumnoService.get(idAlumno);
        alumno = Hibernate.unproxy(alumno, Alumno.class);
        Addon addon = addonService.get(idAddon);
        addon = Hibernate.unproxy(addon, Addon.class);

        if (alumno.getSaldoEstrellas() < addon.getCosto()) {
            throw new Error("Saldo insuficiente de estrellas");
        }

        deshabilitarAddonMismoTipo(alumno, addon);
        RecompensaAlumno recompensaAlumno = new RecompensaAlumno();
        recompensaAlumno.setAddon(addon);
        recompensaAlumno.setEquipado(true);
        recompensaAlumno.setAlumno(alumno);
        recompensaAlumnoService.save(recompensaAlumno);

        alumno.addRecompensa(recompensaAlumno);
        alumno.setSaldoEstrellas(alumno.getSaldoEstrellas() - addon.getCosto());

        alumnoService.save(alumno);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("equiparDesequiparAddon")
    public ResponseEntity<Long> equiparDesequiparAddon(@RequestParam Long idAlumno, @RequestParam Long idAddon) {
        final Alumno alumno = Hibernate.unproxy(alumnoService.get(idAlumno), Alumno.class);
        final Addon addon = Hibernate.unproxy(addonService.get(idAddon), Addon.class);

        if (alumno.getRecompensas() == null) {
            throw new Error("El addon no ha sido comprado aún");
        }

        RecompensaAlumno recompensa = alumno.getRecompensas()
                .stream()
                .filter(r -> r.getAddon().getId().equals(addon.getId()))
                .findFirst()
                .orElseThrow(() -> new Error("El addon no ha sido comprado aún"));

        if (!recompensa.getEquipado()) {
            deshabilitarAddonMismoTipo(alumno, addon);
        }
        recompensa.setEquipado(!recompensa.getEquipado());

        recompensaAlumnoService.save(recompensa);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("recompensasAlumno")
    @ResponseBody
    public ResponseEntity<?> getRecompensasAlumno(@RequestParam Long idAlumno) {
        Alumno alumno = Hibernate.unproxy(alumnoService.get(idAlumno), Alumno.class);
        return new ResponseEntity<>(alumno.getRecompensas(), HttpStatus.OK);
    }

    private void deshabilitarAddonMismoTipo(Alumno alumno, Addon addon) {
        alumno.getRecompensas()
                .stream()
                .filter(r -> r.getAddon().getTipo().equals(addon.getTipo()) && r.getEquipado())
                .findFirst()
                .ifPresent(r -> r.setEquipado(false));
    }

}
