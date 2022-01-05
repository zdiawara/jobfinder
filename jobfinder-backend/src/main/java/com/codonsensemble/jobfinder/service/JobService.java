package com.codonsensemble.jobfinder.service;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.codonsensemble.jobfinder.converter.JobRecordToResource;
import com.codonsensemble.jobfinder.model.JobFilter;
import com.codonsensemble.jobfinder.model.JobResource;
import com.codonsensemble.jobfinder.model.ListResult;
import com.codonsensemble.jobfinder.repository.JobRepository;

@Service
public class JobService {

    private final JobRepository jobRepository;
    private final JobRecordToResource jobRecordToResource;

    public JobService(JobRepository jobRepository, JobRecordToResource jobRecordToResource){
        this.jobRepository = jobRepository;
        this.jobRecordToResource = jobRecordToResource;
    }

    public ListResult<JobResource> findAll(JobFilter jobFilter){
        return jobRepository.findAll(jobFilter);
    }

    public JobResource findById(UUID id){
        return jobRepository.findById(id)
                .orElseThrow(()->new RuntimeException(""));
    }

    public JobResource create(JobResource jobResource){
        return jobRepository.create(jobResource)
                .map(jobRecordToResource::convert)
                .orElseThrow(()->new RuntimeException(""));
    }

    public JobResource update(UUID id, JobResource jobResource){
        return jobRepository.update(id, jobResource)
                .orElseThrow(()->new RuntimeException(""));
    }

}
