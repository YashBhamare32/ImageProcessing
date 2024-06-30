import { JobService } from './job.service';
import { Response } from 'express';
export declare class JobController {
    private jobService;
    constructor(jobService: JobService);
    createJob(image: Express.Multer.File, headers: any): Promise<any>;
    getJobStatus(params: any, res: Response): Promise<Response<any, Record<string, any>>>;
}
