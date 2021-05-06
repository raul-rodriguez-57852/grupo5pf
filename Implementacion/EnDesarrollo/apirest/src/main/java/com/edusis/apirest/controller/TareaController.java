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
import com.edusis.apirest.domain.Plantilla;
import com.edusis.apirest.domain.PlantillaPasapalabra;
import com.edusis.apirest.domain.PlantillaPreguntas;
import com.edusis.apirest.domain.Profesor;
import com.edusis.apirest.domain.RealizacionTarea;
import com.edusis.apirest.domain.RealizacionTareaDetalle;
import com.edusis.apirest.domain.Tarea;
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
import com.edusis.apirest.specs.AsignaturaSpecs;
import com.edusis.apirest.specs.DetalleTareaActividadSpecs;
import com.edusis.apirest.specs.DetalleTareaMultimediaSpecs;
import com.edusis.apirest.specs.RealizacionTareaSpecs;
import com.edusis.apirest.specs.TareaSpecs;
import com.edusis.apirest.utils.AssertUtils;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
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
            Double puntaje = realizacionesList.isEmpty() ? null: realizacionesList.get(0).getPuntajeObtenido();
            p.addProperty("puntaje", puntaje);
            realizacionesJson.add(p);
//            mapa.put(tarea, realizacionesList);
        }
        return realizacionesJson.toString();
        
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
            return "Pasapalabras";
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
        realizacion.calcularPorcentaje();
        realizacionTareaService.save(realizacion);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
}
