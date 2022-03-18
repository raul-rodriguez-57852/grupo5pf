/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.edusis.apirest.controller;

import com.edusis.apirest.domain.Alumno;
import com.edusis.apirest.domain.Asignatura;
import com.edusis.apirest.domain.Curso;
import com.edusis.apirest.domain.DetalleTarea;
import com.edusis.apirest.domain.DetalleTareaActividad;
import com.edusis.apirest.domain.DetalleTareaMultimedia;
import com.edusis.apirest.domain.Persona;
import com.edusis.apirest.domain.plantillas.Plantilla;
import com.edusis.apirest.domain.plantillas.PlantillaPasapalabra;
import com.edusis.apirest.domain.plantillas.PlantillaPreguntas;
import com.edusis.apirest.domain.Profesor;
import com.edusis.apirest.domain.QRealizacionTarea;
import com.edusis.apirest.domain.RealizacionTarea;
import com.edusis.apirest.domain.RealizacionTareaDetalle;
import com.edusis.apirest.domain.Tarea;
import com.edusis.apirest.domain.plantillas.PlantillaGrilla;
import com.edusis.apirest.service.AlumnoService;
import com.edusis.apirest.service.AsignaturaService;
import com.edusis.apirest.service.CursoService;
import com.edusis.apirest.service.DetalleTareaActividadService;
import com.edusis.apirest.service.DetalleTareaMultimediaService;
import com.edusis.apirest.service.PlantillaService;
import com.edusis.apirest.service.ProfesorService;
import com.edusis.apirest.service.RealizacionTareaService;
import com.edusis.apirest.service.TareaService;
import com.edusis.apirest.service.dto.AsignaturaDto;
import com.edusis.apirest.service.dto.DetalleTareaActividadDto;
import com.edusis.apirest.service.dto.DetalleTareaMultimediaDto;
import com.edusis.apirest.service.dto.RealizacionDetalleDto;
import com.edusis.apirest.service.dto.RealizacionTareaDto;
import com.edusis.apirest.service.dto.TareaDto;
import com.edusis.apirest.specs.AlumnoSpecs;
import com.edusis.apirest.specs.AsignaturaSpecs;
import com.edusis.apirest.specs.DetalleTareaActividadSpecs;
import com.edusis.apirest.specs.DetalleTareaMultimediaSpecs;
import com.edusis.apirest.specs.RealizacionTareaSpecs;
import com.edusis.apirest.specs.TareaSpecs;
import com.edusis.apirest.utils.AssertUtils;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.querydsl.core.types.Expression;
import com.querydsl.core.types.Ops;
import com.querydsl.core.types.dsl.NumberOperation;
import com.querydsl.jpa.JPQLQuery;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collection;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.PersistenceContext;
import javax.persistence.Tuple;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
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
 * @author Naim Saadi
 */
@RestController
@CrossOrigin(origins = "*", methods= {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE})
@RequestMapping("/tarea")
public class TareaController {
    
    @PersistenceContext
    EntityManager entityManager;
    
    @Autowired
    private CursoService cursoService;
    @Autowired
    private TareaService tareaService;
    @Autowired
    private ProfesorService profesorService; 
    @Autowired
    private AsignaturaService asignaturaService;  
    @Autowired
    private DetalleTareaMultimediaService detalleTareaMultimediaService; 
    @Autowired
    private DetalleTareaActividadService detalleTareaActividadService;
    @Autowired
    private PlantillaService plantillaService;
    @Autowired
    private AlumnoService alumnoService;
    @Autowired
    private RealizacionTareaService realizacionTareaService;
    
    @PostMapping("guardarTarea")
    public Long guardarTarea(@RequestBody TareaDto tareaDto) {
        Tarea tarea = tareaDto.getId() != null ? tareaService.get(tareaDto.getId()) : new Tarea();
        tarea.setNombre(tareaDto.getNombre());
        tarea.setCreador(profesorService.get(tareaDto.getCreadorId()));
        tarea.setPuntajeMaximo(tareaDto.getPuntajeMaximo());
        tarea.setFechaLimite(tareaDto.getFechaLimite());
        Asignatura asignatura = asignaturaService.get(tareaDto.getAsignaturaId());
        tarea.setAsignatura(asignatura);
        if(asignatura.getTareas() != null){
            if(!asignatura.getTareas().contains(tarea)){
                asignatura.getTareas().add(tarea);
                asignaturaService.save(asignatura);
            }
        } else{
            ArrayList<Tarea> tareas = new ArrayList<Tarea>();
            tareas.add(tarea);
            asignatura.setTareas(tareas);
            asignaturaService.save(asignatura);
        }
        tarea.validar();
        tarea = tareaService.save(tarea);
        return tarea.getId();
//        return new ResponseEntity<>(HttpStatus.OK);
    }
    
    @GetMapping("tarea")
    public Tarea getTarea (@RequestParam Long id) {
        return tareaService.get(id);
    }
    
    @DeleteMapping("eliminarTarea")
    public ResponseEntity<Long> eliminarTarea(@RequestParam Long id) {
        tareaService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
    @GetMapping("tareas")
    public List<Tarea> getTareas(@RequestParam Long cursoId) {
        Curso curso = cursoService.get(cursoId);
        List<Asignatura> asignaturas =  asignaturaService.getAll(AsignaturaSpecs.byCurso(curso));
        return tareaService.getAll(TareaSpecs.byAsignaturas(asignaturas));
    }
    
    @GetMapping("realizaciones")
    public String getRealizaciones(@RequestParam Long cursoId, @RequestParam Long alumnoId) {
        Curso curso = cursoService.get(cursoId);
        Alumno alumno = alumnoService.get(alumnoId);
        List<Asignatura> asignaturas =  asignaturaService.getAll(AsignaturaSpecs.byCurso(curso));
        List<Tarea> tareas = tareaService.getAll(TareaSpecs.byAsignaturas(asignaturas));
        List<RealizacionTarea> realizaciones = realizacionTareaService.getAll(RealizacionTareaSpecs.byTareasAndAlumno(tareas, alumno));
        JsonArray realizacionesJson = new JsonArray();
        HashMap<Tarea, List<RealizacionTarea>> mapa = new HashMap();
        for (Tarea tarea : tareas) {
            List<RealizacionTarea> realizacionesList = new ArrayList<RealizacionTarea>();
            for (RealizacionTarea realizacion : realizaciones) {
                if(tarea.equals(realizacion.getTarea())){
                    realizacionesList.add(realizacion);
//                    realizaciones.remove(realizacion);
                }
            }
            realizacionesList.sort((o2, o1) -> o1.getPuntajeObtenido().compareTo(o2.getPuntajeObtenido()));
            JsonObject p = new JsonObject();
            p.addProperty("id", tarea.getId());
            p.addProperty("nombre", tarea.getNombre());
            p.addProperty("asignatura", tarea.getAsignatura().getNombre());
            Double puntaje = realizacionesList.isEmpty() ? 0: realizacionesList.get(0).getPuntajeObtenido();
            p.addProperty("puntaje", puntaje);
            Long fechaLimite = tarea.getFechaLimite() == null ? null: tarea.getFechaLimite().getTimeInMillis();
            p.addProperty("fechaLimite",fechaLimite);
            realizacionesJson.add(p);
//            mapa.put(tarea, realizacionesList);
        }
        return realizacionesJson.toString();
        
    }
    
    @GetMapping("porcentajeRealizacion")
    public String getPorcentajeRealizacion(@RequestParam Long cursoId) {
        Curso curso = cursoService.get(cursoId);
//        List<Tarea> tareas = tareaService.getAll(TareaSpecs.byAsignaturas(asignaturas));
        List<Tarea> tareas = getTareas(cursoId);
        List<Alumno> alumnos = alumnoService.getAll(AlumnoSpecs.byCurso(curso));
        Integer totalAlumnos = alumnos.size();
        List<RealizacionTarea> realizaciones = realizacionTareaService.getAll(RealizacionTareaSpecs.byTareas(tareas));
        JsonArray realizacionesJson = new JsonArray();
        for (Tarea tarea : tareas) {
            JsonObject p = new JsonObject();
            p.addProperty("id", tarea.getId());
            p.addProperty("nombre", tarea.getNombre());
            p.addProperty("asignatura", tarea.getAsignatura().getNombre());
            Integer alumnosRealizado = 0;
            for (Alumno alumno : alumnos) {
                for (RealizacionTarea realizacion : realizaciones) {
                    if(tarea.equals(realizacion.getTarea()) && alumno.equals(realizacion.getAlumno())){
                        alumnosRealizado ++;
                        break;
                    }
                }
            }
            float porcentaje = alumnosRealizado * 100 / totalAlumnos;
                    
            p.addProperty("porcentajeRealizacion", porcentaje);
            Long fechaLimite = tarea.getFechaLimite() == null ? null: tarea.getFechaLimite().getTimeInMillis();
            p.addProperty("fechaLimite",fechaLimite);
            realizacionesJson.add(p);
        }
        return realizacionesJson.toString();
        
    }
    
    
    @GetMapping("realizacionesPorAlumno")
    public String getRealizacionesPorAlumno(@RequestParam Long tareaId) {
        Tarea tarea = tareaService.get(tareaId);
        
        Curso curso = tarea.getAsignatura().getCurso();
        List<Alumno> alumnos = alumnoService.getAll(AlumnoSpecs.byCurso(curso));
       
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Tuple> q = cb.createTupleQuery();
        Root<RealizacionTarea> c = q.from(RealizacionTarea.class);
        q.multiselect(c.get("alumno"), cb.max(c.get("puntajeObtenido")), cb.count(c), cb.max(c.get("fecha")));
        q.where(cb.equal(c.get("tarea"), tarea));
        q.groupBy(c.get("alumno"));
        
        
        List<Tuple> result = entityManager.createQuery(q).getResultList();
        
 
        JsonArray realizacionesJson = new JsonArray();
        
        for (Alumno alumno : alumnos) {
            boolean encontrado = false;
            for (Tuple tupla : result) {
                if(alumno.equals(tupla.get(0,Persona.class))){
                    JsonObject p = new JsonObject();
                    p.addProperty("id", (tupla.get(0,Persona.class)).getId());
                    p.addProperty("alumno", (tupla.get(0,Persona.class)).getNombreCompleto());
                    p.addProperty("puntajeMaximo", tupla.get(1,Double.class));
                    p.addProperty("intentos", tupla.get(2,Long.class));
                    Long fechaLimite = tupla.get(3,Calendar.class) == null ? null: tupla.get(3,Calendar.class).getTimeInMillis();
                    p.addProperty("ultimaFecha", fechaLimite);
                    
                    encontrado = true;
                    realizacionesJson.add(p);
                    break;
                } 
            }
            if(!encontrado){
                JsonObject p = new JsonObject();
                p.addProperty("id", alumno.getId());
                p.addProperty("alumno", alumno.getNombreCompleto());
                p.addProperty("puntajeMaximo", 0);
                p.addProperty("intentos", 0);
                p.addProperty("ultimaFecha", 0);
                realizacionesJson.add(p);
            }
            
        }
        return realizacionesJson.toString();
        
    }
    
    @GetMapping("alumnosPorCurso")
    public List<Alumno> getAlumnosPorCurso(@RequestParam Long cursoId) {
        
        Curso curso = cursoService.get(cursoId);
        List<Alumno> alumnos = alumnoService.getAll(AlumnoSpecs.byCurso(curso));
        return alumnos;
    
    }
    
    @GetMapping("cantidadPorRangoTarea")
    public String getCantidadPorRangoTarea(@RequestParam Long tareaId) {
        Tarea tarea = tareaService.get(tareaId);
        
        Curso curso = tarea.getAsignatura().getCurso();
        List<Alumno> alumnos = alumnoService.getAll(AlumnoSpecs.byCurso(curso));
        
        Map<String,Integer> rangoPuntaje = new HashMap<>(); 
        rangoPuntaje.put("No realizada", 0);
        rangoPuntaje.put("0-20", 0);
        rangoPuntaje.put("20-40", 0);
        rangoPuntaje.put("40-60", 0);
        rangoPuntaje.put("60-80", 0);
        rangoPuntaje.put("80-100", 0);
        
        
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Tuple> q = cb.createTupleQuery();
        Root<RealizacionTarea> c = q.from(RealizacionTarea.class);
        q.multiselect(c.get("alumno"), cb.max(c.get("puntajeObtenido")));
        q.where(cb.equal(c.get("tarea"), tarea));
        q.groupBy(c.get("alumno"));
        
        
        List<Tuple> result = entityManager.createQuery(q).getResultList();
 
        
        for (Alumno alumno : alumnos) {
            boolean encontrado = false;
            for (Tuple tupla : result) {
                if(alumno.equals(tupla.get(0,Persona.class))){
                    
                    if(tupla.get(1,Double.class) < 20){
                        rangoPuntaje.put("0-20", rangoPuntaje.get("0-20") + 1);
                    }
                    if(tupla.get(1,Double.class) >= 20 && tupla.get(1,Double.class) < 40){
                        rangoPuntaje.put("20-40", rangoPuntaje.get("20-40") + 1);
                    }
                    if(tupla.get(1,Double.class) >= 40 && tupla.get(1,Double.class) < 60){
                        rangoPuntaje.put("40-60", rangoPuntaje.get("40-60") + 1);
                    }
                    if(tupla.get(1,Double.class) >= 60 && tupla.get(1,Double.class) < 80){
                        rangoPuntaje.put("60-80", rangoPuntaje.get("60-80") + 1);
                    }
                    if(tupla.get(1,Double.class) >= 80){
                        rangoPuntaje.put("80-100", rangoPuntaje.get("80-100") + 1);
                    }  
                    encontrado = true;

                    break;
                } 
            }
            if(!encontrado){
                rangoPuntaje.put("No realizada", rangoPuntaje.get("No realizada") + 1);
            }           
        }
        String jsonString = new Gson().toJson(rangoPuntaje);
        return jsonString;
        
    }
    
    @GetMapping("puntajeAlumnoAcumulado")
    public String getPuntajeAlumnoAcumulado(@RequestParam Long cursoId,@RequestParam Long alumnoId, @RequestParam(value = "asignaturaId") Optional<Long> asignaturaId) {
        Curso curso = cursoService.get(cursoId);
        Asignatura asignatura = null;
        if(asignaturaId.isPresent()){
            asignatura = asignaturaService.get(asignaturaId.get()); 
        } 
        List<Tarea> tareas = asignatura == null? getTareas(cursoId):tareaService.getAll(TareaSpecs.byAsignatura(asignatura)) ; 

        Alumno alumno = alumnoService.get(alumnoId);
        
        
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Tuple> q = cb.createTupleQuery();
        Root<RealizacionTarea> c = q.from(RealizacionTarea.class);
        q.multiselect(c.get("tarea"), cb.max(c.get("puntajeObtenido")));
        q.where(cb.equal(c.get("alumno"), alumno), c.get("tarea").in(tareas));
        q.groupBy(c.get("tarea"));
        
        
        List<Tuple> result = entityManager.createQuery(q).getResultList();
        
        JsonArray puntajesJson = new JsonArray();
        
        for (Tarea tarea : tareas) {
            boolean encontrado = false;
            for (Tuple tupla : result) {
                if(tarea.equals(tupla.get(0,Tarea.class))){
                    
                    JsonObject p = new JsonObject();
                    p.addProperty("tareaId", (tupla.get(0,Tarea.class)).getId());
                    p.addProperty("puntajeMaximo", tupla.get(1,Double.class));
                    Long fecha = tupla.get(0,Tarea.class).getFechaLimite() == null ? null: tupla.get(0,Tarea.class).getFechaLimite().getTimeInMillis();
                    p.addProperty("fecha", fecha);
                    p.addProperty("nombre", (tupla.get(0,Tarea.class)).getNombre());
                    
                    encontrado = true;
                    puntajesJson.add(p);
                    
                    break;
                } 
            }
            if(!encontrado){
                JsonObject p = new JsonObject();
                p.addProperty("tareaId", tarea.getId());
                p.addProperty("puntajeMaximo", 0);
                Long fecha = tarea.getFechaLimite() == null ? null: tarea.getFechaLimite().getTimeInMillis();
                p.addProperty("fecha", fecha);
                p.addProperty("nombre", tarea.getNombre());

                puntajesJson.add(p);
            }           
        }
        

        return puntajesJson.toString();
        
    }
    
    @PostMapping("guardarDetalleMultimedia")
    public ResponseEntity<Long> guardarDetalleMultimedia(@RequestBody DetalleTareaMultimediaDto detalleTareaMultimediaDto) {
        DetalleTareaMultimedia detalle = detalleTareaMultimediaDto.getId() != null ? detalleTareaMultimediaService.get(detalleTareaMultimediaDto.getId()) : new DetalleTareaMultimedia();
        detalle.setDescripcion(detalleTareaMultimediaDto.getDescripcion());
        detalle.setLinkYoutube(detalleTareaMultimediaDto.getLinkYoutube());
        Tarea tarea = tareaService.get(detalleTareaMultimediaDto.getIdTarea());
        tarea.addLinea(detalle);
        tarea.validar();
        tareaService.save(tarea);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
    @GetMapping("detalleMultimedia")
    public DetalleTareaMultimedia getDetalleMultimedia (@RequestParam Long id) {
        return detalleTareaMultimediaService.get(id);
    }
    
    @GetMapping("detalleMultimediaTarea")
    public DetalleTareaMultimedia getDetalleMultimediaTarea (@RequestParam Long tareaId) {
        Tarea tarea = tareaService.get(tareaId);
        tarea = Hibernate.unproxy(tarea, Tarea.class);
        return detalleTareaMultimediaService.findOne(DetalleTareaMultimediaSpecs.byTarea(tarea));
    }
    
    @PostMapping("guardarDetalleActividad")
    public ResponseEntity<Long> guardarDetalleActividad(@RequestBody DetalleTareaActividadDto detalleTareaActividadDto) {
        DetalleTareaActividad detalle = detalleTareaActividadDto.getId() != null ? detalleTareaActividadService.get(detalleTareaActividadDto.getId()) : new DetalleTareaActividad();
        Tarea tarea = tareaService.get(detalleTareaActividadDto.getIdTarea());
        Profesor profesor = tarea.getCreador();
        Plantilla plantilla = plantillaService.get(detalleTareaActividadDto.getIdPlantilla());
        detalle.setCreador(profesor);
        detalle.setPlantilla(plantilla);
        tarea.addLinea(detalle);
        tarea.validar();
        tareaService.save(tarea);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
    @PostMapping("guardarDetallesActividad")
    public ResponseEntity<Long> guardarDetallesActividad(@RequestBody List<DetalleTareaActividadDto> detalles) {
        AssertUtils.notEmpty(detalles, "No selecciono nigun detalle");
        List<DetalleTarea> detallesNew = new ArrayList<DetalleTarea>();
        Tarea tarea = tareaService.get(detalles.get(0).getIdTarea());
        DetalleTareaMultimedia detMultimedia = detalleTareaMultimediaService.findOne(DetalleTareaMultimediaSpecs.byTarea(tarea));
        detallesNew.add(detMultimedia);
        for (DetalleTareaActividadDto detalleTareaActividadDto : detalles) {
            DetalleTareaActividad detalle = detalleTareaActividadDto.getId() != null ? detalleTareaActividadService.get(detalleTareaActividadDto.getId()) : new DetalleTareaActividad();
            Profesor profesor = tarea.getCreador();
            Plantilla plantilla = plantillaService.get(detalleTareaActividadDto.getIdPlantilla());
            detalle.setCreador(profesor);
            detalle.setPlantilla(plantilla);
            detallesNew.add(detalle);
        }
        tarea.setLineas(detallesNew);
        tarea.validar();
        tareaService.save(tarea);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
    @GetMapping("detalleActividadTarea")
    public List<DetalleTareaActividad> getDetalleActividadTarea (@RequestParam Long tareaId) {
        Tarea tarea = tareaService.get(tareaId);
        return detalleTareaActividadService.getAll(DetalleTareaActividadSpecs.byTarea(tarea));
    }
    
    @GetMapping("detalleActividadCreador")
    public List<DetalleTareaActividad> getDetalleActividadCreador (@RequestParam Long tareaId) {
        Tarea tarea = tareaService.get(tareaId);
        Profesor profesor = tarea.getCreador();
        return detalleTareaActividadService.getAll(DetalleTareaActividadSpecs.byCreador(profesor));
    }
    
    @GetMapping("actividadTipo")
    public String getActividadTipo(@RequestParam Long actividadId) {
        Plantilla plantilla = plantillaService.get(actividadId);
        plantilla = (Plantilla) Hibernate.unproxy(plantilla);
        if (plantilla instanceof PlantillaPreguntas) {
            return "Preguntas";
        }
        if (plantilla instanceof PlantillaPasapalabra) {
            return "Pasapalabra";
        }
        if (plantilla instanceof PlantillaGrilla) {
            return "Grilla";
        }
        return null;
    }
    
    @GetMapping("tiposPlantillas")
    public Set<String> getTiposPlantillas () {
        List<Plantilla> plantillas =  plantillaService.getAll();
        Set<String> tipos = new LinkedHashSet<String>();
        for (Plantilla plantilla : plantillas) {
            tipos.add(plantilla.getClass().getName());
        }
        return tipos;
    }
    
    
    @PostMapping("guardarRealizacionTarea")
    public ResponseEntity<Long> guardarRealizacionTarea(@RequestBody RealizacionTareaDto dto) {
        //// queda ver el tema de fechas
        RealizacionTarea realizacion = new RealizacionTarea();
        Tarea tarea = tareaService.get(dto.getIdTarea());
        Alumno alumno = alumnoService.get(dto.getIdAlumno());
        realizacion.setTarea(tarea);
        realizacion.setAlumno(alumno);
        for (RealizacionDetalleDto detalleDto : dto.getDetalles()) {
            RealizacionTareaDetalle detalle = new RealizacionTareaDetalle();
            Plantilla plantilla = (Plantilla) Hibernate.unproxy(plantillaService.get(detalleDto.getIdPlantilla()));
            
            detalle.setPlantilla(plantilla);
            detalle.setPuntajeObtenido(detalleDto.getPuntajeObtenido());
            detalle.calcularPorcentaje();
            
            
            realizacion.addDetalle(detalle);
        }
        Calendar fecha = Calendar.getInstance();
        realizacion.calcularPorcentaje();
        realizacion.setFecha(fecha);
        realizacionTareaService.save(realizacion);
        //Actualizo ultimo acceso para el alumno.       
        alumno.setUltimoAcceso(fecha);
        alumnoService.save(alumno);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
}
