import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAllProjects } from '../services/projects-service';

export interface Project {
    _id: string
    title: string
    description: string
    created_by: {
        _id: string
        display_name: string
    }
    start_date: string
    priority: string
    assigned_team?: any[]
    isArchived: boolean
    createdAt: string,
    updatedAt: string
}

type ProjectProviderProps = { children: React.ReactNode };

const ProjectContext = createContext<{
    projects: Project[] | null
} | undefined>(undefined);

export const useProjects = () => {
    const context = useContext(ProjectContext);
    if (context === undefined) throw new Error('useProjects must be used withing a ProjectProvider');
    return context;
}

const ProjectProvider = ({ children }: ProjectProviderProps) => {
    const [projects, setProjects] = useState<Project[] | null>(null);

    useEffect(() => {
        getAllProjects().then(projects => {
            if (!projects.success) return; //@TODO: Handle Project Errors
            if (projects?.data?.length) setProjects(projects.data);
            else setProjects([]);
        });
    }, []);

    const value = {
        projects
    };

    return <ProjectContext.Provider value={value}>
        {children}
    </ProjectContext.Provider>
}

export default ProjectProvider;
