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
import com.edusis.apirest.domain.Plantilla;
import com.edusis.apirest.domain.PlantillaPasapalabra;
import com.edusis.apirest.domain.PlantillaPreguntas;
import com.edusis.apirest.domain.Pregunta;
import com.edusis.apirest.domain.PreguntaPasapalabra;
import com.edusis.apirest.domain.Profesor;
import com.edusis.apirest.domain.Sesion;
import com.edusis.apirest.domain.Respuesta;
import com.edusis.apirest.domain.TipoDocumento;
import com.edusis.apirest.domain.Tutor;
import com.edusis.apirest.service.AlumnoService;
import com.edusis.apirest.service.AsignaturaService;
import com.edusis.apirest.service.CursoService;
import com.edusis.apirest.service.EmojiService;
import com.edusis.apirest.service.PersonaService;
import com.edusis.apirest.service.PlantillaPasapalabraService;
import com.edusis.apirest.service.PlantillaPreguntasService;
import com.edusis.apirest.service.PlantillaService;
import com.edusis.apirest.service.ProfesorService;
import com.edusis.apirest.service.SesionService;
import com.edusis.apirest.service.TutorService;
import com.edusis.apirest.service.dto.AlumnoDto;
import com.edusis.apirest.service.dto.AsignaturaDto;
import com.edusis.apirest.service.dto.CursoDto;
import com.edusis.apirest.service.dto.EmojiDto;
import com.edusis.apirest.service.dto.PlantillaPasapalabraDto;
import com.edusis.apirest.service.dto.PlantillaPreguntasDto;
import com.edusis.apirest.service.dto.PreguntaDto;
import com.edusis.apirest.service.dto.PreguntaPasapalabraDto;
import com.edusis.apirest.service.dto.ProfesorDto;
import com.edusis.apirest.service.dto.TutorDto;
import com.edusis.apirest.specs.AlumnoSpecs;
import com.edusis.apirest.specs.AsignaturaSpecs;
import com.edusis.apirest.specs.PlantillaSpecs;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.querydsl.core.types.Predicate;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
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
    
    @Autowired
    private SesionService sesionService;
    
    @Autowired
    private PlantillaPreguntasService plantillaPreguntasService;
    
    @Autowired
    private PlantillaPasapalabraService plantillaPasapalabraService;

    @Autowired
    private PlantillaService plantillaService;
    

    
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
        //Recursion.
        return profe.getCursos();
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
    
    @PostMapping("eliminarAlumno")
    public ResponseEntity<Long> eliminarAlumno(@RequestBody Long alumnoId) {
        alumnoService.deleteById(alumnoId);
        return new ResponseEntity<>(HttpStatus.OK);
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
        Long tutor = alumnoDto.getTutorId();
        Tutor esteTutor = tutorService.get(tutor);
        alumno.setTutor(esteTutor);
        
        if(esteTutor.getAlumnos().size() != 0){
            //El tutor ya posee alumnos asignados.
            if(!esteTutor.getAlumnos().contains(alumno)){
                esteTutor.getAlumnos().add(alumno);
                tutorService.save(esteTutor);
            }
        } else{
            //El tutor no posee ningun alumno asignado
            ArrayList<Alumno> alumnos = new ArrayList<Alumno>();
            alumnos.add(alumno);
            esteTutor.setAlumnos(alumnos);
            tutorService.save(esteTutor);
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
    
    @GetMapping("alumnosByTutor")
    public List<Alumno> alumnosByTutor (@RequestParam Long idTutor){
        Tutor tutor = tutorService.get(idTutor);
        return alumnoService.getAll(AlumnoSpecs.byTutor(tutor));
        
    }
    
    @PostMapping("ingresoAlumno")
    public ResponseEntity<Long> ingresoAlumno(@RequestParam Long id, @RequestParam Long emoji1Id, @RequestParam Long emoji2Id, @RequestParam Long emoji3Id) {
        Alumno alumno = alumnoService.get(id);
        if (emoji1Id != null && emoji2Id != null && emoji3Id != null) {
            if (Objects.equals(alumno.getPasswordEmoji().getEmoji1().getId(), emoji1Id) &&
                Objects.equals(alumno.getPasswordEmoji().getEmoji2().getId(), emoji2Id) &&
                Objects.equals(alumno.getPasswordEmoji().getEmoji3().getId(), emoji3Id)) {
                //Seteamos el ultimo acceso en el alumno.
                Calendar ultimo_acceso = Calendar.getInstance();
                alumno.setUltimoAcceso(ultimo_acceso);
                alumnoService.save(alumno);
                
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
        if( profe.getCursos().size() != 0){
            //Ya tiene cursos agregados.
            if(!profe.getCursos().contains(curso)){
                profe.getCursos().add(curso);
                
            }
        }
        else{
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
    public Curso generarCodigoCurso(@RequestBody CursoDto cursoDto) throws NoSuchAlgorithmException{
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
                 codigo = codigo.toUpperCase();
                 int largo = codigo.length();
                 codigo = codigo.substring(0, Math.min(largo , 8));
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
        return curso;
    }
    
    @GetMapping("buscarCursoPorCodigo")
    public Long buscarCursoPorCodigo(@RequestParam String codigo) {
        //param: codigo --> Codigo del curso a buscar
        //return value "-1" --> Curso no encontrado o error en la busqueda
        //return value int != -1 --> es el id del curso a inscribirme

        //Consigo todos los cursos
        List<Curso> listado_cursos = (ArrayList<Curso>) cursoService.getAll();
        if (listado_cursos.isEmpty()) {
            //No hay cursos creados por ahora, por ende devuelvo -1
            return Long.valueOf(-1);
        } else {
            for (Curso curso : listado_cursos) {
                if (curso.getCodigo() != null && curso.getCodigo().equals(codigo)) {
                    //Encontre el curso con ese codigo.
                    //devuelvo su id
                    return curso.getId();
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
        //Guardamos la asignatura en la entidad curso.
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
        //Guardamos la asignatura en la entidad Profesor.
        if(profe.getAsignaturas() != null){
            if(!profe.getAsignaturas().contains(asignatura)){
                profe.getAsignaturas().add(asignatura);
                
            }
        }
        else{
            ArrayList<Asignatura> asignaturas = new ArrayList<Asignatura>();
            asignaturas.add(asignatura);
            profe.setAsignaturas(asignaturas); 
        }
        asignaturaService.save(asignatura);
        profesorService.save(profe);
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
        return cursoService.getAll(); 
    }
    
    @GetMapping("getCursosDeAlumno")
    public List<Curso> getCursosDeAlumno(@RequestParam Long idAlumno){
        Alumno alumno = alumnoService.get(idAlumno);
        if(alumno == null){
            throw new Error();
        }
        
        if(alumno.getCursos().isEmpty())
        {
        //No hay cursos para mostrar!
        return null;
        }
        else{
            return alumno.getCursos();
        }
    }
    
    @PostMapping("agregarAlumnoACurso")
    public ResponseEntity<Long> agregarAlumnoACurso(@RequestParam Long idAlumno, @RequestParam Long idCurso){
        Alumno alumno = alumnoService.get(idAlumno);
        Curso curso = cursoService.get(idCurso);
        if(curso == null || alumno == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        if(!curso.getAlumnos().isEmpty()){
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
        if(!alumno.getCursos().isEmpty()){
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

                //No lo hago todo junto por si queremos diferneciar en documento encontrado y no encontrado
                //documento encontrado, valido si la contraseña tambien coincide.
                //en la base, esta la contraseña cifrada, por ende tengo que cifrar la password del front y comprarla con la del server
                //System.out.println(persona.getClass());
                if (persona.getPassword().equals(cifrarClave(password))) {
                    char userType = '0'; // 0 para Tutor.
                    if( persona instanceof Profesor){
                        userType = '1'; //1 para Profesor.
                    }
                   
                    //la contraseña tambien coincide.
                    //tengo que crear la session.
                    Sesion sesion = new Sesion();
                    Documento doc = new Documento();
                    doc = persona.getDocumento();
                    sesion.setDocumento(doc);
                    //Genero el session_id, que el hash que voy a usar para validar
                    SecureRandom random = new SecureRandom();
                    byte[] contenedor = new byte[16];
                    random.nextBytes(contenedor);
                    
                    StringBuffer codigobuilder = new StringBuffer();
                    for (byte bytes : contenedor) {
                        codigobuilder.append(String.format("%02x", bytes & 0xff));
                    }
                    String codigo = codigobuilder.toString();
                    codigo = codigo + userType;//concateno en el codigo el tipo de usuario que es.
                    codigo = codigo.toUpperCase();
                    sesion.setSession_id(codigo);
                    Calendar fecha = Calendar.getInstance();
                    fecha.add(Calendar.DAY_OF_YEAR, 1);
                    sesion.setExpiracion(fecha);
                    sesionService.save(sesion);
                    //devuelvo el session id al usuario para que vaya en la coockie
                    return codigo; 
                } else {
                    //Contraseña incorrecta
                    return "wrong_password";
                }
            }
        }
        return "user_not_found";
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
            //recorro las sesiones

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
    public Boolean isProfesor(Long id){
        //Return True si es profesor, o Falso si es tutor.}
        List<Persona> personas = new ArrayList<Persona>();
        List<Profesor> profesores = profesorService.getAll();
        List<Tutor> tutores = tutorService.getAll();
        personas.addAll(profesores);
        personas.addAll(tutores);
        for (Persona persona : personas) 
        {
            if(persona.getId().equals(id))
            {
                if(persona instanceof Profesor){
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }
        return false;
    }
    
    public Long getPersonaByDocumento(String documento){
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
                return persona.getId();
            }
        }
        throw new Error();
    }
    
    public String cifrarClave(String identificador)
    {
        
        try{
                MessageDigest md5 = MessageDigest.getInstance("MD5");
                byte[] byteMessage = identificador.getBytes("UTF-8");
                byte[] digested = md5.digest(byteMessage);
                StringBuffer codigobuilder = new StringBuffer();
                for (byte bytes : digested) 
                {
                    codigobuilder.append(String.format("%02x", bytes & 0xff));
                }
                 String codigo = codigobuilder.toString();
                 codigo = codigo.toUpperCase();
                 return codigo;
            }
        catch (java.io.UnsupportedEncodingException e)
            {
                System.err.println("Erro, MD5 no es un algoritmo de encriptacion correcto para MessageDigest (ApiContrller) trying setCodigo");
            }
        catch (NoSuchAlgorithmException er){
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
        }
        return plantillasJson.toString();
    }
    
    @GetMapping("actividad")
    public Plantilla getActividad(@RequestParam Long id) {
        Plantilla plantilla = (Plantilla) Hibernate.unproxy(plantillaService.get(id));
        return plantilla;
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

}
