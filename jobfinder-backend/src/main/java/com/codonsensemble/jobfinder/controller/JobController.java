package com.codonsensemble.jobfinder.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.codonsensemble.jobfinder.model.JobFilter;
import com.codonsensemble.jobfinder.model.JobResource;
import com.codonsensemble.jobfinder.model.ListResult;
import com.codonsensemble.jobfinder.service.JobService;

@RestController
@RequestMapping(value = "/api/jobs")
public class JobController {

    private final JobService jobService;

    public JobController(JobService jobService){
        this.jobService = jobService;
    }

    @GetMapping
    public ResponseEntity<ListResult<JobResource>> readJobs(JobFilter jobFilter){
        return ResponseEntity.ok(jobService.findAll(jobFilter));
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobResource> readJob(@PathVariable("id") UUID id){
        return ResponseEntity.ok(this.jobService.findById(id));
    }

    @PostMapping
    public ResponseEntity<JobResource> createJob(@RequestBody JobResource jobResource){
        return ResponseEntity.ok(this.jobService.create(jobResource));
    }

    @PutMapping("/{id}")
    public ResponseEntity<JobResource> updateJob(@PathVariable("id") UUID id, @RequestBody JobResource jobResource){
        return ResponseEntity.ok(this.jobService.update(id, jobResource));
    }
}
